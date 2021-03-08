const gulp = require('gulp')
const $ = require('gulp-load-plugins')({ lazy: false })
const autoprefixer = require('autoprefixer')
const minimist = require('minimist')
const browserSync = require('browser-sync').create()
const { envOptions } = require('./envOptions')
const webpack = require('webpack-stream')
// const TerserPlugin = require("terser-webpack-plugin");

let options = minimist(process.argv.slice(2), envOptions)
//現在開發狀態
console.log(`Current mode：${options.env}`)

function copyFile() {
    return gulp
        .src(envOptions.conyFile.src)
        .pipe(gulp.dest(envOptions.conyFile.path))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        )
}

function layoutHTML() {
    return gulp
        .src(envOptions.html.src)
        .pipe($.plumber())
        .pipe($.frontMatter())
        .pipe(
            $.layout((file) => {
                return file.frontMatter
            })
        )
        .pipe(gulp.dest(envOptions.html.path))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        )
}

function sass() {
    const plugins = [autoprefixer()]
    const purge_options = {
        content: ['./app/**/*.ejs', './app/**/*.html', './app/**/*.js'],
    }
    return gulp
        .src(envOptions.style.src)
        .pipe($.if(options.env === 'development', $.sourcemaps.init()))
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss(plugins))
        .pipe($.if(options.env === 'production', $.purgecss(purge_options)))
        .pipe($.if(options.env === 'production', $.cssnano()))
        .pipe($.if(options.env === 'development', $.sourcemaps.write('.')))
        .pipe(gulp.dest(envOptions.style.path))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        )
}

function tailwindcss() {
    const postcss_plugins = [require('postcss-import'), require('tailwindcss'), autoprefixer()]
    const purge_options = {
        content: ['./app/**/*.ejs', './app/**/*.html', './app/**/*.js', './app/**/*.css'],
        defaultExtractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
    }
    return gulp
        .src(envOptions.style.tailwindcss.src)
        .pipe($.if(options.env === 'development', $.sourcemaps.init()))
        .pipe($.postcss(postcss_plugins))
        .pipe($.if(options.env === 'production', $.purgecss(purge_options)))
        .pipe($.if(options.env === 'production', $.cssnano()))
        .pipe($.if(options.env === 'development', $.sourcemaps.write('.')))
        .pipe(gulp.dest(envOptions.style.tailwindcss.path))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        )
}

// function babel() {
//     return gulp
//         .src(envOptions.javascript.entry)
//         .pipe($.sourcemaps.init())
//         .pipe(
//             $.babel({
//                 presets: ['@babel/env'],
//             })
//         )
//         // .pipe($.concat(envOptions.javascript.concat))
//         .pipe($.sourcemaps.write('.'))
//         .pipe(gulp.dest(envOptions.javascript.path))
//         .pipe(
//             browserSync.reload({
//                 stream: true,
//             })
//         )
// }
function babel() {
    const webpack_config_prod = {
        mode: 'production',
        // TODO minify
        // optimization: {
        //     minimize: true,
        //     minimizer: [new TerserPlugin({
        //         test: /\.js(\?.*)?$/i,
        //       })]
        // },
        entry: {
            all: envOptions.javascript.entry,
        },
        output: {
            filename: '[name].js',
        },
    }
    const webpack_config_dev = {
        mode: 'development',
        entry: {
            all: envOptions.javascript.entry,
        },
        output: {
            filename: '[name].js',
        },
    }
    return gulp
        .src(envOptions.javascript.entry)
        .pipe($.if(options.env === 'development', $.sourcemaps.init()))
        .pipe(
            $.if(
                options.env === 'development',
                webpack(webpack_config_dev),
                webpack(webpack_config_prod)
            )
        )
        .pipe(
            $.babel({
                presets: ['@babel/env'],
            })
        )
        .pipe($.if(options.env === 'development', $.sourcemaps.write('.')))
        .pipe(gulp.dest(envOptions.javascript.path))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        )
}

function vendorsJs() {
    return gulp
        .src(envOptions.vendors.src)
        .pipe($.concat(envOptions.vendors.concat))
        .pipe(gulp.dest(envOptions.vendors.path))
}

function browser() {
    browserSync.init({
        server: {
            baseDir: envOptions.browserDir,
        },
        port: 8080,
    })
}

function prettier() {
    return gulp
        .src(envOptions.prettier.src)
        .pipe($.prettier(envOptions.prettier.config))
        .pipe(gulp.dest(envOptions.prettier.dest))
}

function clean() {
    return gulp
        .src(envOptions.clean.src, {
            read: false,
            allowEmpty: true,
        })
        .pipe($.clean())
}

function deploy() {
    return gulp.src(envOptions.deploySrc).pipe($.ghPages())
}

function watch() {
    // gulp.watch(envOptions.prettier.src, gulp.series(prettier))
    gulp.watch(envOptions.html.src, gulp.series(layoutHTML))
    gulp.watch(envOptions.html.ejsSrc, gulp.series(layoutHTML))
    gulp.watch(envOptions.javascript.src, gulp.series(babel))
    gulp.watch(envOptions.img.src, gulp.series(copyFile))
    gulp.watch(envOptions.style.src, gulp.series(sass))
    gulp.watch(envOptions.style.tailwindcss.watch, gulp.series(tailwindcss))
}

exports.deploy = deploy

exports.clean = clean

exports.build = gulp.series(
    prettier,
    clean,
    copyFile,
    layoutHTML,
    sass,
    tailwindcss,
    babel,
    vendorsJs
)

exports.default = gulp.series(
    prettier,
    clean,
    copyFile,
    layoutHTML,
    sass,
    tailwindcss,
    babel,
    vendorsJs,
    gulp.parallel(browser, watch)
)
