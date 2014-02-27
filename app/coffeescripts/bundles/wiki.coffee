require ['wiki'
         'jquery'
         'jqueryui/accordion'
], (Wiki, $ , accordion) ->

  $(document).ready ->
    $(".accordion").accordion()
    $('.ui-accordion-header-icon').remove()
    setTimeout (->
      console.log("inside timeout in wiki")
      $(".scribd_file_preview_link").click()
    ), 1000






