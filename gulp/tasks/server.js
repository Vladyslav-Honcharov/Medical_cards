export const server = (done) => {
   app.plugins.browsersync.init({
      server: {
         baseDir: `${app.path.dist.html}`
      },
      notify: false,
      port: 3000,
   })
}