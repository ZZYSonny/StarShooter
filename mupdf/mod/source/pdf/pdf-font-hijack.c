#include "mupdf/fitz.h"
#include "mupdf/fitz/buffer.h"
#include "mupdf/pdf.h"
#include <string.h>

#include <ft2build.h>
#include FT_FREETYPE_H
#include FT_ADVANCES_H
#include FT_FONT_FORMATS_H


#define FONT_LIBRARY_LEN 1

char BundledFont[FONT_LIBRARY_LEN][32] = {
	"NimbusRomNo9L"
};


static void check_as_text(fz_context *ctx, pdf_font_desc *fontdesc){
	char namebuf[32];
	int size=32;
	char *p;
	/* Remove "ABCDEF+" prefix and "-Bold" suffix. */
	p = strchr(fontdesc->font->name, '+');
	if (p) fz_strlcpy(namebuf, p+1, size);
	else fz_strlcpy(namebuf, fontdesc->font->name, size);
	
    p = strrchr(namebuf, '-');
	if (p) *p = 0;
	// Check against BundledFont
	for(int i=0;i<FONT_LIBRARY_LEN;i++)
		if(!strcmp(BundledFont[i], namebuf)) {
			fontdesc->font->as_text=1;
			return;
		}
	//TTF
	//if((!strcmp(FT_Get_Font_Format(fontdesc->font->ft_face), "TrueType"))){
	//	for(int i=0;i<3200;i++){
	//		int x = fz_encode_character(ctx, fontdesc->font, i);
	//		if(x) {
	//			fontdesc->font->as_text=1;
	//			return;
	//		}
	//	}
	//}
}
