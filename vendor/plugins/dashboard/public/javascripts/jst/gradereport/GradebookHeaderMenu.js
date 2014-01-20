define('dashboard/jst/gradereport/GradebookHeaderMenu', ["compiled/handlebars_helpers","i18n!gradereport.gradebook_header_menu"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['gradereport/GradebookHeaderMenu'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    <li><a href=\"";
  foundHelper = helpers.speedGraderUrl;
  stack1 = foundHelper || depth0.speedGraderUrl;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "speedGraderUrl", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = "SpeedGrader";
  stack2 = "speedgrader";
  stack3 = {};
  stack4 = "gradereport.gradebook_header_menu";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n  ";
  return buffer;}

  buffer += "<ul class=\"gradebook-header-menu\">\n  <li><a data-action=\"showAssignmentDetails\" href=\"";
  foundHelper = helpers.assignmentUrl;
  stack1 = foundHelper || depth0.assignmentUrl;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "assignmentUrl", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = "Assignment Details";
  stack2 = "assignment_details";
  stack3 = {};
  stack4 = "gradereport.gradebook_header_menu";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n  ";
  foundHelper = helpers.speedGraderUrl;
  stack1 = foundHelper || depth0.speedGraderUrl;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <li><a data-action=\"messageStudentsWho\" href=\"#\">";
  stack1 = "Message Students Who...";
  stack2 = "message_students_who";
  stack3 = {};
  stack4 = "gradereport.gradebook_header_menu";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n  <li><a data-action=\"setDefaultGrade\" href=\"#\">";
  stack1 = "Set Default Grade";
  stack2 = "set_default_grade";
  stack3 = {};
  stack4 = "gradereport.gradebook_header_menu";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n  <li><a data-action=\"curveGrades\" href=\"#\">";
  stack1 = "Curve Grades";
  stack2 = "curve_grades";
  stack3 = {};
  stack4 = "gradereport.gradebook_header_menu";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n  <li><a data-action=\"downloadSubmissions\" href=\"#\">";
  stack1 = "Download Submissions";
  stack2 = "download_submissions";
  stack3 = {};
  stack4 = "gradereport.gradebook_header_menu";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n  <li><a data-action=\"reuploadSubmissions\" href=\"#\">";
  stack1 = "Re-Upload Submissions";
  stack2 = "re_upload_submissions";
  stack3 = {};
  stack4 = "gradereport.gradebook_header_menu";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n  <li><a data-action=\"toggleMuting\" href=\"#\"></a></li>\n</ul>\n";
  return buffer;});
  
  
  return templates['gradereport/GradebookHeaderMenu'];
});
