import { header_animate } from './custom/landingAnimation'
import Nav from './custom/nav'
import swiper_options from './custom/swiper'
import SwiperCore, { Pagination } from 'swiper/core'

SwiperCore.use([Pagination])

const nav = new Nav({
    // * Nav 的 class
    nav: '.nav',
    // * Nav 消失時使用的 class
    addClass: 'nav-hideBg',
    breakPoint: 1024,
    scrollingHide: false,
    scrollSpy: true,
})

function hideAll() {
    $('.more-list').hide()
    $('.more-close').hide()
}

window.onload = function () {
    // * skip => 是否跳過前面的動畫
    header_animate({ skip: false })

    nav.init()

    const swiper = new SwiperCore('.swiper-container', swiper_options)

    // 注意事項
    hideAll()

    $('.note-more').on('click', function (e) {
        e.preventDefault()

        $('.more-list').fadeToggle(200)
        $(this).find('.more-open').toggle()
        $(this).find('.more-close').toggle()
    })
}
