import { debounce, throttle } from './../extraFunctions'

export default function Nav(
    options = {
        nav: '.nav',
        addClass: 'nav-hideBg',
        breakPoint: 1024,
        scrollingHide: true,
        scrollSpy: true,
    }
) {
    var scroll_last = 0

    const _breakPoint = options.breakPoint
    const _el_nav = document.querySelector(options.nav)
    const _el_bar = document.querySelector('[data-menubar]')
    const _el_menu = document.querySelector('[data-menu]')
    const _el_scrollBtn = [...document.querySelectorAll('[data-scrollTo]')]
    const _el_navScrollBtn = [...document.querySelectorAll('.nav-btn[data-scrollTo]')]
    const _class_navHideBg = options.addClass
    let vm = this

    this.init = () => {
        if (!_el_bar) console.error('找不到 menuBar')
        else _el_bar.addEventListener('click', vm.menuBarClick)
        // 事件代理?
        if (_el_scrollBtn.length === 0) console.error('找不到 scrollBtn')
        else vm.scrollingBtnListener()

        vm.scrollSpy()

        const debounceScroll = debounce(vm.scrollingListener, 30)
        window.addEventListener('scroll', () => {
            debounceScroll()
        })
        const throttleResize = throttle(vm.resizingListener, 100)
        window.addEventListener('resize', () => {
            throttleResize()
        })
    }

    /** ==========================================================
     *  * 監聽封裝
     */
    this.scrollingListener = () => {
        this.scrollAndHide()
        this.scrollSpy()
    }

    this.resizingListener = () => {
        window.innerWidth > _breakPoint ? vm.menuOpen() : vm.menuClose()
    }

    /** ==========================================================
     *  * 點擊 Nav 後滑動到指定區塊
     */
    this.scrollingBtnListener = () => {
        _el_scrollBtn.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.preventDefault()
                vm.scrollingTo(this)
            })
        })
    }

    // * 點擊後滑動到該區塊
    this.scrollingTo = (btn) => {
        const targetSection = btn.dataset.scrollto
        const offset = document.getElementById(targetSection).dataset.scrolloffset
        let targetHeight = Number(document.getElementById(targetSection).offsetTop) + Number(offset)
        console.log(targetHeight, offset)
        window.scrollTo({ top: targetHeight, behavior: 'smooth' })
    }

    /** ==========================================================
     *  * 監測目前捲動位置，加 .active 到 .nav-btn
     */
    this.scrollSpy = () => {
        if (!options.scrollSpy) return
        const current_offsetTop = window.scrollY
        if (!_el_navScrollBtn) console.error('找不到 .nav-btn[data-scrollTo]')
        const navButtons = _el_navScrollBtn
            .map((btn) => {
                return btn !== undefined
                    ? {
                          btn: btn,
                          offsetTop: document.getElementById(btn.dataset.scrollto).offsetTop,
                      }
                    : {}
            })
            .sort((a, b) => a.offsetTop - b.offsetTop)
        const currentSection = navButtons.find((section) => section.offsetTop >= current_offsetTop)
        _el_navScrollBtn.forEach((btn) => {
            if (btn !== undefined && currentSection !== undefined) {
                btn === currentSection.btn
                    ? btn.classList.add('active')
                    : btn.classList.remove('active')
            }
        })
    }

    /** ==========================================================
     *  * Nav 捲動方向 => 判斷捲動方向來隱藏/顯示 Nav
     */
    this.scrollAndHide = () => {
        if (!options.scrollingHide) return
        let scroll_position = window.scrollY
        let isScrollDown = scroll_position > scroll_last

        // * 桌機與手機控制 nav 的開關不同
        if (window.innerWidth > _breakPoint) {
            if (scroll_position > 100) {
                isScrollDown ? this.menuAllHide() : this.menuAllShow()
            } else {
                this.menuAllShow()
            }
        } else {
            this.menuClose()
            scroll_position > 100 ? this.menuHideBg() : this.menuShowBg()
        }

        // * 紀錄當前位置到全域變數 'scroll_last'
        scroll_last = scroll_position
    }

    /** ==========================================================
     *  * 點擊 nav-menu 後，隱藏或顯示 Nav (手機板的 Nav)
     */
    this.menuBarClick = () => {
        let isOpen = _el_menu.classList.contains('flex')
        if (_el_menu) isOpen ? this.menuClose() : this.menuAllShow()
    }

    this.menuClose = () => {
        _el_menu.classList.remove('animate-fadeIn')
        _el_menu.classList.remove('flex')
        _el_menu.classList.add('animate-fadeOut')
    }

    this.menuOpen = () => {
        _el_menu.classList.add('flex')
        _el_menu.classList.add('animate-fadeIn')
        _el_menu.classList.remove('animate-fadeOut')
    }

    this.menuHideBg = () => {
        _el_nav.classList.add(_class_navHideBg)
    }

    this.menuShowBg = () => {
        _el_nav.classList.remove(_class_navHideBg)
    }

    this.menuAllShow = () => {
        this.menuOpen()
        this.menuShowBg()
    }

    this.menuAllHide = () => {
        this.menuClose()
        this.menuHideBg()
    }
}
