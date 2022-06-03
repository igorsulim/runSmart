const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function() { // Здесть "server" просто название.

    browserSync({
        server: {
            baseDir: "src" // Откуда грузим файлы для отображения в браузере
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/css/*.css").on('change', browserSync.reload); //обновление страницы при изменении .html
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)") // здесь указываем из какой папки берем файлы и с какими расширениями
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //настройка того, в каком стиле компиллируется файл .css
        .pipe(rename({suffix: '.min', prefix: ''})) // переименование скомпиллированного файла .css
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css")) // Куда отправляем скомпилированный файл.
        .pipe(browserSync.stream()); // Обновление страницы после автокомпиляции и всех действий.
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles')); // отслеживание изменения файлов, запуск задачи "styles"
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles')); // запуск задач Gulp параллельно