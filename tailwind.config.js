const colors = require('tailwindcss/colors')

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            zIndex: {
                99: 99,
            },
            keyframes: {
                fade: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                float: {
                    '0%': { transform: `translate(0, 0px)` },
                    '65%': { transform: `translate(0, 15px)` },
                    '100%': { transform: `translate(0, -0px)` },
                },
                floatSm: {
                    '0%': { transform: `translate(0, 0px)` },
                    '45%': { transform: `translate(0, 5px)` },
                    '100%': { transform: `translate(0, -0px)` },
                },
                pulseScale: {
                    '0%': { transform: 'scaleX(1)' },
                    '50%': { transform: 'scale3d(1.05,1.05,1.05)' },
                    '100%': { transform: 'scaleX(1)' },
                },
            },
            animation: {
                fadeIn: 'fade 0.5s ease-in both',
                fadeOut: 'fade 0.5s ease-in reverse both',
                float: 'float 3s ease-in-out infinite',
                floatSm: 'floatSm 3s ease-in-out infinite',
                pulseScale: 'pulseScale .5 ease-in-out',
            },
            fontFamily: {
                genSenRounded: ['GenSenRounded', 'sans-serif'],
            },
            colors: {
                primary: '#de051b',
            },
            translate: {
                '-101': '-101%',
                '-1/7': '-14.2857143%',
                '-2/7': '-28.5714286%',
                '-3/7': '-42.8571429%',
                '-4/7': '-57.1428571%',
                '-5/7': '-71.4285714%',
                '-6/7': '-85.7142857%',
                '1/7': '14.2857143%',
                '2/7': '28.5714286%',
                '3/7': '42.8571429%',
                '4/7': '57.1428571%',
                '5/7': '71.4285714%',
                '6/7': '85.7142857%',
            },
            maxWidth: {
                xxs: '18rem',
            },
            maxHeight: {
                screenLimit: 768,
            },
        },
    },
    variants: {
        extend: {
            animation: ['hover'],
        },
    },
    plugins: [],
}
