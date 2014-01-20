define [
  'compiled/collections/PaginatedCollection'
  'compiled/models/Reward'
], (PaginatedCollection, Reward) ->

  class RewardCollection extends PaginatedCollection
    model: Reward


