// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jquery', 'jst/accounts/admin_tools/authLoggingContentPane'], function(Backbone, $, template) {
    var AuthLoggingContentPaneView;
    return AuthLoggingContentPaneView = (function(_super) {

      __extends(AuthLoggingContentPaneView, _super);

      function AuthLoggingContentPaneView() {
        this.onFail = __bind(this.onFail, this);

        this.fetch = __bind(this.fetch, this);
        return AuthLoggingContentPaneView.__super__.constructor.apply(this, arguments);
      }

      AuthLoggingContentPaneView.child('searchForm', '#authLoggingSearchForm');

      AuthLoggingContentPaneView.child('resultsView', '#authLoggingSearchResults');

      AuthLoggingContentPaneView.prototype.template = template;

      AuthLoggingContentPaneView.prototype.attach = function() {
        return this.collection.on('setParams', this.fetch);
      };

      AuthLoggingContentPaneView.prototype.fetch = function() {
        return this.collection.fetch().fail(this.onFail);
      };

      AuthLoggingContentPaneView.prototype.onFail = function() {
        this.collection.reset();
        return this.resultsView.detachScroll();
      };

      return AuthLoggingContentPaneView;

    })(Backbone.View);
  });

}).call(this);
