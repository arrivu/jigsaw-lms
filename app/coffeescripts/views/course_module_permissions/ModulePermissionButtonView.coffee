define [
  'jquery'
  'underscore'
  'Backbone'
  'jst/course_module_permissions/modulePermissionButton'
], ($, _, Backbone, template) ->
  class PermissionButtonView extends Backbone.View
    template: template
    tagName: 'td'
    className: 'permissionButtonView'

    events:
      'click .dropdown-toggle' : "updatePermission"


    initialize: ->
      super
      @user_id = @options.user_id if @options.user_id
      @user_enrolled = @options.user_enrolled

    toJSON: ->
      json = super

      json['user_id'] = @user_id
      json['module_id'] = @model.id
      json['user_enrolled'] = @user_enrolled

      json


    saveModel:(module_id,user_id,work_status) ->
      @model.save {module_id: module_id,user_id:user_id,status:work_status},
        failure: ->
          alert 'module was not be saved!'
    updatePermission: (event) ->

      switch $(event.currentTarget).children().first().prop("class")
        when "icon-x"
          work_status = "active"
          break
        when "icon-check"
          work_status = "inactive"
          break


      module_id = $(event.currentTarget).attr("data-module_id")
      user_id = $(event.currentTarget).attr("data-user_id")
      $(".ui-get-user-id"+user_id).text "SelectAll"
      $(".ui-get-id"+module_id).text "SelectAll"
      @saveModel(module_id,user_id,work_status)
      icon = $(event.currentTarget).children().first().prop("class")
      if icon is "icon-x"
       $(event.currentTarget).find("i").removeClass("icon-x").addClass "icon-check"
      else
       $(event.currentTarget).find("i").removeClass("icon-check").addClass "icon-x"

