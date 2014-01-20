define [
  'jquery'
  'i18n!rewards'
  'str/htmlEscape'
  'jst/rewards/ManageReferralsIndexView'
  'compiled/models/ManageReferral'
  'compiled/jquery.rails_flash_notifications',
], ($, I18n, htmlEscape, template, ManageReferral) ->

  class ManageReferralsIndexView extends Backbone.View

    @child 'manageReferralsCollectionView', '[data-view=redeemRewards]'
    template: template
    events:
      'click [data-coupon-reward]': 'couponReward'

    afterRender: ->
      @showRewardsView()

    showRewardsView: =>
      @manageReferralsCollectionView.collection.fetch()
      @model_url = @manageReferralsCollectionView.collection.url()
      @manageReferralsCollectionView.show()

    couponReward: (event) ->
      @current_event = event
      view = @$(event.currentTarget).closest('.referrees_item').data('view')
      referree = view.model
      referree.url = @model_url
      btntext = @$(event.currentTarget).prop("class")
      if btntext is "coupon_reward_link btn btn-primary"
        @$(event.currentTarget).removeClass "btn-primary"
        @$(event.currentTarget).addClass "btn-danger"
        @$(event.currentTarget).text "Recover"
        work_status = "used"
      else
        @$(event.currentTarget).removeClass "btn-danger"
        @$(event.currentTarget).addClass "btn-primary"
        @$(event.currentTarget).text "Redeem"
        work_status = "Waiting for enroll"
      @$el.disableWhileLoading referree.save({coupon_code: referree.attributes.coupon_code,status:work_status},
        wait :true
        success: (referree,response) ->
          $.flashMessage('Redeemed Successfully!')
        error: (referree,response) ->
          $.flashMessage("There is some error while saving reward! #{response}")
      )
