define('dashboard/jst/gradereport/total_column_header', ["compiled/handlebars_helpers","i18n!gradereport.total_column_header"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['gradereport/total_column_header'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n  <a id=total_dropdown class=gradebook-header-drop href=\"#\" role=button>\n    ";
  stack1 = "Options";
  stack2 = "options";
  stack3 = {};
  stack4 = "gradereport.total_column_header";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </a>\n  <ul class=gradebook-header-menu>\n    <li><a class=toggle_percent href=\"#\">\n      ";
  foundHelper = helpers.showingPoints;
  stack1 = foundHelper || depth0.showingPoints;
  stack2 = helpers['if'];
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(4, program4, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a></li>\n  </ul>\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        ";
  stack1 = "Switch to percent";
  stack2 = "switch_to_percent";
  stack3 = {};
  stack4 = "gradereport.total_column_header";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        ";
  stack1 = "Switch to points";
  stack2 = "switch_to_points";
  stack3 = {};
  stack4 = "gradereport.total_column_header";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;}

  foundHelper = helpers.weightedGroups;
  stack1 = foundHelper || depth0.weightedGroups;
  stack2 = helpers.unless;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
  
  
  return templates['gradereport/total_column_header'];
});
