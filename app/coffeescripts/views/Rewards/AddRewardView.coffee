define [
  'jquery'
  'jst/rewards/AddRewardView'
  'compiled/views/ValidatedFormView'
  'compiled/jquery/fixDialogButtons'
  'jquery.instructure_date_and_time'
  'compiled/tinymce'
  'tinymce.editor_box'
], ($, template, ValidatedFormView) ->

  class AddRewardView extends ValidatedFormView
    template: template
    tagName: 'form'
    id: 'reward_form'

    className: 'validated-form-view form-horizontal bootstrap-form'

    initialize: ->
      tinymce.execCommand('mceRemoveControl',true,'email_text');

    afterRender: ->
      super
      @$el.dialog
        title: 'Add Reward'
        width: 920
        height: "auto"
        resizable: true
        close: => @$el.remove()
        buttons: [
          class: "btn-primary"
          text:  'Submit'
          'data-text-while-loading': 'Saving...'
          click: => @submit()
        ]
      timeField = @$el.find(".date_field")
      timeField.date_field()
      editor = @$el.find(".rich_editor")
      editor.editorBox()
      setTimeout (->
        tinymce.execCommand "mceAddControl", true, "email_text"
        editor.editorBox()
      ), 0
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

