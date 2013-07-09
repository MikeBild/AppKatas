module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['./Lib/tests/*.js']
      }
    }
  });
  grunt.registerTask('default', ['mochaTest']);
};