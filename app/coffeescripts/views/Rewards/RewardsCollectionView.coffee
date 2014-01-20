define [
  'jquery'
  'str/htmlEscape'
  'jst/rewards/RewardsCollectionView'
  'compiled/views/Rewards/RewardListView'
  'compiled/views/PaginatedCollectionView'
  'i18n!rewards'
], ($, htmlEscape, template, RewardListView, PaginatedCollectionView, I18n) ->

  class RewardsCollectionView extends PaginatedCollectionView

    template: template
    itemView: RewardListView



