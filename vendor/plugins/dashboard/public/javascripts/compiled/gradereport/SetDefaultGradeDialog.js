(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['i18n!gradebook2', 'jquery', 'jst/SetDefaultGradeDialog', 'underscore', 'jquery.disableWhileLoading', 'jquery.instructure_forms', 'jqueryui/dialog', 'jquery.instructure_misc_plugins', 'vendor/jquery.ba-tinypubsub', 'compiled/jquery/fixDialogButtons', 'jst/_grading_box'], function(I18n, $, setDefaultGradeDialogTemplate, _) {
    var SetDefaultGradeDialog;

    return SetDefaultGradeDialog = (function() {
      function SetDefaultGradeDialog(assignment, gradebook) {
        this.assignment = assignment;
        this.gradebook = gradebook;
        this.initDialog = __bind(this.initDialog, this);
        this.initDialog();
      }

      SetDefaultGradeDialog.prototype.initDialog = function() {
        var templateLocals,
          _this = this;

        templateLocals = {
          assignment: this.assignment,
          showPointsPossible: this.assignment.points_possible || this.assignment.points_possible === '0',
          url: "/courses/" + this.gradebook.options.context_id + "/gradebook/update_submission"
        };
        templateLocals["assignment_grading_type_is_" + this.assignment.grading_type] = true;
        this.$dialog = $(setDefaultGradeDialogTemplate(templateLocals));
        this.$dialog.dialog({
          resizable: false,
          width: 350,
          open: function() {
            return _this.$dialog.find(".grading_box").focus();
          },
          close: function() {
            return _this.$dialog.remove();
          }
        }).fixDialogButtons();
        return this.$dialog.formSubmit({
          disableWhileLoading: true,
          processData: function(data) {
            var canOverwrite, hasNoScore, idx, inSection, student, studentsAffected, updateData, _ref;

            studentsAffected = 0;
            hasNoScore = function(student) {
              return student["assignment_" + _this.assignment.id].score == null;
            };
            canOverwrite = data.overwrite_existing_grades;
            inSection = function(student) {
              if (_this.gradebook.sectionToShow) {
                return _.include(student.sections, _this.gradebook.sectionToShow);
              } else {
                return true;
              }
            };
            updateData = function(idx, student) {
              studentsAffected = studentsAffected + 1;
              data["submissions[submission_" + idx + "][assignment_id]"] = _this.assignment.id;
              data["submissions[submission_" + idx + "][user_id]"] = student.id;
              return data["submissions[submission_" + idx + "][grade]"] = data.default_grade;
            };
            _ref = _this.gradebook.students;
            for (idx in _ref) {
              student = _ref[idx];
              if ((hasNoScore(student) || canOverwrite) && inSection(student)) {
                updateData(idx, student);
              }
            }
            if (studentsAffected === 0) {
              alert(I18n.t('alerts.none_to_update', "None to Update"));
              return false;
            }
            return data;
          },
          success: function(data) {
            var datum, submissions;

            submissions = (function() {
              var _i, _len, _results;

              _results = [];
              for (_i = 0, _len = data.length; _i < _len; _i++) {
                datum = data[_i];
                _results.push(datum.submission);
              }
              return _results;
            })();
            $.publish('submissions_updated', [submissions]);
            alert(I18n.t('alerts.scores_updated', {
              'one': '1 Student score updated',
              'other': '%{count} Student scores updated'
            }, {
              'count': data.length
            }));
            return _this.$dialog.remove();
          }
        });
      };

      return SetDefaultGradeDialog;

    })();
  });

}).call(this);
