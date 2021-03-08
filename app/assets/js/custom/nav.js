import { debounce, throttle } from './../extraFunctions'

export default function Nav(options = { nav: '.nav', addClass: 'nav-hideBg', breakPoint: 1024 }) {
    const _breakPoint = options.breakPoint
    const _el_nav = document.querySelector(options.nav)
    const _el_bar = document.querySelector('[data-menubar]')
    const _el_menu = document.querySelector('[data-menu]')
    const _el_scrollBtn = [...document.querySelectorAll('[data-scrollTo]')]
    const _class_navHideBg = options.addClass
    let vm = this

    this.init = () => {
        if (!_el_bar) console.error('找不到 menuBar')
        else _el_bar.addEventListener('click', vm.menuBarClick)
        // 事件代理?
        if (_el_scrollBtn.length === 0) console.error('找不到 scrollBtn')
        else vm.scrollingBtnListener()

        const debounceScroll = debounce(vm.scrollAndHide, 30)
        window.addEventListener('scroll', () => {
            debounceScroll()
        })
        const throttleResize = throttle(vm.menuAppearanceByResize, 100)
        window.addEventListener('resize', () => {
            throttleResize()
        })
    }

    this.scrollingBtnListener = () => {
        _el_scrollBtn.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.preventDefault()
                vm.scrollingTo(this)
            })
        })
    }

    this.scrollingTo = (btn) => {
        let targetSection = btn.dataset.scrollto
        const targetHeight =
            targetSection === 'section-header'
                ? 0
                : document.getElementById(targetSection).offsetTop

        window.scrollTo({ top: targetHeight, behavior: 'smooth' })
    }

    this.menuAppearanceByResize = () => {
        window.innerWidth > _breakPoint ? vm.menuOpen() : vm.menuClose()
    }

    this.menuBarClick = () => {
        let isOpen = _el_menu.classList.contains('flex')
        if (_el_menu) isOpen ? this.menuClose() : this.menuAllShow()
    }

    this.scrollAndHide = () => {
        let scroll_position = window.scrollY
        let isScrollDown = scroll_position > scroll_last
        // let scrollOffset = scroll_position - scroll_last

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

    // * Mobile menu
    this.menuClose = () => {
        _el_menu.classList.remove('animate-fadeIn')
        _el_menu.classList.remove('flex')
        _el_menu.classList.add('animate-fadeOut')
    }

    // * Mobile menu
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
