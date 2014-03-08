define [
  'jquery'
  'jst/LiveClassLinks/LiveClassLinkView'
  'i18n!live_class_links'
], ($, template, I18n) ->

  class LiveClassLinkView extends Backbone.View

    template: template
    tagName: 'tr'
    className: 'live_class_link_item'

    afterRender: ->
      @$el.attr('id', 'live_class_link_' + @model.get('id'))
      this

    toJSON: ->

      json = super

      json
