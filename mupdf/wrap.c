#include "emscripten.h"
#include "mupdf/fitz.h"
#include "mupdf/fitz/font.h"
#include "mupdf/pdf.h"
#include "mupdf/fitz/buffer.h"
#include "mupdf/pdf/document.h"
#include "mupdf/pdf/font.h"
#include "mupdf/pdf/object.h"
#include "mupdf/pdf/page.h"
#include <string.h>
#include <math.h>
EM_JS(void, say_str, (const char* str), {
  console.log('STR ' + UTF8ToString(str));
});

EM_JS(void, say_int, (const int x), {
  console.log('INT:' + x);
});

EM_JS(void, say_char, (const char x), {
  console.log('CHAR:' + String.fromCharCode(x));
});
EM_JS(void, say_char_int, (const int x, const int y), {
  console.log('CHAR INT:' + String.fromCharCode(x) + " " + y);
});

const float dpi = 72;

static fz_context *ctx;
static pdf_document *doc;
static pdf_page *lastPage = NULL;

EMSCRIPTEN_KEEPALIVE
int main()
{
	ctx = fz_new_context(NULL, NULL, 100 << 20);
	if (!ctx)
		EM_ASM({ throw new Error("Cannot create MuPDF context!"); });
	fz_register_document_handlers(ctx);
	return 0;
}

void wasm_rethrow(fz_context *ctx)
{
	if (fz_caught(ctx) == FZ_ERROR_TRYLATER)
		EM_ASM({ throw "trylater"; });
	else
		EM_ASM({ throw new Error(UTF8ToString($0)); }, fz_caught_message(ctx));
}

static unsigned char *buf_data = NULL;
static int buf_len = 0;
char* bufferToString(fz_context *ctx, fz_buffer *buf){
	
	fz_free(ctx, buf_data);
	buf_data = NULL;
	fz_append_printf(ctx, buf, "%c", 0);
	buf_len = fz_buffer_extract(ctx, buf, &buf_data);
	fz_drop_buffer(ctx, buf);
	return (char*)buf_data;
}

EMSCRIPTEN_KEEPALIVE
int getBufferLen()
{
	return buf_len;
}

EMSCRIPTEN_KEEPALIVE
void openDocumentFromBuffer(unsigned char *data, int size)
{
	fz_buffer *buf = NULL;
	fz_stream *stm = NULL;

	/* NOTE: We take ownership of input data! */

	fz_try(ctx)
	{
		buf = fz_new_buffer_from_data(ctx, data, size);
		stm = fz_open_buffer(ctx, buf);
		doc = pdf_open_document_with_stream(ctx, stm);
	}
	fz_always(ctx)
	{
		fz_drop_stream(ctx, stm);
		fz_drop_buffer(ctx, buf);
	}
	fz_catch(ctx)
	{
		fz_free(ctx, data);
		wasm_rethrow(ctx);
	}
	return;
}


static void loadPage(int number)
{
	static int lastPageNumber = -1;
	if (lastPageNumber != number)
	{
		if (lastPage)
		{
			fz_drop_page(ctx, (fz_page*)lastPage);
			lastPage = NULL;
			lastPageNumber = -1;
		}
		lastPage = pdf_load_page(ctx, doc, number - 1);
		lastPageNumber = number;
	}
}

EMSCRIPTEN_KEEPALIVE
char *drawPageAsSVG(int number, int style)
{
	fz_buffer *buf;
	fz_output *out;
	fz_device *dev;
	fz_rect bbox;


	loadPage(number);
	buf = fz_new_buffer(ctx, 0);
	out = fz_new_output_with_buffer(ctx, buf);

	bbox = pdf_bound_page(ctx, lastPage);
	dev = fz_new_svg_device(ctx, out, bbox.x1 - bbox.x0, bbox.y1 - bbox.y0, style, 0);
	pdf_run_page(ctx, lastPage, dev, fz_identity, NULL);

	fz_close_device(ctx, dev);
	fz_drop_device(ctx, dev);
	fz_write_byte(ctx, out, 0);
	fz_close_output(ctx, out);
	fz_drop_output(ctx, out);
	return bufferToString(ctx, buf);
}

static fz_irect pageBounds(int number)
{
	fz_irect bbox = fz_empty_irect;
	fz_try(ctx)
	{
		loadPage(number);
		bbox = fz_round_rect(pdf_bound_page(ctx, lastPage));
	}
	fz_catch(ctx)
		wasm_rethrow(ctx);
	return bbox;
}


