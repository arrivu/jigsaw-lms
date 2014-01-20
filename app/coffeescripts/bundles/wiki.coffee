require ['wiki'
         'jquery'
         'jqueryui/accordion'
], (Wiki, $ , accordion) ->

  $(document).ready ->
    $(".accordion").accordion()
    $('.ui-accordion-header-icon').remove()






