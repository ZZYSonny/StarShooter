#include "mupdf/fitz.h"
#include "mupdf/fitz/buffer.h"
#include "mupdf/pdf.h"
#include <string.h>

const int FONT_LIBRARY_LEN = 1;

char BundledFont[FONT_LIBRARY_LEN][32] = {
	"NimbusRomNo9L"
};


static void check_as_text(pdf_font_desc *fontdesc, int kind){
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
		if(strcmp(BundledFont[i], namebuf)==0) {
			fontdesc->font->as_text=1;
			break;
		}
	//TTF
	//if(kind == 2){
	//	fontdesc->font->as_text=1;
	//}
}
