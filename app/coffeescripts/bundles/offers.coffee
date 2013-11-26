require [
  'jquery'
  'underscore'
  'compiled/models/Offer'
  'compiled/models/Account'
  'compiled/collections/OffersCollection'
  'compiled/views/offers/OffersIndexView'
], ($, _, Offer, Account, OffersCollection, OffersIndexView) ->

  # They will both use the same collection.
  offersIndexView = new OffersIndexView
    el: '#content'

  offersIndexView.render()

  # Make sure the left navigation permissions is highlighted.
  $('#offers-tabs').addClass 'active'