// Generated by CoffeeScript 1.3.3
(function() {

  define(['underscore', 'jquery', 'jqueryui/tooltip'], function(_, $) {
    var setPosition, using;
    using = function(position, feedback) {
      return $(this).css(position).removeClass("left right top bottom center middle vertical horizontal").addClass([feedback.horizontal, feedback.vertical, feedback.important].join(' '));
    };
    setPosition = function(opts) {
      var caret, positions;
      caret = function() {
        var _ref;
        if ((_ref = opts.tooltipClass) != null ? _ref.match('popover') : void 0) {
          return 30;
        } else {
          return 5;
        }
      };
      positions = {
        right: {
          my: "left center",
          at: "right+" + (caret()) + " center",
          collision: 'flipfit flipfit'
        },
        left: {
          my: "right center",
          at: "left-" + (caret()) + " center",
          collision: 'flipfit flipfit'
        },
        top: {
          my: "center bottom",
          at: "center top-" + (caret()),
          collision: 'flipfit flipfit'
        },
        bottom: {
          my: "center top",
          at: "center bottom+" + (caret()),
          collision: 'flipfit flipfit'
        }
      };
      if (opts.position in positions) {
        return opts.position = positions[opts.position];
      }
    };
    return $('body').on('mouseenter', '[data-tooltip]', function(event) {
      var $this, opts, _base;
      $this = $(this);
      opts = $this.data('tooltip');
      if (opts === 'right' || opts === 'left' || opts === 'top' || opts === 'bottom') {
        opts = {
          position: opts
        };
      }
      opts || (opts = {});
      opts.position || (opts.position = 'top');
      setPosition(opts);
      if (opts.collision) {
        opts.position.collision = opts.collision;
      }
      (_base = opts.position).using || (_base.using = using);
      return $this.removeAttr('data-tooltip').tooltip(opts).tooltip('open').click(function() {
        return $this.tooltip('close');
      });
    });
  });

}).call(this);
