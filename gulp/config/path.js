// записываем в rootFolder имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// положим в переменные - пути к папкам dist и src 
const distFolder = './dist';
const srcFolder = './src';
const rootHtml = './index.html';
const versionJson = './gulp/version.json';

// объект со всеми путями
export const path = {
   dist: {
      images: `${distFolder}/img/`,
      files: `${distFolder}/files/`,
      js: `${distFolder}/js/`,
      fonts: `${distFolder}/fonts/`,
      css: `${distFolder}/css/`,
      html: `./`   
   },
   src: {
      svg: `${srcFolder}/img/**/*.svg`,
      js: `${srcFolder}/js/app.js`,
      html: `${srcFolder}/*.html`,
      scss: `${srcFolder}/scss/styles.scss`,
      files: `${srcFolder}/files/**/*.*`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
   },
   watch: {
      svg: `${srcFolder}/img/**/*.svg`,
      js: `${srcFolder}/js/**/*.js`,
      scss: `${srcFolder}/scss/**/*.scss`,
      html: `${srcFolder}/**/*.html`, 
      files: `${srcFolder}/files/**/*.*`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
   },
   clean: distFolder,
   cleanHtml: rootHtml,
   distFolder: distFolder,
   srcFolder: srcFolder,
   rootFolder: rootFolder,
   versionJson: versionJson,
}
