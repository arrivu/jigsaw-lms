define [
  'jquery'
  'jst/LeaderBoard/LeaderBoardView'
], ($, template, I18n) ->

  class LeaderBoardView extends Backbone.View

    template: template
    tagName: 'li'
    className: 'leader_board_item'

    afterRender: ->
      @$el.attr('id', 'leader_board_' + @model.get('id'))
      this

    toJSON: ->

      json = super

      json
