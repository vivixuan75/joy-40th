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
        'xxs': '375px',
        'xs': '480px',
        'sm': '640px',    
        'md': '768px',    
        'lg': '1024px',    
        'xl': '1280px',    
        '2xl': '1536px',
        },    
        extend: {
            zIndex:{
                '99': 99,
                '-10': '-10',
                '-20': '-20',
                '-99': '-99',
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
                }
            },
            animation: {
                fadeIn: 'fade 0.5s ease-in both',
                fadeOut: 'fade 0.5s ease-in reverse both',
                float: 'float 3s ease-in-out infinite',
                floatSm: 'floatSm 3s ease-in-out infinite',
            },
            fontFamily:{
                'genSenRounded': ['GenSenRounded', 'sans-serif'],
                'awesome':['Font Awesome 5 Free'],
            },
            colors: {
                primary: '#e60012',
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
                'xxs': '18rem'
            },
            maxHeight: {
                'screenLimit': 768
            },
            borderWidth: {
            DEFAULT: '1px',
                '0': '0',
                '2': '2px',
                '3': '3px',
                '4': '4px',
                '5': '5px',
                '6': '6px',
                '7': '7px',
                '8': '8px',
                '9': '9px',
            },
            maxWidth:{
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
