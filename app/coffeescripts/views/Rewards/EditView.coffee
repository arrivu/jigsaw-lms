define [
  'jst/rewards/EditView'
  'compiled/views/ValidatedFormView'
  'compiled/jquery/fixDialogButtons'
], (template, ValidatedFormView) ->
  class EditView extends ValidatedFormView
    template: template
    tagName: 'form'
    id: 'reward_form'

    className: 'validated-form-view form-horizontal bootstrap-form'

    afterRender: ->
      super
      @$el.dialog
        title: 'Edit Reward'
        width: 520
        height: "auto"
        resizable: true
        close: => @$el.remove()
        buttons: [
          class: "btn-primary"
          text: 'Submit'
          'data-text-while-loading':  'Saving...'
          click: => @submit()
        ]
      @$el.submit (e) =>
        @submit()
        return false
      this

    submit: ->
      this.$el.parent().find('.btn-primary').removeClass('ui-state-hover')
      super

    showErrors: (errors) ->
      @removeErrors()
      for fieldName, field of errors
        $input = @findField fieldName
        html = (@translations[message] or message for {message} in field).join('</p><p>')
        @addError($input, html)

    removeErrors: ->
      @$('.error .help-inline').remove()
      @$('.control-group').removeClass('error')
      @$('.alert.alert-error').remove()

    addError: (input, message) ->
      input = $(input)
      input.parents('.control-group').addClass('error')
      input.after("<span class='help-inline'>#{message}</span>")
      input.one 'keypress', ->
        $(this).parents('.control-group').removeClass('error')
        $(this).parents('.control-group').find('.help-inline').remove()

    onSaveFail: (xhr) =>
      super
      message = 'There was an error in processing your request'
      @$el.prepend("<div class='alert alert-error'>#{message}</span>")

