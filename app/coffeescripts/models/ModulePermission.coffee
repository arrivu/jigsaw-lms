define [
  'Backbone'
  'underscore'
], (Backbone, _) ->
  class ModulePermission extends Backbone.Model

    course_id = ENV.COURSE_ID

    urlRoot: -> "/courses/#{course_id}/permissions"

    resourceName: 'user_module_group_enrollments'
