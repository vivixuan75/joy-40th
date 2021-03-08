import { header_animate } from './landingAnimation'
import Nav from './custom/nav'
import swiper_options from './custom/swiper'
import SwiperCore, { Pagination } from 'swiper/core'

SwiperCore.use([Pagination])

// * scroll_last 用來判斷捲動方向 (Nav 用)
var scroll_last = 0
const nav = new Nav()

function hideAll() {
    $('.more-list').hide()
    $('.more-close').hide()
}

window.onload = function () {
    nav.init()
    // * skip => 是否跳過前面的動畫
    header_animate({ skip: false })

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
