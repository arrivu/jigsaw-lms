define [
  'Backbone'
  'underscore'
], ({Model}, _) ->
  class ManageReferral extends Model

   resourceName: "referrees"

   urlRoot: -> "referrees"


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


