FROM greyltc/archlinux-aur:paru
RUN pacman -S base-devel emscripten nodejs npm python python-pip fontforge --noconfirm
RUN aur-install emsdk
