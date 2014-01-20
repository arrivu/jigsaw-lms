define [
  'jquery'
  'underscore'
  'Backbone'
  'jst/course_referrals/InviteFriendsError'
], ($, _, Backbone, template) ->
  class InviteFriendsErrorView extends Backbone.View
    template: template


    @optionProperty 'errored_users_list'

    initialize: ->
      @errored_users = eval(this.options.errored_users_list)


    toJSON: ->
      json = super

      json['errored_users'] = @errored_users

      json

