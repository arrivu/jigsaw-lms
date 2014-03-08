define [
  'jquery'
  'str/htmlEscape'
  'jst/LiveClassLinks/LiveClassLinksCollectionView'
  'compiled/views/LiveClassLinks/LiveClassLinkView'
  'compiled/views/PaginatedCollectionView'
  'i18n!live_class_links'
], ($, htmlEscape, template, LiveClassLinkView, PaginatedCollectionView, I18n) ->

  class LiveClassLinksCollectionView extends PaginatedCollectionView

    template: template
    itemView: LiveClassLinkView
