define [
  'Backbone'
  'underscore'
  'str/htmlEscape'
  'jst/FindWistiaMediaView'
], (Backbone, _, h, template) ->

  class FindWistiaMediaView extends Backbone.View

    tagName: 'form'

    attributes:
      'class': 'bootstrap-form form-horizontal FindFlickrImageView'

    template: template


