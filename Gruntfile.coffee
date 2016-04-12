###
  Gruntfile.coffee

###

module.exports = (grunt) ->

  require('time-grunt') grunt
  require('load-grunt-tasks') grunt

  grunt.initConfig
    rsync:
      options:
        ssh: true
        port: 18765
        recursive: true
        src: 'build/'
        host: 'imcv1@imcv.org.au'
        delete: true
      uat:
        options:
          dest: '~/public_html/goluki'

  grunt.registerTask 'deploy:uat', [
    'rsync:uat'
  ]

  grunt.registerTask 'default', [
    'deploy:uat'
  ]
