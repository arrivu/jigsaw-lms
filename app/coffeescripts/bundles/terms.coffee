require [
  'jquery'
  'compiled/views/ValidatedFormView'
  'compiled/jquery/fixDialogButtons'
  'compiled/tinymce'
  'tinymce.editor_box'
], ($, ValidatedFormView) ->

  class terms extends ValidatedFormView

    className: 'validated-form-view form-horizontal bootstrap-form'

    initialize: ->
      tinymce.execCommand('mceRemoveControl',true,'terms_and_conditions');
      super
      editor = @$el.find(".terms_and_conditions")
      editor.editorBox()
      setTimeout (->
        tinymce.execCommand "mceAddControl", true, "terms_and_conditions"
        editor.editorBox()
      ), 0



