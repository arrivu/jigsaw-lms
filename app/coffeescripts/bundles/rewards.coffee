require [
  'compiled/collections/RewardCollection',
  'compiled/views/Rewards/IndexView'
  'compiled/views/Rewards/RewardsCollectionView'
], (RewardCollection, IndexView, RewardsCollectionView) ->

  # Collections

  rewardCollection = new RewardCollection

  rewardsCollectionView = new RewardsCollectionView
    collection: rewardCollection

  @app = new IndexView
     rewardsCollectionView: rewardsCollectionView
     el: '#rewards'

  @app.render()
  rewardCollection.fetch()
