window.onload = function () {
    menubar()
}

function menubar() {
    const el_bar = document.querySelector('[data-menubar]')
    if (el_bar) {
        el_bar.addEventListener('click', toggleMenu)
    }
}

function toggleMenu() {
    const el_menu = document.querySelector('[data-menu]')
    if (el_menu) {
        if (el_menu.classList.contains('flex')) {
            el_menu.classList.remove('flex')
        } else {
            el_menu.classList.add('overflow-hidden')
            el_menu.classList.add('flex')
        }
    }
}
