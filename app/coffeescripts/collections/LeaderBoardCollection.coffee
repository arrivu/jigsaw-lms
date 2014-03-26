define [
  'compiled/collections/PaginatedCollection'
  'compiled/models/LeaderBoard'
], (PaginatedCollection, LeaderBoard) ->

  class LeaderboardCollection extends PaginatedCollection
    model: LeaderBoard
