
module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        includePaths: ['src/style/'],
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'dsc/stl.css': 'src/style/stl.sass'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'dsc/app.js': 'src/engine/app.jsx'
        }
      },
      options: {
        transform: ['babelify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['sass', 'browserify']);
  grunt.file.copy('src/index.html', 'dsc/index.html');
}
