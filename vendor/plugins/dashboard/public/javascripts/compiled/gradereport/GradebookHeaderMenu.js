(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['i18n!gradebook2', 'jquery', 'message_students', 'compiled/AssignmentDetailsDialog', 'compiled/AssignmentMuter', 'compiled/gradereport/SetDefaultGradeDialog', 'compiled/gradereport/CurveGradesDialog', 'jst/gradereport/GradebookHeaderMenu', 'jst/re_upload_submissions_form', 'underscore', 'jquery.instructure_forms', 'jqueryui/dialog', 'jquery.instructure_misc_helpers', 'jquery.instructure_misc_plugins', 'compiled/jquery.kylemenu'], function(I18n, $, messageStudents, AssignmentDetailsDialog, AssignmentMuter, SetDefaultGradeDialog, CurveGradesDialog, gradebookHeaderMenuTemplate, re_upload_submissions_form, _) {
    var GradebookHeaderMenu;

    return GradebookHeaderMenu = (function() {
      function GradebookHeaderMenu(assignment, $trigger, gradebook) {
        var templateLocals,
          _this = this;

        this.assignment = assignment;
        this.$trigger = $trigger;
        this.gradebook = gradebook;
        this.reuploadSubmissions = __bind(this.reuploadSubmissions, this);
        this.downloadSubmissions = __bind(this.downloadSubmissions, this);
        this.curveGrades = __bind(this.curveGrades, this);
        this.setDefaultGrade = __bind(this.setDefaultGrade, this);
        this.messageStudentsWho = __bind(this.messageStudentsWho, this);
        this.showAssignmentDetails = __bind(this.showAssignmentDetails, this);
        templateLocals = {
          assignmentUrl: "" + this.gradebook.options.context_url + "/assignments/" + this.assignment.id,
          speedGraderUrl: "" + this.gradebook.options.context_url + "/gradebook/speed_grader?assignment_id=" + this.assignment.id
        };
        if (!this.gradebook.options.speed_grader_enabled) {
          templateLocals.speedGraderUrl = null;
        }
        this.$menu = $(gradebookHeaderMenuTemplate(templateLocals)).insertAfter(this.$trigger);
        this.$trigger.kyleMenu({
          noButton: true
        });
        this.$menu.appendTo('#gradebook_grid').delegate('a', 'click', function(event) {
          var action;

          action = _this[$(event.target).data('action')];
          if (action) {
            action();
            return false;
          }
        }).bind('popupopen popupclose', function(event) {
          return _this.$trigger.toggleClass('ui-menu-trigger-menu-is-open', event.type === 'popupopen');
        }).bind('popupopen', function() {
          var action, condition, _ref, _results;

          _ref = {
            showAssignmentDetails: _this.gradebook.allSubmissionsLoaded,
            messageStudentsWho: _this.gradebook.allSubmissionsLoaded,
            setDefaultGrade: _this.gradebook.allSubmissionsLoaded,
            curveGrades: _this.gradebook.allSubmissionsLoaded && _this.assignment.grading_type !== 'pass_fail' && _this.assignment.points_possible,
            downloadSubmissions: ("" + _this.assignment.submission_types).match(/(online_upload|online_text_entry|online_url)/),
            reuploadSubmissions: _this.assignment.submissions_downloads > 0
          };
          _results = [];
          for (action in _ref) {
            condition = _ref[action];
            _results.push(_this.$menu.find("[data-action=" + action + "]").showIf(condition));
          }
          return _results;
        }).popup('open');
        new AssignmentMuter(this.$menu.find("[data-action=toggleMuting]"), this.assignment, "" + this.gradebook.options.context_url + "/assignments/" + this.assignment.id + "/mute");
      }

      GradebookHeaderMenu.prototype.showAssignmentDetails = function() {
        return new AssignmentDetailsDialog(this.assignment, this.gradebook);
      };

      GradebookHeaderMenu.prototype.messageStudentsWho = function() {
        var hasSubmission, options, students, submissionTypes,
          _this = this;

        students = _.map(this.gradebook.students, function(student) {
          return {
            id: student.id,
            name: student.name,
            score: student["assignment_" + _this.assignment.id].score,
            submitted_at: student["assignment_" + _this.assignment.id].submitted_at
          };
        });
        submissionTypes = this.assignment.submission_types;
        hasSubmission = true;
        if (submissionTypes.length === 0) {
          hasSubmission = false;
        } else if (submissionTypes.length === 1) {
          hasSubmission = !_.include(["none", "on_paper"], submissionTypes[0]);
        }
        options = [
          {
            text: I18n.t("students_who.havent_submitted_yet", "Haven't submitted yet")
          }, {
            text: I18n.t("students_who.havent_been_graded", "Haven't been graded")
          }, {
            text: I18n.t("students_who.scored_less_than", "Scored less than"),
            cutoff: true
          }, {
            text: I18n.t("students_who.scored_more_than", "Scored more than"),
            cutoff: true
          }
        ];
        if (!hasSubmission) {
          options.splice(0, 1);
        }
        return window.messageStudents({
          options: options,
          title: this.assignment.name,
          points_possible: this.assignment.points_possible,
          students: students,
          callback: function(selected, cutoff, students) {
            students = $.grep(students, function($student, idx) {
              var student;

              student = $student.user_data;
              if (selected === I18n.t("students_who.havent_submitted_yet", "Haven't submitted yet")) {
                return !student.submitted_at && (student.score == null);
              } else if (selected === I18n.t("students_who.havent_been_graded", "Haven't been graded")) {
                return student.score == null;
              } else if (selected === I18n.t("students_who.scored_less_than", "Scored less than")) {
                return (student.score != null) && student.score !== "" && (cutoff != null) && student.score < cutoff;
              } else if (selected === I18n.t("students_who.scored_more_than", "Scored more than")) {
                return (student.score != null) && student.score !== "" && (cutoff != null) && student.score > cutoff;
              }
            });
            return $.map(students, function(student) {
              return student.user_data.id;
            });
          }
        });
      };

      GradebookHeaderMenu.prototype.setDefaultGrade = function() {
        return new SetDefaultGradeDialog(this.assignment, this.gradebook);
      };

      GradebookHeaderMenu.prototype.curveGrades = function() {
        return new CurveGradesDialog(this.assignment, this.gradebook);
      };

      GradebookHeaderMenu.prototype.downloadSubmissions = function() {
        var url, _base, _ref;

        url = $.replaceTags(this.gradebook.options.download_assignment_submissions_url, "assignment_id", this.assignment.id);
        INST.downloadSubmissions(url);
        return this.assignment.submissions_downloads = ((_ref = (_base = this.assignment).submissions_downloads) != null ? _ref : _base.submissions_downloads = 0) + 1;
      };

      GradebookHeaderMenu.prototype.reuploadSubmissions = function() {
        var locals, url;

        if (!this.$re_upload_submissions_form) {
          locals = {
            authenticityToken: $("#ajax_authenticity_token").text()
          };
          GradebookHeaderMenu.prototype.$re_upload_submissions_form = $(re_upload_submissions_form(locals)).dialog({
            width: 400,
            modal: true,
            resizable: false,
            autoOpen: false
          }).submit(function() {
            var data;

            data = $(this).getFormData();
            if (!data.submissions_zip) {
              return false;
            } else if (!data.submissions_zip.match(/\.zip$/)) {
              $(this).formErrors({
                submissions_zip: I18n.t('errors.upload_as_zip', "Please upload files as a .zip")
              });
              return false;
            }
          });
        }
        url = $.replaceTags(this.gradebook.options.re_upload_submissions_url, "assignment_id", this.assignment.id);
        return this.$re_upload_submissions_form.attr('action', url).dialog('open');
      };

      return GradebookHeaderMenu;

    })();
  });

}).call(this);
