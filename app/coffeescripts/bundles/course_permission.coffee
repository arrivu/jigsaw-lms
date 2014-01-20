require [
  'jquery'
  'underscore'
  'compiled/models/ModulePermission'
 # 'compiled/models/Account'
  'compiled/collections/CourseModuleCollection'
  'compiled/views/course_module_permissions/CourseModulePermissionIndexView'
  'compiled/views/course_module_permissions/ManageCourseModuleView'
], ($, _, ModulePermission, CourseModuleCollection, CourseModulePermissionIndexView, ManageCourseModuleView) ->

  course_modules = new CourseModuleCollection ENV.COURSE_MODULE_GROUPS_FOR_ENROLLMENT

  enrolled_users = ENV.ENROLLED_COURSE_USERS

  selected_module_users=ENV.MODULE_GROUP_PERMISSION_USER_IDS

  courseModulePermissionIndexView = new CourseModulePermissionIndexView
    el: '#content'
    views:
      '#course_module_permission' : new ManageCourseModuleView
        collection: course_modules
        enrolled_users: enrolled_users
        selected_module_users: selected_module_users

  courseModulePermissionIndexView.render()
  #$('#content').html(view.render().el)

