define [
  'jquery'
  'underscore'
  'Backbone'
  'jst/Offers/offerIndexView'
], ($, _, Backbone, template) ->
  class OffersIndexView extends Backbone.View

    template: template

    els:
      "#offers_tabs": "$offersTabs"

    # Method Summary
    #   Enable tabs for account/course roles.
    # @api custom backbone override
    afterRender: ->
      @$offersTabs.tabs()

    toJSON: ->
      @options
