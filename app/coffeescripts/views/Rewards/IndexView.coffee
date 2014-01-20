define [
  'jquery'
  'i18n!rewards'
  'str/htmlEscape'
  'jst/rewards/IndexView'
  'compiled/views/Rewards/AddRewardView'
  'compiled/models/Reward'
  'compiled/collections/ManageReferralsCollection'
  'compiled/views/Rewards/ManageReferralsCollectionView'
  'compiled/views/Rewards/ManageReferralsIndexView',
], ($, I18n, htmlEscape, template, AddRewardView, Reward,ManageReferralsCollection,ManageReferralsCollectionView,ManageReferralsIndexView) ->

  class IndexView extends Backbone.View

    @child 'rewardsCollectionView', '[data-view=rewards]'

    template: template

    events:
      'click .add_tool_link': 'addReward'
      'click .add_manage_tool_link': 'manageReward'
      'click .add_show_tool_link': 'showReward'
      'click [data-edit-reward]': 'editReward'
      'click [data-delete-reward]': 'deleteReward'

    afterRender: ->
      @showRewardsView()


    showRewardsView: =>
      @rewardsCollectionView.collection.fetch()
      @rewardsCollectionView.show()

    addReward: ->
      newReward = new Reward
      newReward.on 'sync', @onRewardSync
      @addRewardView = new AddRewardView(model: newReward).render()

    manageReward: ->
      $("#reward_add").hide()
      $("#reward_manage").show()
      $(".add_show_tool_link").css "display", "block"
      manageReferralsCollection = new ManageReferralsCollection
      manageReferralsCollectionView = new ManageReferralsCollectionView
        collection: manageReferralsCollection
      @manageReferralsIndexView = new ManageReferralsIndexView
        manageReferralsCollectionView: manageReferralsCollectionView
        el: '#redeemRewards'
      @manageReferralsIndexView.render()
      manageReferralsCollection.fetch()

    showReward: ->
      $("#reward_add").show()
      $("#reward_manage").hide()

    editReward: (event) ->
      view = @$(event.currentTarget).closest('.reward_item').data('view')
      reward = view.model
      reward.on 'sync', @onRewardSync
      @addRewardView = new AddRewardView(model: reward).render()

    onRewardSync: (model) =>
      @addRewardView.remove() if @addRewardView
      @showRewardsView()
      $.flashMessage(htmlEscape(I18n.t('reward_saved_message', "%{reward} saved successfully!", { reward: model.get('name') })))

    deleteReward: (event) ->
      view = @$(event.currentTarget).closest('.reward_item').data('view')
      reward = view.model
      msg =  "Are you sure you want to remove this Reward?"
      dialog = $("<div>#{msg}</div>").dialog
        modal: true,
        resizable: false
        title: I18n.t('delete', 'Delete') + ' ' + reward.get('name') + '?'
        buttons: [
          text: 'Cancel'
          click: => dialog.dialog 'close'
        ,
          text: 'Delete'
          click: =>
            reward.on('sync', => @rewardsCollectionView.collection.fetch())
            reward.destroy()
            dialog.dialog 'close'
        ]



