define [
  'underscore'
  'Backbone'
  'jst/DiscussionTopics/IndexView'
  'compiled/views/DiscussionTopics/DiscussionsSettingsView'
  'compiled/views/DiscussionTopics/UserSettingsView'
], (_, {View}, template, DiscussionsSettingsView, UserSettingsView) ->

  class IndexView extends View
    template: template

    el: '#content'
    @child 'discussionTagView', '.discussion_tag.discussion-list'
    @child 'openDiscussionView',   '.open.discussion-list'
    @child 'lockedDiscussionView', '.locked.discussion-list'
    @child 'pinnedDiscussionView', '.pinned.discussion-list'

    events:
      'click .ig-header .element_toggler': 'toggleDiscussionList'
      'click #edit_discussions_settings':  'toggleSettingsView'
      'change #onlyUnread, #onlyGraded':   'filterResults'
      'keyup #searchTerm':                 'filterResults'
      'click .token-input-token': 'filterByTag'

    filterByTag: (event) ->
      $(event.target).toggleClass "token-input-selected-token"
      $(event.target).siblings().removeClass "token-input-selected-token"
      clicked_tag_id = event.target.value
      clicked_tag_id = parseInt(clicked_tag_id, 10)
      for key, value of ENV.TagWithDiscussionIds
        key = parseInt(key, 10)
        if key == clicked_tag_id
          _.each @collections(), (collection) =>
            collection.each (model) =>
                model.set('hidden', check_dt(model.get('id'), value))

    check_dt = (my_item, my_array) ->
      for item in my_array
        return false if item == my_item
      true and $(event.target).hasClass('token-input-selected-token')


    $(document).click ->
    $(".token-input-token").removeClass "token-input-selected-token" #make all inactive


    filters:
      onlyGraded:
        active: false
        fn: (model) ->
          model.get('assignment_id')
      onlyUnread:
        active: false
        fn: (model) ->
          model.get('unread_count') > 0 or model.get('read_state') is 'unread'
      searchTerm:
        active: false
        fn: (model, term) ->
          return unless term
          regex = new RegExp(term, 'ig')
          model.get('title').match(regex) or
            model.get('user_name').match(regex) or
            model.summary().match(regex)

    collections: ->
      [
        @options.openDiscussionView.collection
        @options.lockedDiscussionView.collection
        @options.pinnedDiscussionView.collection
      ]

    afterRender: ->
      @$('#discussionsFilter').buttonset()

    activeFilters: ->
      _.select(@filters, (value, key) => value.active)

    filter: (model, term) =>
      _.all(@activeFilters(), (filter) -> filter.fn.call(model, model, term))

    filterResults: (e) =>
      if e.target.type is 'checkbox'
        @filters[e.target.id].active = $(e.target).prop('checked')
        term = $('#searchTerm').val() if $('#searchTerm').val().length > 0
      else
        @filters[e.target.id].active = $(e.target).val().length > 0
        term = $(e.target).val()

      _.each @collections(), (collection) =>
        collection.each (model) =>
          if @activeFilters().length > 0
            model.set('hidden', !@filter(model, term))
          else
            model.set('hidden', false)

    toggleSettingsView: ->
      @settingsView().toggle()

    toggleDiscussionList: (e) ->
      $(e.currentTarget).find('i')
        .toggleClass('icon-mini-arrow-down')
        .toggleClass('icon-mini-arrow-right')

    settingsView: ->
      @_settingsView or= if @options.permissions.change_settings
        new DiscussionsSettingsView()
      else
        new UserSettingsView()
      @_settingsView

    toJSON: ->
      _.extend {},
        options: @options,
        length: 1,
        atLeastOnePageFetched: true
        new_topic_url: ENV.newTopicURL
