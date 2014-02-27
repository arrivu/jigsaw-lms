require [
  'jquery'
  'jquery.doc_previews'
  'jquery.instructure_misc_plugins'
], ($) ->

  previewDefaults =
    height: '100%'
    scribdParams:
        auto_size: true

  previewDiv = $("#doc_preview")
  previewDiv.fillWindowWithMe()
  setTimeout (->
    console.log("inside timeout in files")
    previewDiv.loadDocPreview $.merge(previewDefaults, previewDiv.data())
  ), 1000
