define [
  'i18n!editor'
  'jquery'
  'underscore'
  'Backbone'
  'compiled/fn/preventDefault'
  'jst/tinymce/WistiaVideoComboView'

], (I18n, $, _, Backbone, preventDefault, template) ->

  class WistiaVideoComboView extends Backbone.View

    template: template

    tagName: 'option'


    initialize: (options) ->
      @$el.attr 'value', options.option_value



