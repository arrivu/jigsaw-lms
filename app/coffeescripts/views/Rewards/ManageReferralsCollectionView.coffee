define [
  'jquery'
  'str/htmlEscape'
  'jst/rewards/ManageReferralsCollectionView'
  'compiled/views/Rewards/ManageReferralListView'
  'compiled/views/PaginatedCollectionView'
  'i18n!rewards'
], ($, htmlEscape, template, ManageReferralListView, PaginatedCollectionView, I18n) ->

  class ManageReferralsCollectionView extends PaginatedCollectionView

    template: template
    itemView: ManageReferralListView



