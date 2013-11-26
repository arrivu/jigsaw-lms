define [
  'Backbone'
  'underscore'
  'compiled/models/Offer'
], (Backbone, _, Offer) ->
  class OffersCollection extends Backbone.Collection
    model: Offer