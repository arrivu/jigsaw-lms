define [
  'compiled/collections/PaginatedCollection'
  'compiled/models/LiveClassLink'
], (PaginatedCollection, LiveClassLink) ->

  class LiveClassLinkCollection extends PaginatedCollection
    model: LiveClassLink
