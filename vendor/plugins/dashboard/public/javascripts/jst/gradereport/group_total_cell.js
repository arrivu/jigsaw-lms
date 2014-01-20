define('dashboard/jst/gradereport/group_total_cell', ["compiled/handlebars_helpers"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['gradereport/group_total_cell'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "gradebook-tooltip-last";}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  foundHelper = helpers.warning;
  stack1 = foundHelper || depth0.warning;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "warning", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n    ";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      ";
  foundHelper = helpers.showPointsNotPercent;
  stack1 = foundHelper || depth0.showPointsNotPercent;
  stack2 = helpers.unless;
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(8, program8, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;}
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  foundHelper = helpers.score;
  stack1 = foundHelper || depth0.score;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "score", { hash: {} }); }
  buffer += escapeExpression(stack1) + " / ";
  foundHelper = helpers.possible;
  stack1 = foundHelper || depth0.possible;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "possible", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n      ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        ";
  foundHelper = helpers.possible;
  stack1 = foundHelper || depth0.possible;
  stack2 = helpers['if'];
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(11, program11, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;}
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          ";
  foundHelper = helpers.percentage;
  stack1 = foundHelper || depth0.percentage;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "percentage", { hash: {} }); }
  buffer += escapeExpression(stack1) + "%\n        ";
  return buffer;}

function program11(depth0,data) {
  
  
  return "\n          -\n        ";}

function program13(depth0,data) {
  
  
  return "\n      <i class=\"icon-warning final-warning\"></i>\n    ";}

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  foundHelper = helpers.score;
  stack1 = foundHelper || depth0.score;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "score", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n    ";
  return buffer;}

function program17(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      ";
  foundHelper = helpers.possible;
  stack1 = foundHelper || depth0.possible;
  stack2 = helpers['if'];
  tmp1 = self.program(18, program18, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(20, program20, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;}
function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  foundHelper = helpers.percentage;
  stack1 = foundHelper || depth0.percentage;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "percentage", { hash: {} }); }
  buffer += escapeExpression(stack1) + "%\n      ";
  return buffer;}

function program20(depth0,data) {
  
  
  return "\n        -\n      ";}

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <span class='letter-grade-points'>";
  foundHelper = helpers.letterGrade;
  stack1 = foundHelper || depth0.letterGrade;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "letterGrade", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n  ";
  return buffer;}

  buffer += "<div class=\"gradebook-cell\">\n  <div class=\"gradebook-tooltip ";
  foundHelper = helpers.lastColumn;
  stack1 = foundHelper || depth0.lastColumn;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n    ";
  foundHelper = helpers.warning;
  stack1 = foundHelper || depth0.warning;
  stack2 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(5, program5, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  <span class=\"percentage\">\n    ";
  foundHelper = helpers.warning;
  stack1 = foundHelper || depth0.warning;
  stack2 = helpers['if'];
  tmp1 = self.program(13, program13, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  foundHelper = helpers.showPointsNotPercent;
  stack1 = foundHelper || depth0.showPointsNotPercent;
  stack2 = helpers['if'];
  tmp1 = self.program(15, program15, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(17, program17, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </span>\n   ";
  foundHelper = helpers.letterGrade;
  stack1 = foundHelper || depth0.letterGrade;
  stack2 = helpers['if'];
  tmp1 = self.program(22, program22, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;});
  
  
  return templates['gradereport/group_total_cell'];
});
