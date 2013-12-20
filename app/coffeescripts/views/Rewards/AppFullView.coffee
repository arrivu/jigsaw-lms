define [
  'Backbone'
  'jquery'
  'jst/rewards/AppFullView'
  'compiled/views/PaginatedCollectionView'
  'compiled/views/Rewards/AppReviewView'
  'compiled/views/Rewards/RateRewardView'
  'compiled/collections/PaginatedCollection'
  'compiled/models/AppReview'
  'vendor/jquery.raty'
], (Backbone, $, template, PaginatedCollectionView, AppReviewView, RateToolView, PaginatedCollection, AppReview) ->

  class AppFullView extends PaginatedCollectionView
    template: template
    itemView: AppReviewView
    className: 'app_full'

    events:
      'click .add_app': 'addApp'
      'click .app_cancel': 'cancel'
      'click .rate_app': 'rateApp'

    initialize: ->
      @collection = new PaginatedCollection
      super
      @render()
      @collection.resourceName = "app_center/apps/#{@model.id}/reviews"
      @collection.fetch()

    afterRender: ->
      @$('.app-star').raty
        readOnly: true
        score: @model.get('avg_rating')
        path: '/images/raty/'

    renderItem: (model) =>
      if model.get('comments').length > 0
        super

    refresh: ->
      unless @collection.resourceName.match /force_refresh/
        @collection.resourceName = "#{@collection.resourceName}?force_refresh=1"
      @collection.fetch()

    addApp: (e) =>
      e.preventDefault() if e
      @trigger 'addApp', this

    cancel: (e) ->
      e.preventDefault() if e
      @trigger 'cancel', this

    rateApp: (e) ->
      e.preventDefault() if e

      $('#rate_app_loader').show()
      @review = new AppReview()
      @review.on 'sync', @refresh, this
      @review.resourceName = "app_center/apps/#{@model.id}/reviews/self"
      @rateAppView = new RateToolView({ model: @review })
      @review.fetch
        success: =>
          @rateAppView.render()
          $('#rate_app_loader').hide()
        error: =>
          @rateAppView.render()
          $('#rate_app_loader').hide()
