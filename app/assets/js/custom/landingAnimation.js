import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
gsap.registerPlugin(TextPlugin)

const video = new Video()

function Video() {
    this.el_video_desktop = document.getElementById('video-desktop')
    this.el_video_mobile = document.getElementById('video-mobile')
    const is_mobile =
        window.getComputedStyle(document.getElementById('video-mobile')).display === 'block'
    this._video = is_mobile ? this.el_video_mobile : this.el_video_desktop

    this.canplay = () => {
        // this._video.muted = false
        return this._video.play()
    }
    this.duration = () => {
        return this._video.duration
    }
    this.videoEnd = (fn) => {
        this._video.addEventListener('ended', function () {
            return fn()
        })
    }
}
export function header_animate(options = { skip: false }) {
    const master_video = gsap.timeline()
    const master = gsap.timeline({ paused: true })
    const skipBtn = document.getElementById('headerSkip')

    skipBtn.addEventListener('click', skipToFinal)

    function showNav() {
        document.querySelector('.navWrap').classList.remove('hide')
    }

    function cut1_video() {
        const videoPromise = video.canplay()
        function autoplay() {
            if (!options.skip && videoPromise !== undefined) {
                videoPromise
                    .then(() => {
                        // Automatic playback started!
                        // Show playing UI.
                        console.log('video playing')
                    })
                    .catch((error) => {
                        master.play('final')
                        showNav()
                    })
            }
        }
        const tl = gsap.timeline()
        tl.call(autoplay)
        return tl
    }

    function cut1() {
        const tl = gsap.timeline()
        tl.to('#cut1', { autoAlpha: 0, duration: 0.5 }).set('#cut1', {
            display: 'none',
        })
        return tl
    }

    function cut2() {
        const tl = gsap.timeline()
        tl.set('#cut2', { display: 'block' })
            .to('#cut2', { autoAlpha: 1, duration: 1 }, 'cut2')
            .to('#cut2_text', { text: '假如...可以回到過去', duration: 2 }, 'cut2+=1')
            .to('#cut2_img', { duration: 1, filter: 'blur(15px)', autoRound: false }, 'cut2+=1')
            .to('#cut2_img', { duration: 0.8, filter: 'blur(0.1px)', autoRound: false }, '>')
            .to('#cut2', { autoAlpha: 0, duration: 1 }, '+=0.5')
            .set('#cut2', { display: 'none' }, '>')
        return tl
    }

    function cut3() {
        const tl = gsap.timeline()
        tl.set('#cut3', { display: 'block' }).to('#cut3', { autoAlpha: 1, duration: 1.5 }, 'cut3')
        return tl
    }

    function cut4() {
        const tl = gsap.timeline()
        tl.set('#cut4', { display: 'block' })
            .to('#cut4', {
                duration: 1,
                opacity: 1,
            })
            .set('#headerSkip', { display: 'none' })
        return tl
    }

    function cut5() {
        const tl = gsap.timeline()
        const nav = showNav
        tl.call(nav)
        return tl
    }

    master_video.add(cut1_video(), 'video')
    master.add(cut1()).add(cut2()).add(cut3()).add(cut4(), 'cut4').add(cut5(), 'final')

    if (options.skip === false) {
        master_video.play()
        video.videoEnd(function () {
            return master.play()
        })
    } else {
        skipToFinal()
    }

    function skipToFinal() {
        master.play('final')
        showNav()
    }
}
