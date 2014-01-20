define('dashboard/jst/gradereport/row_student_name', ["compiled/handlebars_helpers","i18n!gradereport.row_student_name","jst/_avatar"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['gradereport/row_student_name'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, stack3, stack4, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class='student-section'>";
  foundHelper = helpers.sectionNames;
  stack1 = foundHelper || depth0.sectionNames;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "sectionNames", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n";
  return buffer;}

  stack1 = depth0;
  stack1 = self.invokePartial(partials.avatar, 'avatar', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class='student-name'><a class='student-grades-link' href=\"";
  foundHelper = helpers.url;
  stack1 = foundHelper || depth0.url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.display_name;
  stack1 = foundHelper || depth0.display_name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "display_name", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></div>\n";
  foundHelper = helpers.sectionNames;
  stack1 = foundHelper || depth0.sectionNames;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"student-placeholder\">\n  ";
  stack1 = "Student";
  stack2 = "student_placeholder";
  stack3 = {};
  stack4 = "gradereport.row_student_name";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;});
  
  
  return templates['gradereport/row_student_name'];
});
