require [
  'jquery'
  'underscore'
  'compiled/views/course_referrals/CourseReferralsIndexView'
], ($, _, CourseReferralsIndexView) ->

  courseReferralsIndexView = new CourseReferralsIndexView
    el: '#content'

#      'my-references': new MyReferencesView
#      'my-rewards': new MyRewardsView

  courseReferralsIndexView.render()

  $(document).ready ->
    editor = $("#referral_email_text")
    editor.editorBox()





