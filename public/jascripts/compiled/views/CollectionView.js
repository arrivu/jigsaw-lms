// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'Backbone', 'jst/collectionView'], function($, Backbone, template) {
    var CollectionView;
    return CollectionView = (function(_super) {

      __extends(CollectionView, _super);

      function CollectionView() {
        this.renderItem = __bind(this.renderItem, this);

        this.renderOnAdd = __bind(this.renderOnAdd, this);

        this.removeItem = __bind(this.removeItem, this);

        this.renderOnReset = __bind(this.renderOnReset, this);

        this.removePreviousItems = __bind(this.removePreviousItems, this);

        this.render = __bind(this.render, this);
        return CollectionView.__super__.constructor.apply(this, arguments);
      }

      CollectionView.optionProperty('itemView');

      CollectionView.optionProperty('itemViewOptions');

      CollectionView.prototype.className = 'collectionView';

      CollectionView.prototype.els = {
        '.collectionViewItems': '$list'
      };

      CollectionView.prototype.defaults = {
        itemViewOptions: {}
      };

      CollectionView.prototype.template = template;

      CollectionView.prototype.initialize = function(options) {
        CollectionView.__super__.initialize.apply(this, arguments);
        this.attachCollection();
        this.options.tagged = ENV.isTagAvaillable;
        return this.options.tagLists = eval(ENV.discussionTagLists);
      };

      CollectionView.prototype.render = function() {
        CollectionView.__super__.render.apply(this, arguments);
        if (!this.empty) {
          this.renderItems();
        }
        return this;
      };

      CollectionView.prototype.toJSON = function() {
        return this.options;
      };

      CollectionView.prototype.attachCollection = function() {
        this.collection.on('reset', this.renderOnReset);
        this.collection.on('add', this.renderOnAdd);
        this.collection.on('remove', this.removeItem);
        return this.empty = !this.collection.length;
      };

      CollectionView.prototype.removePreviousItems = function(models) {
        var model, _i, _len, _ref, _results;
        _results = [];
        for (_i = 0, _len = models.length; _i < _len; _i++) {
          model = models[_i];
          _results.push((_ref = model.view) != null ? _ref.remove() : void 0);
        }
        return _results;
      };

      CollectionView.prototype.renderOnReset = function(models, options) {
        this.empty = !this.collection.length;
        this.removePreviousItems(options.previousModels);
        return this.render();
      };

      CollectionView.prototype.renderItems = function() {
        return this.collection.each(this.renderItem);
      };

      CollectionView.prototype.removeItem = function(model) {
        this.empty = !this.collection.length;
        if (this.empty) {
          return this.render();
        } else {
          return model.view.remove();
        }
      };

      CollectionView.prototype.renderOnAdd = function(model) {
        if (this.empty) {
          this.render();
        }
        this.empty = false;
        return this.renderItem(model);
      };

      CollectionView.prototype.renderItem = function(model) {
        var view;
        view = this.createItemView(model);
        view.render();
        if (typeof this.attachItemView === "function") {
          this.attachItemView(model, view);
        }
        return this.insertView(view);
      };

      CollectionView.prototype.createItemView = function(model) {
        return new this.itemView($.extend({}, this.itemViewOptions || {}, {
          model: model
        }));
      };

      CollectionView.prototype.insertView = function(view) {
        var index;
        index = this.collection.indexOf(view.model);
        if (index === 0) {
          return this.prependView(view);
        } else if (index === this.collection.length - 1) {
          return this.appendView(view);
        } else {
          return this.insertViewAtIndex(view, index);
        }
      };

      CollectionView.prototype.insertViewAtIndex = function(view, index) {
        var $sibling;
        $sibling = this.$list.children().eq(index);
        if ($sibling.length) {
          return $sibling.before(view.el);
        } else {
          return this.$list.append(view.el);
        }
      };

      CollectionView.prototype.prependView = function(view) {
        return this.$list.prepend(view.el);
      };

      CollectionView.prototype.appendView = function(view) {
        return this.$list.append(view.el);
      };

      return CollectionView;

    })(Backbone.View);
  });

}).call(this);