EMSCRIPTEN_KEEPALIVE
char* pageWeightHeight()
{
	fz_buffer *buf = fz_new_buffer(ctx, 0);
	fz_irect bbox = fz_empty_irect;
	int n = pdf_count_pages(ctx, doc);
	fz_append_printf(ctx, buf, "[");
	for(int i=1;i<=n;i++){
		loadPage(i);
		bbox = pageBounds(i);
		fz_append_printf(ctx, buf, "%d,", bbox.x1 - bbox.x0);
		fz_append_printf(ctx, buf, "%d", bbox.y1 - bbox.y0);
		if(i!=n) fz_append_printf(ctx, buf, ",");
	}
	fz_append_printf(ctx, buf, "]");

	return bufferToString(ctx, buf);
}


EMSCRIPTEN_KEEPALIVE
char *documentTitle()
{
	static char buf[100], *result = NULL;
	fz_try(ctx)
	{
		if (pdf_lookup_metadata(ctx, doc, FZ_META_INFO_TITLE, buf, sizeof buf) > 0)
			result = buf;
	}
	fz_catch(ctx)
		wasm_rethrow(ctx);
	return result;
}

void outlineToJSON(fz_buffer *buf, fz_outline *outline);
void outlineToJSONArray(fz_buffer *buf, fz_outline *outline){
	fz_append_printf(ctx, buf, "[");
	outlineToJSON(buf, outline);
	fz_append_printf(ctx, buf, "]");
}
void outlineToJSON(fz_buffer *buf, fz_outline *outline){
	fz_append_printf(ctx, buf, "{\"title\":\"%s\"", outline->title);
	fz_append_printf(ctx, buf, ",\"page\":%d", outline->page.page);
	fz_append_printf(ctx, buf, ",\"x\":%f", outline->x);
	fz_append_printf(ctx, buf, ",\"y\":%f", outline->y);
	if(outline->down) {
		fz_append_printf(ctx, buf, ",\"children\":");
		outlineToJSONArray(buf, outline->down);
	}
	if(outline->next) {
		fz_append_printf(ctx, buf, "},");
		outlineToJSON(buf, outline->next);
	}else{
		fz_append_printf(ctx, buf, "}");
	}
}

EMSCRIPTEN_KEEPALIVE
char *loadOutline()
{
	fz_outline *outline = pdf_load_outline(ctx, doc);
	fz_buffer *buf = fz_new_buffer(ctx, 0);
	
	outlineToJSONArray(buf, outline);

	fz_drop_outline(ctx, outline);
	return bufferToString(ctx, buf);
}

int font_obj_cur=0;
pdf_obj *font_obj, *font_desc, *font_ttf, *font_rdb;
pdf_font_desc *font;
void dropFontTemp(){
	if(!font_ttf){
		pdf_drop_obj(ctx,font_ttf);
		font_ttf=NULL;
	}
	if(!font_desc){
		pdf_drop_obj(ctx,font_desc);
		font_desc=NULL;
	}
	if(!font_obj){
		pdf_drop_obj(ctx, font_obj);
		font_obj=NULL;
	}
}

static void
svg_path_moveto(fz_context *ctx, void *arg, float x, float y)
{
	fz_output *out = (fz_output *)arg;
	fz_write_printf(ctx, out, "M %g %g ", x, y);
}

static void
svg_path_lineto(fz_context *ctx, void *arg, float x, float y)
{
	fz_output *out = (fz_output *)arg;
	fz_write_printf(ctx, out, "L %g %g ", x, y);
}

static void
svg_path_curveto(fz_context *ctx, void *arg, float x1, float y1, float x2, float y2, float x3, float y3)
{
	fz_output *out = (fz_output *)arg;
	fz_write_printf(ctx, out, "C %g %g %g %g %g %g ", x1, y1, x2, y2, x3, y3);
}

static void
svg_path_close(fz_context *ctx, void *arg)
{
	fz_output *out = (fz_output *)arg;
	fz_write_printf(ctx, out, "Z ");
}

static const fz_path_walker svg_path_walker =
{
	svg_path_moveto,
	svg_path_lineto,
	svg_path_curveto,
	svg_path_close
};

EMSCRIPTEN_KEEPALIVE
const char *loadFontName()
{
	int len = pdf_count_objects(ctx, doc);
	font_obj_cur+=1;
	for(;font_obj_cur<len;font_obj_cur++){
		dropFontTemp();
		font_obj = pdf_new_indirect(ctx, doc, font_obj_cur, 0);
		font_desc = pdf_dict_get(ctx, font_obj, PDF_NAME(FontDescriptor));
		if(!font_desc) continue;
		font_ttf = pdf_dict_get(ctx, font_desc, PDF_NAME(FontFile2));
		if(!font_ttf) continue;
		font = pdf_load_font(ctx, doc, NULL, font_obj);
		if(!font->font->as_text) continue;
		return font->font->name;
	}
	dropFontTemp();
	return "(finish)";
}

EMSCRIPTEN_KEEPALIVE
char *loadFontFile()
{
	fz_buffer *buf = pdf_load_stream(ctx, font_ttf);
	return bufferToString(ctx, buf);
}