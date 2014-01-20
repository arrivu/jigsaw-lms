define('dashboard/jst/gradereport/column_header', ["compiled/handlebars_helpers","i18n!gradereport.column_header"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['gradereport/column_header'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    title=\"";
  stack1 = "This assignment is muted";
  stack2 = "this_assignment_is_muted";
  stack3 = {};
  stack4 = "gradereport.column_header";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n  ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    title=\"";
  stack1 = "Assignments in this group have no points possible and cannot be included in grade calculation";
  stack2 = "zero_point_assignment";
  stack3 = {};
  stack4 = "gradereport.column_header";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n  ";
  return buffer;}

function program5(depth0,data) {
  
  
  return "muted";}

function program7(depth0,data) {
  
  
  return "\n    <i class=\"icon-warning\"></i>\n  ";}

function program9(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n  <div class='assignment-points-possible'>\n    ";
  stack1 = "Out of %{assignment.points_possible}";
  stack2 = "points_out_of";
  stack3 = {};
  stack4 = "gradereport.column_header";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n";
  return buffer;}

  buffer += "<a\n  ";
  foundHelper = helpers.assignment;
  stack1 = foundHelper || depth0.assignment;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.muted);
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  foundHelper = helpers.assignment;
  stack1 = foundHelper || depth0.assignment;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.invalid);
  stack2 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  class=\"assignment-name ";
  foundHelper = helpers.assignment;
  stack1 = foundHelper || depth0.assignment;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.muted);
  stack2 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n  href=\"";
  foundHelper = helpers.href;
  stack1 = foundHelper || depth0.href;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "href", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"\n>\n  ";
  foundHelper = helpers.assignment;
  stack1 = foundHelper || depth0.assignment;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.invalid);
  stack2 = helpers['if'];
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  foundHelper = helpers.assignment;
  stack1 = foundHelper || depth0.assignment;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.name);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "assignment.name", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</a>\n<a class=\"gradebook-header-drop assignment_header_drop\" data-assignment-id=\"";
  foundHelper = helpers.assignment;
  stack1 = foundHelper || depth0.assignment;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.id);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "assignment.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" href=\"#\" role=\"button\">\n  ";
  stack1 = "Assignment Options";
  stack2 = "assignment_options";
  stack3 = {};
  stack4 = "gradereport.column_header";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</a>\n";
  foundHelper = helpers.showPointsPossible;
  stack1 = foundHelper || depth0.showPointsPossible;
  stack2 = helpers['if'];
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
  
  
  return templates['gradereport/column_header'];
});
