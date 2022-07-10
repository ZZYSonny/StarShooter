FROM greyltc/archlinux-aur:paru
RUN aur-install base-devel clang emscripten nodejs npm python python-pip fontforge
ENV PATH "${PATH}:/usr/lib/emscripten"