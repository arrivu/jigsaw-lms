define [
  'Backbone'
  'underscore'
  'compiled/models/ModulePermission'
], (Backbone, _, Role) ->
  class CourseModuleCollection extends Backbone.Collection
    model: Role
