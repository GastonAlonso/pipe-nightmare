module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                  ['babelify', {
                     loose: 'all'
                  }]
               ]
            },
            files: {
               // if the source file has an extension of es6 then
               // we change the name of the source file accordingly.
               // The result file's extension is always .js
               './dist/app.js': ['./js/app.js']
            }
         }
      },
      watch: {
         scripts: {
            files: ['./js/**/*.js'],
            tasks: ['browserify']
         }
      },
      uglify: {
          my_target: {
              files: {
                  'dist/app.min.js': ['dist/app.js']
              }
          }
      }
   });

   grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-uglify');

   grunt.registerTask('default', ['watch']);
   grunt.registerTask('build', ['browserify', 'uglify']);
};
