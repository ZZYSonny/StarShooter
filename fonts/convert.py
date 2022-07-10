import os
import glob
import shutil
import fontforge

#paru -S texlive-core

FONTDIR = "/usr/share/texmf-dist/fonts"
OUTDIR  = "/workspace/StarShooter/web/out/font/latex"
CSSDIR = f"{OUTDIR}/all.css"
CSSSTR = ""
OUTEXT = "woff2"
EXTENSIONS = ["pfb","ttf"]

#if os.path.exists(OUTDIR):shutil.rmtree(OUTDIR)
#os.mkdir(OUTDIR)

for ext in EXTENSIONS:
    for inpath in glob.iglob(f"{FONTDIR}/**/*.{ext}", recursive=True):
        font=fontforge.open(inpath)
        name=font.fontname
        name_nosuf = name
        name_break = name.split("-")
        name_suf = name_break[-1]
        if len(name_break)>1 and all(not c.isdigit() for c in name_suf):
            name_nosuf = name[0:len(name)-len(name_suf)-1]
        prop=f"font-family: '{name_nosuf}';src: url('{name}.{OUTEXT}');"
        if "Bold" in font.weight: prop+=f"font-weight: bold;"
        if font.italicangle!=0: prop+="font-style: italic;"
        CSSSTR+=f"@font-face {{{prop}}}\n"
        #font.generate(f"{OUTDIR}/{name}.{OUTEXT}")

        font.close()

with open(CSSDIR, "w") as f:
    f.write(CSSSTR)