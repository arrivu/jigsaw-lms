define [
  'jquery'
  'str/htmlEscape'
  'jst/LeaderBoard/IndexView'
  'compiled/models/LeaderBoard'
], ($ , htmlEscape, template, LeaderBoard) ->

  class IndexView extends Backbone.View

    @child 'leaderBoardsView', '[data-view=LeaderBoard]'

    template: template

    events:
      'change #leader_board_sections_for_filter': 'filterBysection'

    filterBysection: (event) ->
      selected_course_section_id = $("#leader_board_sections_for_filter option:selected" ).val()
      @leaderBoardsView.collection.fetch({ data:{search_term: true ,course_section_id: selected_course_section_id}})
