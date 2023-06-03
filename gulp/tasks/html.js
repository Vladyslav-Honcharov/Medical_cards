// для склейки итогового html файла ир разных кусочков html (хедер футер и т.п.);
import fileinclude from "gulp-file-include";
// запрещает кеширование в браузере для определенных файлов
import versionNumber from "gulp-version-number";

// функция html которая выполняет:
// берет исходный html файл из src, при возникновении ошибки формирует вывод об ошибке, склейка,
// замена на правильный путь к картинке в итоговом html, с помощью регулярных выражений;
// запрещает кеширование в браузере для определенных файлов
// транпортирует из src в корень проекта (см path.js -> объект path)
// обновляет браузер при изменениях в исходниках html
export const html = () => {
    return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(app.plugins.notify.onError())) 
     .pipe(fileinclude())
     .pipe(app.plugins.replace(/@img\//g, './dist/img/'))
     .pipe(app.plugins.if(app.isProduct,
          versionNumber({
          'value': '%DT%',
          'append': {
            'key': '_v',
            'cover': 0,
            'to': ['css','js',]},
          'output': { 'file': 'gulp/version.json'}
          })))
     .pipe(app.gulp.dest(app.path.dist.html))
     .pipe(app.plugins.browsersync.stream())
}