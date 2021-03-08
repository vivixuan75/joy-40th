export default {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    roundLengths: true,
    grabCursor: true,
    speed: 200,
    breakpoints: {
        768: {
            slidesPerView: 'auto',
            spaceBetween: 30,
            freeModeMinimumVelocity: 0.2,
            freeMode: true,
        },
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
}
