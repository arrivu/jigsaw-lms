define [
  'i18n!live_class_links'
  'jst/LiveClassLinks/EditView'
  'compiled/views/ValidatedFormView'
  'compiled/jquery/fixDialogButtons'
], (I18n, template, ValidatedFormView) ->

  class EditView extends ValidatedFormView
    template: template
    tagName: 'form'
    id: 'live_class_link_form'

    className: 'validated-form-view form-horizontal bootstrap-form'

    events:
      'change #external_tool_config_type': 'onConfigTypeChange'

    initialize: ->
      @courseModules = @options.courseModules if @options.courseModules
      @courseSections = @options.courseSections if @options.courseSections

    toJSON: ->
      json = super

      json['courseModules'] = @courseModules
      json['courseSections'] = @courseSections

      json

    afterRender: ->
      super
      @$el.dialog
        title: "Edit live class link"
        width: 520
        height: "auto"
        resizable: true
        close: => @$el.remove()
        buttons: [
          class: "btn-primary"
          text: I18n.t 'submit', 'Submit'
          'data-text-while-loading': I18n.t 'saving', 'Saving...'
          click: => @submit()
        ]
      @onConfigTypeChange()
      @$el.submit (e) =>
        @submit()
        return false
      this

    submit: ->
      this.$el.parent().find('.btn-primary').removeClass('ui-state-hover')
      super

    onConfigTypeChange: ->
      configType = @$('#external_tool_config_type').val()
      @$('.config_type').hide().attr('aria-expanded', false)
      @$(".config_type.#{configType}").show().attr('aria-expanded', true)

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
      message = I18n.t 'generic_error', 'There was an error in processing your request'
      @$el.prepend("<div class='alert alert-error'>#{message}</span>")

