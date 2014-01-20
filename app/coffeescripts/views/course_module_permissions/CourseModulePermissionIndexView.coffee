define [
  'jquery'
  'underscore'
  'Backbone'
  'jst/course_module_permissions/coursePermissions'
], ($, _, Backbone, template) -> 
  class CourseModulePermissionIndexView extends Backbone.View
    template: template
