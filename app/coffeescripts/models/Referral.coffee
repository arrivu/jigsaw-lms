define [
  'Backbone'
  'underscore'
], (Backbone, _) ->
  class Referral extends Backbone.Model

    # Method Summary
    #   urlRoot is used in url to generate the a restful url. Because 
    #   the "id" is set to the roles name (see parse function), the 
    #   url uses the role name in place of the :id attribute in the url
    #
    #   ie: 
    #      /courses/:course_id/referrals
    #      /courses/:course_id/referrals/:referral_id
    #
    #   produces
    #      /courses/1/referrals
    #      /courses/1/referrals/1
    #
    # @api override backbone
    urlRoot: -> "referrals"




    # Method Summary
    #   See backbones explaination of a validate method for in depth 
    #   details but in short, if your return something from validate
    #   there is an error, if you don't, there are no errors. Throw 
    #   in the error object to any validation function you make. It's 
    #   passed by reference dawg.
    # @api override backbone
    validate: (attrs) ->
      errors = {}
      errors unless _.isEmpty errors
