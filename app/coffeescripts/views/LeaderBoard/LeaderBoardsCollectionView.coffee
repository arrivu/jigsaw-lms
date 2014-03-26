define [
  'jquery'
  'str/htmlEscape'
  'jst/LeaderBoard/LeaderBoardsCollectionView'
  'compiled/views/LeaderBoard/LeaderBoardView'
  'compiled/views/PaginatedCollectionView'
], ($, htmlEscape, template, LeaderBoardView, PaginatedCollectionView, I18n) ->

  class LeaderBoardsCollectionView extends PaginatedCollectionView

    template: template
    itemView: LeaderBoardView
