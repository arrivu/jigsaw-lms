define [
  'jquery'
  'jst/rewards/RewardList'
], ($, template) ->

  class RewardListView extends Backbone.View

    template: template
    tagName: 'tr'
    className: 'reward_item'

    afterRender: ->
      @$el.attr('id', 'reward_' + @model.get('id'))
      this

