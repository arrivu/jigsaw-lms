require [
  'compiled/collections/LeaderBoardCollection',
  'compiled/collections/PaginatedCollection',
  'compiled/views/LeaderBoard/IndexView'
  'compiled/views/LeaderBoard/LeaderBoardsCollectionView'
  ], (LeaderBoardCollection, PaginatedCollection, IndexView, LeaderBoardsCollectionView) ->

    # Collection
    leaderBoardCollection = new LeaderBoardCollection
    leaderBoardCollection.setParam('per_page', 50)

    # View

    leaderBoardsCollectionView = new LeaderBoardsCollectionView
      collection: leaderBoardCollection

    @app = new IndexView
      leaderBoardsView: leaderBoardsCollectionView
      courseSections: ENV.course_sections
      course: ENV.course
      manage_students: ENV.manage_students
      section_name: ENV.course_sections[0].name if ENV.course_sections.length == 1
      el: '#content'

    @app.render()
    leaderBoardCollection.fetch()
