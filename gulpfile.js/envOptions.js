const srcPath = './app'
const distPath = './dist'
const nodePath = './node_modules'
const root = './..'

let envOptions = {
    string: 'env',
    default: {
        env: 'dev',
    },
    conyFile: {
        src: [
            `${srcPath}/**/*`,
            `!${srcPath}/assets/js/**/*.js`,
            `!${srcPath}/assets/style/**/*`,
            `!${srcPath}/includes`,
            `!${srcPath}/**/*.ejs`,
            `!${srcPath}/**/*.html`,
        ],
        path: distPath,
    },
    html: {
        src: [`${srcPath}/**/*.html`],
        ejsSrc: [`${srcPath}/**/*.ejs`],
        path: distPath,
    },
    style: {
        src: [`${srcPath}/assets/style/**/*.scss`, `${srcPath}/assets/style/**/*.sass`],
        path: `${distPath}/assets/style`,
        tailwindcss: {
            src: [`${srcPath}/assets/style/index.css`],
            watch: `${srcPath}/assets/style/**/*.css`,
            path: [`${distPath}/assets/style/`],
        },
    },
    javascript: {
        entry: [`${srcPath}/assets/js/all.js`],
        src: [`${srcPath}/assets/js/**/*.js`],
        concat: 'all.js',
        path: `${distPath}/assets/js`,
    },
    vendors: {
        src: [`${nodePath}/jquery/dist/**/jquery.min.js`],
        concat: 'vendors.js',
        path: `${distPath}/assets/js`,
    },
    img: {
        src: [`${srcPath}/assets/images/**/*`],
    },
    clean: {
        src: distPath,
    },
    prettier: {
        config: `${root}/.prettierrc.js`,
        src: [
            `${srcPath}/**/*.html`,
            `${srcPath}/**/*.css`,
            `${srcPath}/**/*.scss`,
            `${srcPath}/**/*.js`,
        ],
        dest: `${srcPath}`,
    },
    browserDir: distPath,
    deploySrc: `${distPath}/**/*`,
}

exports.envOptions = envOptions
