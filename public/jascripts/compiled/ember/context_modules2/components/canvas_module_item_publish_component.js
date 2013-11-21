// Generated by CoffeeScript 1.3.3
(function() {

  define(['ember'], function(Ember) {
    return Ember.Component.extend({
      mouseEnter: function() {
        return this.set('hover', true);
      },
      mouseLeave: function() {
        return this.set('hover', false);
      },
      toggleExpandCollapse: function() {
        if (this.get('module.expanded')) {
          return this.set('module.expanded', false);
        } else {
          return this.set('module.expanded', true);
        }
      },
      togglePublish: function() {
        var _this = this;
        this.set('transitioning', true);
        setTimeout((function() {
          return _this.set('transitioning', false);
        }), 1000);
        this.set('hover', false);
        if (this.get('published')) {
          return this.set('published', false);
        } else {
          return this.set('published', true);
        }
      }
    });
  });

}).call(this);
