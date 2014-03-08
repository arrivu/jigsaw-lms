require [
  'compiled/collections/LiveClassLinkCollection',
  'compiled/collections/PaginatedCollection',
  'compiled/views/LiveClassLinks/IndexView'
  'compiled/views/LiveClassLinks/LiveClassLinksCollectionView'
  ], (LiveClassLinkCollection, PaginatedCollection, IndexView, LiveClassLinksCollectionView) ->

    # Collections
    liveClassLinks = new LiveClassLinkCollection
    liveClassLinks.setParam('per_page', 20)

    # Views

    liveClassLinksCollectionView = new LiveClassLinksCollectionView
      collection: liveClassLinks

    @app = new IndexView
      liveClassLinksView: liveClassLinksCollectionView
      courseModules: ENV.course_modules
      courseSections: ENV.course_sections
      el: '#content'

    @app.render()
    liveClassLinks.fetch()
