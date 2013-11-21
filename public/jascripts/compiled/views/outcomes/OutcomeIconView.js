// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'str/htmlEscape', 'compiled/views/outcomes/OutcomeIconBase'], function($, _, h, OutcomeIconBase) {
    var OutcomeIconView;
    return OutcomeIconView = (function(_super) {

      __extends(OutcomeIconView, _super);

      function OutcomeIconView() {
        return OutcomeIconView.__super__.constructor.apply(this, arguments);
      }

      OutcomeIconView.prototype.className = 'outcome-link';

      OutcomeIconView.prototype.render = function() {
        this.$el.attr('data-id', this.model.get('id'));
        this.$el.html("<a href=\"#\" class=\"ellipsis\" title=\"" + (h(this.model.get('title'))) + "\">\n  <i class=\"icon-note-light\"></i>\n  <span>" + (h(this.model.get('title'))) + "</span>\n</a>");
        return OutcomeIconView.__super__.render.apply(this, arguments);
      };

      return OutcomeIconView;

    })(OutcomeIconBase);
  });

}).call(this);
