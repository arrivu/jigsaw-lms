// Generated by CoffeeScript 1.3.3
(function() {

  define(function() {
    var round;
    round = function(n, digits) {
      var x;
      if (digits == null) {
        digits = 0;
      }
      x = Math.pow(10, digits);
      return Math.round(n * x) / x;
    };
    round.DEFAULT = 2;
    return round;
  });

}).call(this);
