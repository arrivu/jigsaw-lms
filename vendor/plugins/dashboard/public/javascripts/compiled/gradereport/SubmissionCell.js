(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/gradebook2/GRADEBOOK_TRANSLATIONS', 'str/htmlEscape', 'jquery', 'underscore', 'compiled/gradebook2/Turnitin', 'compiled/util/round', 'jquery.ajaxJSON'], function(GRADEBOOK_TRANSLATIONS, htmlEscape, $, _, _arg, round) {
    var SubmissionCell, extractData, _ref, _ref1, _ref2, _ref3;

    extractData = _arg.extractData;
    SubmissionCell = (function() {
      function SubmissionCell(opts) {
        this.opts = opts;
        this.init();
      }

      SubmissionCell.prototype.init = function() {
        var submission;

        submission = this.opts.item[this.opts.column.field];
        this.$wrapper = $(this.cellWrapper('<input class="grade"/>')).appendTo(this.opts.container);
        return this.$input = this.$wrapper.find('input').focus().select();
      };

      SubmissionCell.prototype.destroy = function() {
        return this.$input.remove();
      };

      SubmissionCell.prototype.focus = function() {
        return this.$input.focus();
      };

      SubmissionCell.prototype.loadValue = function() {
        this.val = htmlEscape(this.opts.item[this.opts.column.field].grade || "");
        this.$input.val(this.val);
        this.$input[0].defaultValue = this.val;
        return this.$input.select();
      };

      SubmissionCell.prototype.serializeValue = function() {
        return this.$input.val();
      };

      SubmissionCell.prototype.applyValue = function(item, state) {
        var _ref;

        item[this.opts.column.field].grade = htmlEscape(state);
        if ((_ref = this.wrapper) != null) {
          _ref.remove();
        }
        return this.postValue(item, state);
      };

      SubmissionCell.prototype.postValue = function(item, state) {
        var submission, url;

        submission = item[this.opts.column.field];
        url = this.opts.grid.getOptions().change_grade_url;
        url = url.replace(":assignment", submission.assignment_id).replace(":submission", submission.user_id);
        return $.ajaxJSON(url, "PUT", {
          "submission[posted_grade]": state
        }, this.onUpdateSuccess, this.onUpdateError);
      };

      SubmissionCell.prototype.onUpdateSuccess = function(submission) {
        return $.publish('submissions_updated', [submission.all_submissions]);
      };

      SubmissionCell.prototype.onUpdateError = function() {
        return $.flashError(GRADEBOOK_TRANSLATIONS.submission_update_error);
      };

      SubmissionCell.prototype.isValueChanged = function() {
        return this.val !== this.$input.val();
      };

      SubmissionCell.prototype.validate = function() {
        return {
          valid: true,
          msg: null
        };
      };

      SubmissionCell.formatter = function(row, col, submission, assignment) {
        var grade;

        grade = parseFloat(submission.grade);
        grade = isNaN(grade) ? submission.grade : round(grade, round.DEFAULT);
        return this.prototype.cellWrapper(grade, {
          submission: submission,
          assignment: assignment,
          editable: false
        });
      };

      SubmissionCell.prototype.cellWrapper = function(innerContents, options) {
        var opts, specialClasses, tooltipText, turnitin, _ref;

        if (options == null) {
          options = {};
        }
        opts = $.extend({}, {
          classes: '',
          editable: true
        }, options);
        opts.submission || (opts.submission = this.opts.item[this.opts.column.field]);
        opts.assignment || (opts.assignment = this.opts.column.object);
        specialClasses = SubmissionCell.classesBasedOnSubmission(opts.submission, opts.assignment);
        if (!opts.submission.grade) {
          opts.classes += ' no_grade_yet ';
        }
        if (innerContents == null) {
          innerContents = ((_ref = opts.submission) != null ? _ref.submission_type : void 0) ? '<span class="submission_type_icon" />' : '-';
        }
        if (turnitin = extractData(opts.submission)) {
          specialClasses.push('turnitin');
          innerContents += "<span class='gradebook-cell-turnitin " + turnitin.state + "-score' />";
        }
        tooltipText = $.map(specialClasses, function(c) {
          return GRADEBOOK_TRANSLATIONS["submission_tooltip_" + c];
        }).join(', ');
        return "" + (tooltipText ? '<div class="gradebook-tooltip">' + tooltipText + '</div>' : '') + "\n<div class=\"gradebook-cell " + (opts.editable ? 'gradebook-cell-editable focus' : '') + " " + opts.classes + " " + (specialClasses.join(' ')) + "\">\n  <a href=\"#\" data-user-id=" + opts.submission.user_id + " data-assignment-id=" + opts.assignment.id + " class=\"gradebook-cell-comment\"><span class=\"gradebook-cell-comment-label\">submission comments</span></a>\n  " + innerContents + "\n</div>";
      };

      SubmissionCell.classesBasedOnSubmission = function(submission, assignment) {
        var classes;

        if (submission == null) {
          submission = {};
        }
        if (assignment == null) {
          assignment = {};
        }
        classes = [];
        if (submission.grade_matches_current_submission === false) {
          classes.push('resubmitted');
        }
        if (submission.late) {
          classes.push('late');
        }
        if ('' + assignment.submission_types === "not_graded") {
          classes.push('ungraded');
        }
        if (assignment.muted) {
          classes.push('muted');
        }
        if (submission.submission_type) {
          classes.push(submission.submission_type);
        }
        return classes;
      };

      return SubmissionCell;

    })();
    SubmissionCell.out_of = (function(_super) {
      __extends(out_of, _super);

      function out_of() {
        _ref = out_of.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      out_of.prototype.init = function() {
        var submission;

        submission = this.opts.item[this.opts.column.field];
        this.$wrapper = $(this.cellWrapper("<div class=\"overflow-wrapper\">\n  <div class=\"grade-and-outof-wrapper\">\n    <input type=\"number\" class=\"grade\"/> <span class=\"outof\"><span class=\"divider\">/</span>" + this.opts.column.object.points_possible + "</span>\n  </div>\n</div>", {
          classes: 'gradebook-cell-out-of-formatter'
        })).appendTo(this.opts.container);
        return this.$input = this.$wrapper.find('input').focus().select();
      };

      return out_of;

    })(SubmissionCell);
    SubmissionCell.letter_grade = (function(_super) {
      __extends(letter_grade, _super);

      function letter_grade() {
        _ref1 = letter_grade.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      letter_grade.formatter = function(row, col, submission, assignment) {
        var innerContents;

        innerContents = submission.score ? "" + submission.grade + "<span class='letter-grade-points'>" + submission.score + "</span>" : submission.grade;
        return SubmissionCell.prototype.cellWrapper(innerContents, {
          submission: submission,
          assignment: assignment,
          editable: false
        });
      };

      return letter_grade;

    })(SubmissionCell);
    SubmissionCell.pass_fail = (function(_super) {
      var classFromSubmission, states;

      __extends(pass_fail, _super);

      function pass_fail() {
        _ref2 = pass_fail.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      states = ['pass', 'fail', ''];

      classFromSubmission = function(submission) {
        return {
          pass: 'pass',
          complete: 'pass',
          fail: 'fail',
          incomplete: 'fail'
        }[submission.grade] || '';
      };

      pass_fail.prototype.htmlFromSubmission = function(options) {
        var cssClass;

        if (options == null) {
          options = {};
        }
        cssClass = classFromSubmission(options.submission);
        return SubmissionCell.prototype.cellWrapper("<a data-value=\"" + cssClass + "\" class=\"gradebook-checkbox gradebook-checkbox-" + cssClass + " " + (options.editable ? 'editable' : void 0) + "\" href=\"#\">" + cssClass + "</a>", options);
      };

      pass_fail.formatter = function(row, col, submission, assignment) {
        if (submission.grade == null) {
          return SubmissionCell.formatter.apply(this, arguments);
        }
        return pass_fail.prototype.htmlFromSubmission({
          submission: submission,
          assignment: assignment,
          editable: false
        });
      };

      pass_fail.prototype.init = function() {
        var _this = this;

        this.$wrapper = $(this.cellWrapper());
        this.$wrapper = $(this.htmlFromSubmission({
          submission: this.opts.item[this.opts.column.field],
          assignment: this.opts.column.object,
          editable: true
        })).appendTo(this.opts.container);
        return this.$input = this.$wrapper.find('.gradebook-checkbox').bind('click keypress', function(event) {
          var currentValue, newValue;

          event.preventDefault();
          currentValue = _this.$input.data('value');
          if (currentValue === 'pass') {
            newValue = 'fail';
          } else if (currentValue === 'fail') {
            newValue = '';
          } else {
            newValue = 'pass';
          }
          return _this.transitionValue(newValue);
        }).focus();
      };

      pass_fail.prototype.destroy = function() {
        return this.$wrapper.remove();
      };

      pass_fail.prototype.transitionValue = function(newValue) {
        return this.$input.removeClass('gradebook-checkbox-pass gradebook-checkbox-fail').addClass('gradebook-checkbox-' + classFromSubmission({
          grade: newValue
        })).data('value', newValue);
      };

      pass_fail.prototype.loadValue = function() {
        return this.val = this.opts.item[this.opts.column.field].grade || "";
      };

      pass_fail.prototype.serializeValue = function() {
        return this.$input.data('value');
      };

      pass_fail.prototype.isValueChanged = function() {
        return this.val !== this.$input.data('value');
      };

      return pass_fail;

    })(SubmissionCell);
    SubmissionCell.points = (function(_super) {
      __extends(points, _super);

      function points() {
        _ref3 = points.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      return points;

    })(SubmissionCell);
    return SubmissionCell;
  });

}).call(this);
