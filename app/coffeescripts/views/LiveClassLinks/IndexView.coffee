define [
  'jquery'
  'i18n!live_class_links'
  'str/htmlEscape'
  'jst/LiveClassLinks/IndexView'
  'compiled/views/LiveClassLinks/EditView'
  'compiled/views/LiveClassLinks/AddLiveClassView'
  'compiled/models/LiveClassLink'
], ($, I18n, htmlEscape, template, EditView, AddLiveClassView, LiveClassLink) ->

  class IndexView extends Backbone.View

    @child 'liveClassLinksView', '[data-view=liveClassLinks]'

    template: template

    els:
      '.view_live_class_link': '$viewLiveClassLink'
      '.add_live_class_link': '$addLiveClassLink'

    events:
      'click .add_live_class_link': 'addLiveClassLink'
      'click [data-edit-live-class-link]': 'editLiveClassLink'
      'click [data-delete-live-class-link]': 'deleteLiveClassLink'
      'click .filter_live_class_links': 'filterLiveClassLinks'

    filterLiveClassLinks: (event) ->
      selected_context_module_id = $("#modules_for_filter option:selected" ).val()
      selected_course_section_id= $("#live_class_sections_for_filter option:selected" ).val()
      @liveClassLinksView.collection.fetch({ data:{search_term: true ,context_module_id: selected_context_module_id,course_section_id: selected_course_section_id}})


    showLiveClassLinkView: =>
      @liveClassLinksView.collection.fetch()


    addLiveClassLink: ->
      newLink = new LiveClassLink
      newLink.on 'sync', @onLinkSync
      @addView = new AddLiveClassView(model: newLink,courseModules: ENV.course_modules ,courseSections: ENV.course_sections).render()

    editLiveClassLink: (event) ->
      view = @$(event.currentTarget).closest('.live_class_link_item').data('view')
      link = view.model
      link.on 'sync', @onLinkSync
      @editView = new EditView(model: link,courseModules: ENV.course_modules ,courseSections: ENV.course_sections).render()

    onLinkSync: (model) =>
      @editView.remove() if @editView
      @addView.remove() if @addView
      @showLiveClassLinkView()
      $.flashMessage(htmlEscape(I18n.t('app_saved_message', "%{app} saved successfully!", { app: model.get('name') })))


    deleteLiveClassLink: (event) ->
      view = @$(event.currentTarget).closest('.live_class_link_item').data('view')
      link = view.model
      msg = "Are you sure you want to remove this Live Class Link?"
      dialog = $("<div>#{msg}</div>").dialog
        modal: true,
        resizable: false
        title: I18n.t('delete', 'Delete') + ' ' + link.get('name') + '?'
        buttons: [
          text: I18n.t 'buttons.cancel', 'Cancel'
          click: => dialog.dialog 'close'
        ,
          text: I18n.t 'buttons.delete', 'Delete'
          click: =>
            link.on('sync', => @liveClassLinksView.collection.fetch())
            link.destroy()
            dialog.dialog 'close'
        ]