module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['./lib/tests/*.js']
      }
    }
  });
  grunt.registerTask('default', ['mochaTest']);
};