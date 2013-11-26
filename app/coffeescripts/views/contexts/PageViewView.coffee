define [
  'jquery'
  'underscore'
  'compiled/views/PaginatedView'
  'jst/contexts/PageView'
], ($, _, PaginatedView, pageViewTemplate) ->

  class PageViewView extends PaginatedView
    # Public: Create a new instance.
    #
    # fetchOptions - Options to be passed to @collection.fetch(). Needs to be
    #   passed for subsequent page gets (see PaginatedView).
    initialize: ({fetchOptions}) ->
      @paginationScrollContainer = @$el.parent()
      super(fetchOptions: fetchOptions)

    # Public: Append new records to the page view table.
    #
    # Returns nothing.
    render: ->
      html = _.map(@collection.models, @renderPageView)
      @$el.append(html.join(''))
      super

    # Public: Return HTML for a given record.
    #
    # page_view - The page_view object to render as HTML.
    #
    # Returns an HTML string.
    renderPageView: (pageView) ->
      pageViewTemplate(pageView.toJSON())
