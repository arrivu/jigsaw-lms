define [
  'Backbone'
  'underscore'
  'compiled/models/Referral'
], (Backbone, _, Referral) ->
  class CourseReferralsCollection extends Backbone.Collection
    model: Referral
