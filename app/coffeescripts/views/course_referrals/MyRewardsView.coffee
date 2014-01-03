define [
  'jquery'
  'underscore'
  'Backbone'
  'jst/course_referrals/MyRewards'
], ($, _, Backbone, template) ->
  class MyRewardsView extends Backbone.View
    template: template
    tagName: 'tr'

    initialize: ->
      @name = @options.name
      @email = @options.email
      @enrolled_at = @options.enrolled_at
      @reward_expiry_date = @options.reward_expiry_date
      @reward_code =  @options.reward_code


    toJSON: ->
      json = super

      json['name'] = @name
      json['email'] = @email
      json['enrolled_at'] = @enrolled_at
      json['reward_expiry_date'] = @reward_expiry_date
      json['reward_code'] = @reward_code

      json
