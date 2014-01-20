require [
  'compiled/collections/AnnouncementsCollection'
  'compiled/collections/ExternalFeedCollection'
  'compiled/views/announcements/IndexView'
  'compiled/views/ExternalFeeds/IndexView'
], (AnnouncementsCollection, ExternalFeedCollection, IndexView, ExternalFeedsIndexView) ->

  collection = new AnnouncementsCollection

  if ENV.permissions.create and !ENV.home_page_announcement?
    externalFeeds = new ExternalFeedCollection
    externalFeeds.fetch()
    new ExternalFeedsIndexView
      permissions: ENV.permissions
      collection: externalFeeds

  new IndexView
    collection: collection
    permissions: ENV.permissions
    atom_feed_url: ENV.atom_feed_url
    is_not_course_home: !ENV.home_page_announcement?
    currentUserIsTeacher:  ENV.current_user_roles and 'teacher' in ENV.current_user_roles

  collection.fetch()
