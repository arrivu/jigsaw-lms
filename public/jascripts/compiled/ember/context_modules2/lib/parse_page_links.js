// Generated by CoffeeScript 1.3.3
(function() {

  define(['underscore'], function(_) {
    return function(xhr) {
      var linkHeader, linkRegex, nameRegex, pageRegex, perPageRegex, reduceFn, _ref;
      nameRegex = /rel="([a-z]+)/;
      linkRegex = /^<([^>]+)/;
      pageRegex = /\Wpage=(\d+)/;
      perPageRegex = /\per_page=(\d+)/;
      linkHeader = (_ref = xhr.getResponseHeader('link')) != null ? _ref.split(',') : void 0;
      if (linkHeader == null) {
        linkHeader = [];
      }
      return _.reduce(linkHeader, reduceFn = function(links, link) {
        var key, val;
        key = link.match(nameRegex)[1];
        val = link.match(linkRegex)[1];
        links[key] = val;
        return links;
      }, {});
    };
  });

}).call(this);
