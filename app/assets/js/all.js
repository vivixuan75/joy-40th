import { header_animate } from './landingAnimation'

window.onload = function () {
    menubar()
    // * skip => 是否跳過前面的動畫
    header_animate({ skip: true })

    // 注意事項
    hideAll()

    $('.note-more').on('click', function (e) {
        e.preventDefault()

        $(this).next().fadeToggle(200)
        $(this).find('.more-open').toggle()
        $(this).find('.more-close').toggle()
    })
}

function menubar() {
    const el_bar = document.querySelector('[data-menubar]')
    if (el_bar) {
        el_bar.addEventListener('click', toggleMenu)
    }
}

function toggleMenu() {
    console.log('clicked')
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

function hideAll() {
    $('.more-list').hide()
    $('.more-close').hide()
}
