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
        el_menu.classList.toggle('flex')
        // 監聽 animationEnd
        if (el_menu.classList.contains('flex')) {
            el_menu.classList.add('animate-fadeIn')
            el_menu.classList.remove('animate-fadeOut')
        } else {
            el_menu.classList.remove('animate-fadeIn')
            el_menu.classList.add('animate-fadeOut')
        }
    }
}
