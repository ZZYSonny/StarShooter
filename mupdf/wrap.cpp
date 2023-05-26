#include "emscripten.h"
#include <emscripten/bind.h>
using namespace emscripten;
#include "mupdf/fitz.h"
#include "mupdf/pdf.h"
#include "mupdf/pdf/font.h"
#include <string.h>
#include <string>
#include <math.h>

const float dpi = 72;

static fz_context *ctx = fz_new_context(NULL, NULL, 100 << 20);
static pdf_document *doc = NULL;
static pdf_page *lastPage = NULL;

int main()
{

}

void wasm_rethrow(fz_context *ctx)
{
	if (fz_caught(ctx) == FZ_ERROR_TRYLATER)
		EM_ASM({ throw "trylater"; });
	else
		EM_ASM({ throw new Error(UTF8ToString($0)); }, fz_caught_message(ctx));
}

void openDocument(unsigned long dataPointer, unsigned int size)
{
	unsigned char* data = (unsigned char*)(dataPointer);
	fz_buffer *buf = NULL;
	fz_stream *stm = NULL;

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
	static pdf_document *lastPageDoc = NULL;
	static int lastPageNumber = -1;
	if (lastPageNumber != number || lastPageDoc != doc)
	{
		if (lastPage)
		{
			fz_drop_page(ctx, &lastPage->super);
			lastPage = NULL;
			lastPageDoc = NULL;
			lastPageNumber = -1;
		}
		lastPage = pdf_load_page(ctx, doc, number - 1);
		lastPageDoc = doc;
		lastPageNumber = number;
	}
}

std::string documentTitle()
{
	std::string ans(128,0);
	fz_try(ctx)
	{
		pdf_lookup_metadata(ctx, doc, FZ_META_INFO_TITLE, (char *)ans.data(), 128);
	}
	fz_catch(ctx)
		wasm_rethrow(ctx);
	return ans;
}

std::vector<int> pageBounds()
{
	int n = pdf_count_pages(ctx, doc);
	std::vector<int> ans(2*n, 0);
	fz_irect bbox = fz_empty_irect;
	fz_try(ctx)
	{
		for(int i=1;i<=n;i++){
			loadPage(i);
			bbox = fz_round_rect(pdf_bound_page(ctx, lastPage));
			//Width
			ans[2*i-2] = bbox.x1 - bbox.x0;
			//Height
			ans[2*i-1] = bbox.y1 - bbox.y0;
		}
	}
	fz_catch(ctx)
		wasm_rethrow(ctx); 
	return ans;
}

std::string drawPageAsSVG(int number)
{
	fz_buffer *buf;
	fz_output *out;
	fz_device *dev;
	fz_rect bbox;

	loadPage(number);

	buf = fz_new_buffer(ctx, 0);
	{
		out = fz_new_output_with_buffer(ctx, buf);
		{
			bbox = pdf_bound_page(ctx, lastPage);
			dev = fz_new_svg_device_with_id(ctx, out, bbox.x1 - bbox.x0, bbox.y1 - bbox.y0, 1, 0, &number);
			pdf_run_page(ctx, lastPage, dev, fz_identity, NULL);
			fz_close_device(ctx, dev);
			fz_drop_device(ctx, dev);
		}
		fz_write_byte(ctx, out, 0);
		fz_close_output(ctx, out);
		fz_drop_output(ctx, out);
	}
	
	std::string ans((char*)buf->data);
	fz_drop_buffer(ctx, buf);

	return ans;
}

void outlineToJSON(fz_buffer *buf, fz_outline *outline){
	fz_append_printf(ctx, buf, "{\"title\":\"%s\"", outline->title);
	fz_append_printf(ctx, buf, ",\"page\":%d", outline->page.page);
	fz_append_printf(ctx, buf, ",\"x\":%f", outline->x);
	fz_append_printf(ctx, buf, ",\"y\":%f", outline->y);
	if(outline->down) {
		fz_append_printf(ctx, buf, ",\"children\":");
		fz_append_printf(ctx, buf, "[");
		outlineToJSON(buf, outline->down);
		fz_append_printf(ctx, buf, "]");
	}
	if(outline->next) {
		fz_append_printf(ctx, buf, "},");
		outlineToJSON(buf, outline->next);
	}else{
		fz_append_printf(ctx, buf, "}");
	}
}

std::string loadOutline()
{
	fz_outline *outline = NULL;
	fz_buffer *buf = NULL;

	outline = pdf_load_outline(ctx, doc);
	buf = fz_new_buffer(ctx, 0);

	fz_append_printf(ctx, buf, "[");
	outlineToJSON(buf, outline);
	fz_append_printf(ctx, buf, "]");

	std::string ans((char*)buf->data);
	
	fz_drop_outline(ctx, outline);
	fz_drop_buffer(ctx, buf);
	return ans;
}

std::string loadFont()
{
	std::string ans;
	auto page_res = pdf_page_resources(ctx, lastPage);
	auto page_font_objs = pdf_dict_get(ctx, page_res, PDF_NAME(Font));
	if (page_font_objs)
	{
		int n = pdf_dict_len(ctx, page_font_objs);
		for (int i = 0; i < n; i++)
		{
			auto *font_obj = pdf_dict_get_val(ctx, page_font_objs, i);
			auto *font_desc = pdf_load_font(ctx, doc, page_res, font_obj);
			long font_id = (long)(&font_desc->font->name[0]);
			ans += std::to_string((long)(&font_desc->font->name[0]));
			ans += ":";
			ans += std::string(font_desc->font->name);
			ans += "\n";
		}
	}
	return ans;
}

EMSCRIPTEN_BINDINGS(my_module) {
	function("openDocument", &openDocument);
    function("drawPageAsSVG", &drawPageAsSVG);
	function("pageBounds", &pageBounds);
	function("documentTitle", &documentTitle);
	function("loadOutline", &loadOutline);
	function("loadFont", &loadFont);

	register_vector<int>("vector<int>");
}