module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'SPA/js/index.js': ['src/calc.js']
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['lib/tests/*.js']
      }
    }
  });
  grunt.registerTask('default', ['mochaTest', 'browserify']);
};