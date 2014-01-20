(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'Backbone', 'jst/gradereport/total_column_header'], function($, Backbone, template) {
    var TotalColumnHeaderView, _ref;

    return TotalColumnHeaderView = (function(_super) {
      __extends(TotalColumnHeaderView, _super);

      function TotalColumnHeaderView() {
        this.togglePercent = __bind(this.togglePercent, this);        _ref = TotalColumnHeaderView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      TotalColumnHeaderView.prototype.el = '#total_column_header';

      TotalColumnHeaderView.prototype.events = {
        "click .toggle_percent": "togglePercent"
      };

      TotalColumnHeaderView.prototype.template = template;

      TotalColumnHeaderView.prototype.togglePercent = function() {
        this.options.toggleShowingPoints();
        this.render();
        return false;
      };

      TotalColumnHeaderView.prototype.render = function() {
        if (this.$menu) {
          this.$menu.remove();
        }
        TotalColumnHeaderView.__super__.render.call(this);
        if (this.options.weightedGroups()) {
          return this;
        }
        this.$menu = this.$el.find('.gradebook-header-menu');
        this.$el.find('#total_dropdown').kyleMenu({
          noButton: true,
          appendMenuTo: '#gradebook_grid'
        });
        this.$menu.css('width', '150');
        return this;
      };

      TotalColumnHeaderView.prototype.toJSON = function() {
        var json;

        return json = {
          showingPoints: this.options.showingPoints,
          weightedGroups: this.options.weightedGroups
        };
      };

      return TotalColumnHeaderView;

    })(Backbone.View);
  });

}).call(this);
