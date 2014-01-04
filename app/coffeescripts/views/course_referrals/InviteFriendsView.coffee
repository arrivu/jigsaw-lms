define [
  'jquery'
  'underscore'
  'Backbone'
  'jst/course_referrals/InviteFriendsView'
  'compiled/views/course_referrals/InviteFriendsErrorView'
  'compiled/views/course_referrals/MyReferencesView'
  'compiled/tinymce'
  'tinymce.editor_box'
], ($, _, Backbone, template, InviteFriendsErrorView, MyReferencesView) ->
  class InviteFriendsView extends Backbone.View
    template: template
    className: 'invite-friends'

    events:
      "click #referral_submit": "sendInvites"


    sendInvites: ->
      @.$el.find('#invite_friends_error_box').empty() # Clear error box every time
      errored_users = []
      emails = $('#referral_referral_emails').val().split(',')
      emails.map (email) ->
        unless isValidEmailAddress(email)
          errored_users.push email
      valid_emails = []
      i = 0
      $.grep emails, (el) ->
        valid_emails.push el  if $.inArray(el, errored_users) is -1
        i++
      if errored_users.length > 0
        @renderErrorView(errored_users)
      else
        @$el.disableWhileLoading @model.save valid_emails: valid_emails,mail_subject:  $('#referral_email_subject').val() ,mail_text: tinyMCE.activeEditor.getContent() ,
          wait: true
          success: (model, response) ->
            response.map (reference) =>
              myReferencesView = new MyReferencesView
                provider: reference.reference.provider
                invitation_sent_at : formatDate(new Date(reference.reference.created_at))
                status : reference.reference.status
              $("#references_table").prepend myReferencesView.render().el
            $.flashMessage 'Invitations sent'
            $('#referral_referral_emails').val('')
          error: (model, response) ->
            $.flashMessage 'Error while sending invitations please contact admin.'


    renderErrorView:(errored_users) =>
      @.$el.find('#invite_friends_error_box').empty() # Clear error box every time
      inviteFriendsErrorView = new InviteFriendsErrorView
        errored_users_list: errored_users
      @$el.find('#invite_friends_error_box').append inviteFriendsErrorView.render().el



    initialize: ->
      @referral = @options.referral
      @email_subject = @options.referral.email_subject if @options.referral
      @email_text = @options.referral.email_text if @options.referral
      @domain_url = @options.domain_url
      @fb_reference = @options.fb_reference.short_url_code if @options.fb_reference
      @tw_reference = @options.tw_reference.short_url_code if @options.tw_reference
      @li_reference = @options.li_reference.short_url_code if @options.li_reference
      @go_reference = @options.go_reference.short_url_code if @options.go_reference
      @gl_reference = @options.gl_reference.short_url_code if @options.gl_reference


    toJSON: ->
      json = super

      json['referral'] = @referral
      json['email_subject'] = @email_subject
      json['email_text'] = @email_text
      json['domain_url'] = @domain_url
      json['fb_reference'] = @fb_reference
      json['tw_reference'] = @tw_reference
      json['li_reference'] = @li_reference
      json['go_reference'] = @go_reference
      json['gl_reference'] = @gl_reference
      json['reward_description'] = $.parseJSON(ENV.COURSE_REWARD).reward.description unless $.parseJSON(ENV.COURSE_REWARD) == null

      json


    # Email validate regular experssion ,supports tags
    isValidEmailAddress = (emailAddress) ->
      pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i)
      pattern.test emailAddress


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


