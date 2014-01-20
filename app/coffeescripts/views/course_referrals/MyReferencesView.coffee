define [
  'jquery'
  'underscore'
  'Backbone'
  'jst/course_referrals/MyReferences'
], ($, _, Backbone, template) ->
  class MyReferencesView extends Backbone.View
    template: template
    tagName: 'tr'

    initialize: ->
      @provider = @options.provider
      @invitation_sent_at = @options.invitation_sent_at
      @status = @options.status



    toJSON: ->
      json = super

      json['provider'] = @provider
      json['invitation_sent_at'] = @invitation_sent_at
      json['status'] = @status

      json
