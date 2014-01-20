define [
  'compiled/collections/PaginatedCollection'
  'compiled/models/ManageReferral'
], (PaginatedCollection, ManageReferral) ->

  class ManageReferralsCollection extends PaginatedCollection
    model: ManageReferral


