define [
  'jquery'
  'underscore'
  'Backbone'
  'jst/course_referrals/courseReffealsIndex'
  'compiled/views/course_referrals/InviteFriendsView'
  'compiled/models/Referral'
  'compiled/views/course_referrals/MyReferencesView'
  'compiled/views/course_referrals/MyRewardsView'
], ($, _, Backbone, template, InviteFriendsView,Referral,MyReferencesView,MyRewardsView) ->
  class CourseReferralsIndexView extends Backbone.View
    referrals = $.parseJSON(ENV.COURSE_REFERRAL)
    course_referral = new Referral referrals.referral unless referrals == null
    my_references =  $.parseJSON(ENV.MY_REFERENCES)
    my_rewards = $.parseJSON(ENV.MY_REWARDS)
    course_reference_fb = $.parseJSON(ENV.COURSE_REFERENCE_FB)
    course_reference_tw = $.parseJSON(ENV.COURSE_REFERENCE_TW)
    course_reference_li = $.parseJSON(ENV.COURSE_REFERENCE_LI)
    course_reference_go = $.parseJSON(ENV.COURSE_REFERENCE_GO)
    course_reference_gl = $.parseJSON(ENV.COURSE_REFERENCE_GL)

    template: template

    els:
      "#referral_tabs": "$referralTabs"

    # Method Summary
    #   Enable tabs for invite friends/My references/My rewards
    #   And  append tab views
    # @api custom backbone override
    afterRender: ->
      @$referralTabs.tabs()
      @renderInviteFriendsView()
      @renderMyReferencesView()
      @renderMyRewardsView()


    renderInviteFriendsView: ->
      inviteFriendsView = new InviteFriendsView
        model: course_referral
        referral: referrals.referral unless referrals == null
        domain_url: eval(ENV.DOMAIN_URL)
        fb_reference:  course_reference_fb.reference unless course_reference_fb == null
        tw_reference:  course_reference_tw.reference unless course_reference_tw == null
        li_reference:  course_reference_li.reference unless course_reference_li == null
        go_reference:  course_reference_go.reference unless course_reference_go == null
        gl_reference:  course_reference_gl.reference unless course_reference_gl == null

      @$el.find('#invite').append inviteFriendsView.render().el

    renderMyReferencesView:->
      my_references.map (reference_array) =>
        myReferencesView = new MyReferencesView
          provider: reference_array.reference.provider
          invitation_sent_at : formatDate(new Date(reference_array.reference.created_at))
          status : reference_array.reference.status
        $("#references_table").prepend myReferencesView.render().el

    renderMyRewardsView:->
      my_rewards.map (reward) =>
        myRewardsView = new MyRewardsView
          name: reward.referrer_coupon.referree.name
          email: reward.referrer_coupon.referree.email
          enrolled_at: formatDate(new Date(reward.referrer_coupon.referree.updated_at))
          reward_expiry_date: formatDate(new Date(reward.referrer_coupon.expiry_date))
          reward_code: reward.referrer_coupon.coupon_code
        $("#rewards_table").prepend myRewardsView.render().el


    forceTwoDigits = (val) ->
      if val < 10
        return "0#{val}"
      return val

    formatDate = (date) ->
      year = date.getFullYear()
      month = forceTwoDigits(date.getMonth()+1)
      day = forceTwoDigits(date.getDate())
      hour = forceTwoDigits(date.getHours())
      minute = forceTwoDigits(date.getMinutes())
      second = forceTwoDigits(date.getSeconds())
      return "#{year}/#{month}/#{day}"



    toJSON: ->
      @options


