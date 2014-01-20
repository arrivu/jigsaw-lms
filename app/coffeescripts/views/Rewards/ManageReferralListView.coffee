define [
  'jquery'
  'jst/rewards/ManageReferralsList'
], ($, template) ->

  class ManageReferralListView extends Backbone.View

    template: template
    tagName: 'tr'
    className: 'referrees_item'

    afterRender: ->
      @$el.attr('id', 'referrees_' + @model.get('coupon_code'))
      this

    toJSON: ->
      json = super
      if @model.get('status') is "used"
        json['status_check'] = "true"
      else
        json['status_check'] = ""

      json
