(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['compiled/gradereport/TotalColumnHeaderView', 'compiled/util/round', 'compiled/views/InputFilterView', 'i18n!gradebook2', 'compiled/gradebook2/GRADEBOOK_TRANSLATIONS', 'jquery', 'underscore', 'compiled/grade_calculator', 'compiled/userSettings', 'vendor/spin', 'compiled/multi_grid', 'compiled/SubmissionDetailsDialog', 'compiled/gradereport/AssignmentGroupWeightsDialog', 'compiled/gradereport/SubmissionCell', 'compiled/gradereport/GradebookHeaderMenu', 'str/htmlEscape', 'jst/gradebook_uploads_form', 'jst/gradereport/section_to_show_menu', 'jst/gradereport/column_header', 'jst/gradereport/group_total_cell', 'jst/gradereport/row_student_name', 'jst/_avatar', 'jquery.ajaxJSON', 'jquery.instructure_date_and_time', 'jqueryui/dialog', 'jquery.instructure_misc_helpers', 'jquery.instructure_misc_plugins', 'vendor/jquery.ba-tinypubsub', 'jqueryui/mouse', 'jqueryui/position', 'jqueryui/sortable', 'compiled/jquery.kylemenu', 'compiled/jquery/fixDialogButtons'], function(TotalColumnHeaderView, round, InputFilterView, I18n, GRADEBOOK_TRANSLATIONS, $, _, GradeCalculator, userSettings, Spinner, MultiGrid, SubmissionDetailsDialog, AssignmentGroupWeightsDialog, SubmissionCell, GradebookHeaderMenu, htmlEscape, gradebook_uploads_form, sectionToShowMenuTemplate, columnHeaderTemplate, groupTotalCellTemplate, rowStudentNameTemplate) {
    var Gradebook;

    return Gradebook = (function() {
      var DISPLAY_PRECISION, columnWidths;

      columnWidths = {
        assignment: {
          min: 10,
          default_max: 200,
          max: 400
        },
        assignmentGroup: {
          min: 35,
          default_max: 200,
          max: 400
        },
        total: {
          min: 85,
          max: 100
        }
      };

      DISPLAY_PRECISION = 2;

      function Gradebook(options) {
        var enrollmentsUrl,
          _this = this;

        this.options = options;
        this.setAssignmentWarnings = __bind(this.setAssignmentWarnings, this);
        this.initGrid = __bind(this.initGrid, this);
        this.onUserFilterInput = __bind(this.onUserFilterInput, this);
        this.initHeader = __bind(this.initHeader, this);
        this.onGridBlur = __bind(this.onGridBlur, this);
        this.hoverMinimizedCell = __bind(this.hoverMinimizedCell, this);
        this.unminimizeColumn = __bind(this.unminimizeColumn, this);
        this.minimizeColumn = __bind(this.minimizeColumn, this);
        this.fixColumnReordering = __bind(this.fixColumnReordering, this);
        this.unhighlightColumns = __bind(this.unhighlightColumns, this);
        this.highlightColumn = __bind(this.highlightColumn, this);
        this.calculateStudentGrade = __bind(this.calculateStudentGrade, this);
        this.groupTotalFormatter = __bind(this.groupTotalFormatter, this);
        this.staticCellFormatter = __bind(this.staticCellFormatter, this);
        this.cellFormatter = __bind(this.cellFormatter, this);
        this.updateSubmissionsFromExternal = __bind(this.updateSubmissionsFromExternal, this);
        this.updateSubmission = __bind(this.updateSubmission, this);
        this.gotSubmissionsChunk = __bind(this.gotSubmissionsChunk, this);
        this.getSubmissionsChunks = __bind(this.getSubmissionsChunks, this);
        this.buildRows = __bind(this.buildRows, this);
        this.handleAssignmentMutingChange = __bind(this.handleAssignmentMutingChange, this);
        this.rowFilter = __bind(this.rowFilter, this);
        this.wrapColumnSortFn = __bind(this.wrapColumnSortFn, this);
        this.makeCompareAssignmentCustomOrderFn = __bind(this.makeCompareAssignmentCustomOrderFn, this);
        this.compareAssignmentDueDates = __bind(this.compareAssignmentDueDates, this);
        this.compareAssignmentPositions = __bind(this.compareAssignmentPositions, this);
        this.makeColumnSortFn = __bind(this.makeColumnSortFn, this);
        this.arrangeColumnsBy = __bind(this.arrangeColumnsBy, this);
        this.setArrangementTogglersVisibility = __bind(this.setArrangementTogglersVisibility, this);
        this.storeCustomColumnOrder = __bind(this.storeCustomColumnOrder, this);
        this.setStoredSortOrder = __bind(this.setStoredSortOrder, this);
        this.getStoredSortOrder = __bind(this.getStoredSortOrder, this);
        this.gotChunkOfStudents = __bind(this.gotChunkOfStudents, this);
        this.gotSections = __bind(this.gotSections, this);
        this.gotAssignmentGroups = __bind(this.gotAssignmentGroups, this);
        this.chunk_start = 0;
        this.students = {};
        this.rows = [];
        this.assignmentsToHide = userSettings.contextGet('hidden_columns') || [];
        this.sectionToShow = userSettings.contextGet('grading_show_only_section');
        this.show_attendance = userSettings.contextGet('show_attendance');
        this.include_ungraded_assignments = userSettings.contextGet('include_ungraded_assignments');
        this.userFilterRemovedRows = [];
        this.show_concluded_enrollments = userSettings.contextGet('show_concluded_enrollments');
        if (this.options.course_is_concluded) {
          this.show_concluded_enrollments = true;
        }
        $.subscribe('assignment_group_weights_changed', this.buildRows);
        $.subscribe('assignment_muting_toggled', this.handleAssignmentMutingChange);
        $.subscribe('submissions_updated', this.updateSubmissionsFromExternal);
        enrollmentsUrl = this.show_concluded_enrollments ? 'students_url_with_concluded_enrollments' : 'students_url';
        $.when($.ajaxJSON(this.options[enrollmentsUrl], "GET"), $.ajaxJSON(this.options.assignment_groups_url, "GET", {}, this.gotAssignmentGroups), $.ajaxJSON(this.options.sections_url, "GET", {}, this.gotSections)).then(function(_arg) {
          var dfds, fetchEnrollments, lastLink, lastPage, page, paginationLinks, status, students, xhr;

          students = _arg[0], status = _arg[1], xhr = _arg[2];
          _this.gotChunkOfStudents(students);
          paginationLinks = xhr.getResponseHeader('Link');
          lastLink = paginationLinks.match(/<[^>]+>; *rel="last"/);
          if (lastLink == null) {
            _this.gotAllStudents();
            return;
          }
          lastPage = lastLink[0].match(/page=(\d+)/)[1];
          lastPage = parseInt(lastPage, 10);
          fetchEnrollments = function(page) {
            return $.ajaxJSON(_this.options[enrollmentsUrl], "GET", {
              page: page
            });
          };
          dfds = (function() {
            var _i, _results;

            _results = [];
            for (page = _i = 2; 2 <= lastPage ? _i <= lastPage : _i >= lastPage; page = 2 <= lastPage ? ++_i : --_i) {
              _results.push(fetchEnrollments(page));
            }
            return _results;
          })();
          return $.when.apply($, dfds).then(function() {
            var responses, x, y, _i, _len, _ref;

            responses = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (dfds.length === 1) {
              _this.gotChunkOfStudents(responses[0]);
            } else {
              for (_i = 0, _len = responses.length; _i < _len; _i++) {
                _ref = responses[_i], students = _ref[0], x = _ref[1], y = _ref[2];
                _this.gotChunkOfStudents(students);
              }
            }
            return _this.gotAllStudents();
          });
        });
        this.spinner = new Spinner();
        $(this.spinner.spin().el).css({
          opacity: 0.5,
          top: '55px',
          left: '50%'
        }).addClass('use-css-transitions-for-show-hide').appendTo('#main');
      }

      Gradebook.prototype.gotAssignmentGroups = function(assignmentGroups) {
        var assignment, group, _i, _len, _results;

        this.assignmentGroups = {};
        this.assignments = {};
        new AssignmentGroupWeightsDialog({
          context: this.options,
          assignmentGroups: assignmentGroups
        });
        _results = [];
        for (_i = 0, _len = assignmentGroups.length; _i < _len; _i++) {
          group = assignmentGroups[_i];
          htmlEscape(group);
          this.assignmentGroups[group.id] = group;
          if (ENV.GRADEBOOK_OPTIONS.draft_state_enabled) {
            group.assignments = _.select(group.assignments, function(a) {
              return a.published;
            });
          }
          _results.push((function() {
            var _j, _len1, _ref, _results1;

            _ref = group.assignments;
            _results1 = [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              assignment = _ref[_j];
              htmlEscape(assignment);
              assignment.assignment_group = group;
              if (assignment.due_at) {
                assignment.due_at = $.parseFromISO(assignment.due_at);
              }
              _results1.push(this.assignments[assignment.id] = assignment);
            }
            return _results1;
          }).call(this));
        }
        return _results;
      };

      Gradebook.prototype.gotSections = function(sections) {
        var section, _i, _len;

        this.sections = {};
        for (_i = 0, _len = sections.length; _i < _len; _i++) {
          section = sections[_i];
          htmlEscape(section);
          this.sections[section.id] = section;
        }
        return this.sections_enabled = sections.length > 1;
      };

      Gradebook.prototype.gotChunkOfStudents = function(studentEnrollments) {
        var student, studentEnrollment, _base, _base1, _i, _len, _name, _results;

        _results = [];
        for (_i = 0, _len = studentEnrollments.length; _i < _len; _i++) {
          studentEnrollment = studentEnrollments[_i];
          student = studentEnrollment.user;
          student.enrollment = studentEnrollment;
          (_base = this.students)[_name = student.id] || (_base[_name] = htmlEscape(student));
          (_base1 = this.students[student.id]).sections || (_base1.sections = []);
          _results.push(this.students[student.id].sections.push(studentEnrollment.course_section_id));
        }
        return _results;
      };

      Gradebook.prototype.gotAllStudents = function() {
        var assignment, id, mySections, sectionId, sectionNames, student, _name, _ref, _ref1;

        _ref = this.students;
        for (id in _ref) {
          student = _ref[id];
          student.computed_current_score || (student.computed_current_score = 0);
          student.computed_final_score || (student.computed_final_score = 0);
          student.secondary_identifier = student.sis_login_id || student.login_id;
          if (this.sections_enabled) {
            mySections = (function() {
              var _i, _len, _ref1, _results;

              _ref1 = student.sections;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                sectionId = _ref1[_i];
                if (this.sections[sectionId]) {
                  _results.push(this.sections[sectionId].name);
                }
              }
              return _results;
            }).call(this);
            sectionNames = $.toSentence(mySections.sort());
          }
          student.display_name = rowStudentNameTemplate({
            avatar_image_url: student.avatar_url,
            display_name: student.name,
            url: student.enrollment.grades.html_url,
            sectionNames: sectionNames
          });
          _ref1 = this.assignments;
          for (id in _ref1) {
            assignment = _ref1[id];
            student[_name = "assignment_" + id] || (student[_name] = {
              assignment_id: id,
              user_id: student.id
            });
          }
          this.rows.push(student);
        }
        this.initGrid();
        this.buildRows();
        this.getSubmissionsChunks();
        return this.initHeader();
      };

      Gradebook.prototype.defaultSortType = 'assignment_group';

      Gradebook.prototype.getStoredSortOrder = function() {
        return userSettings.contextGet('sort_grade_columns_by') || {
          sortType: this.defaultSortType
        };
      };

      Gradebook.prototype.setStoredSortOrder = function(newSortOrder) {
        if (newSortOrder.sortType === this.defaultSortType) {
          return userSettings.contextRemove('sort_grade_columns_by');
        } else {
          return userSettings.contextSet('sort_grade_columns_by', newSortOrder);
        }
      };

      Gradebook.prototype.storeCustomColumnOrder = function() {
        var assignment_columns, columns, newSortOrder;

        newSortOrder = {
          sortType: 'custom',
          customOrder: []
        };
        columns = this.gradeGrid.getColumns();
        assignment_columns = _.filter(columns, function(c) {
          return c.type === 'assignment';
        });
        newSortOrder.customOrder = _.map(assignment_columns, function(a) {
          return a.object.id;
        });
        return this.setStoredSortOrder(newSortOrder);
      };

      Gradebook.prototype.setArrangementTogglersVisibility = function(newSortOrder) {
        return this.$columnArrangementTogglers.each(function() {
          return $(this).closest('li').showIf($(this).data('arrangeColumnsBy') !== newSortOrder.sortType);
        });
      };

      Gradebook.prototype.arrangeColumnsBy = function(newSortOrder) {
        var columns;

        this.setArrangementTogglersVisibility(newSortOrder);
        this.setStoredSortOrder(newSortOrder);
        columns = this.gradeGrid.getColumns();
        columns.sort(this.makeColumnSortFn(newSortOrder));
        this.gradeGrid.setColumns(columns);
        this.fixColumnReordering();
        return this.buildRows();
      };

      Gradebook.prototype.makeColumnSortFn = function(sortOrder) {
        var fn;

        fn = (function() {
          switch (sortOrder.sortType) {
            case 'assignment_group':
              return this.compareAssignmentPositions;
            case 'due_date':
              return this.compareAssignmentDueDates;
            case 'custom':
              return this.makeCompareAssignmentCustomOrderFn(sortOrder);
            default:
              throw "unhandled column sort condition";
          }
        }).call(this);
        return this.wrapColumnSortFn(fn);
      };

      Gradebook.prototype.compareAssignmentPositions = function(a, b) {
        var diffOfAssignmentGroupPosition, diffOfAssignmentPosition;

        diffOfAssignmentGroupPosition = a.object.assignment_group.position - b.object.assignment_group.position;
        diffOfAssignmentPosition = a.object.position - b.object.position;
        return (diffOfAssignmentGroupPosition * 1000000) + diffOfAssignmentPosition;
      };

      Gradebook.prototype.compareAssignmentDueDates = function(a, b) {
        var aDate, bDate, _ref, _ref1;

        aDate = ((_ref = a.object.due_at) != null ? _ref.timestamp : void 0) || Number.MAX_VALUE;
        bDate = ((_ref1 = b.object.due_at) != null ? _ref1.timestamp : void 0) || Number.MAX_VALUE;
        if (aDate === bDate) {
          if (a.object.name === b.object.name) {
            return 0;
          }
          return (a.object.name > b.object.name ? 1 : -1);
        }
        return aDate - bDate;
      };

      Gradebook.prototype.makeCompareAssignmentCustomOrderFn = function(sortOrder) {
        var assignmentId, indexCounter, sortMap, _i, _len, _ref,
          _this = this;

        sortMap = {};
        indexCounter = 0;
        _ref = sortOrder.customOrder;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          assignmentId = _ref[_i];
          sortMap[String(assignmentId)] = indexCounter;
          indexCounter += 1;
        }
        return function(a, b) {
          var aIndex, bIndex;

          aIndex = sortMap[String(a.object.id)];
          bIndex = sortMap[String(b.object.id)];
          if ((aIndex != null) && (bIndex != null)) {
            return aIndex - bIndex;
          } else if ((aIndex != null) && (bIndex == null)) {
            return -1;
          } else if (bIndex != null) {
            return 1;
          } else {
            return _this.compareAssignmentPositions(a, b);
          }
        };
      };

      Gradebook.prototype.wrapColumnSortFn = function(wrappedFn) {
        var _this = this;

        return function(a, b) {
          if (b.type === 'total_grade') {
            return -1;
          }
          if (a.type === 'total_grade') {
            return 1;
          }
          if (b.type === 'assignment_group' && a.type !== 'assignment_group') {
            return -1;
          }
          if (a.type === 'assignment_group' && b.type !== 'assignment_group') {
            return 1;
          }
          if (a.type === 'assignment_group' && b.type === 'assignment_group') {
            return a.object.position - b.object.position;
          }
          return wrappedFn(a, b);
        };
      };

      Gradebook.prototype.rowFilter = function(student) {
        var _ref;

        return !this.sectionToShow || (_ref = this.sectionToShow, __indexOf.call(student.sections, _ref) >= 0);
      };

      Gradebook.prototype.handleAssignmentMutingChange = function(assignment) {
        var colDef, idx;

        idx = this.gradeGrid.getColumnIndex("assignment_" + assignment.id);
        colDef = this.gradeGrid.getColumns()[idx];
        colDef.name = this.assignmentHeaderHtml(assignment);
        this.gradeGrid.setColumns(this.gradeGrid.getColumns());
        this.fixColumnReordering();
        return this.buildRows();
      };

      Gradebook.prototype.buildRows = function() {
        var column, i, id, student, _i, _len, _ref, _ref1, _ref2, _ref3;

        this.rows.length = 0;
        _ref = this.gradeGrid.getColumns();
        for (id in _ref) {
          column = _ref[id];
          if (!('' + ((_ref1 = column.object) != null ? _ref1.submission_types : void 0) === "attendance")) {
            continue;
          }
          column.unselectable = !this.show_attendance;
          column.cssClass = this.show_attendance ? '' : 'completely-hidden';
          this.$grid.find("[id*='" + column.id + "']").showIf(this.show_attendance);
        }
        _ref2 = this.students;
        for (id in _ref2) {
          student = _ref2[id];
          student.row = -1;
          if (this.rowFilter(student)) {
            this.rows.push(student);
            this.calculateStudentGrade(student);
          }
        }
        this.rows.sort(function(a, b) {
          return a.sortable_name.localeCompare(b.sortable_name, window.I18n.locale, {
            sensitivity: 'accent',
            ignorePunctuation: true,
            numeric: true
          });
        });
        _ref3 = this.rows;
        for (i = _i = 0, _len = _ref3.length; _i < _len; i = ++_i) {
          student = _ref3[i];
          student.row = i;
        }
        return this.multiGrid.invalidate();
      };

      Gradebook.prototype.getSubmissionsChunks = function() {
        var allStudents, k, params, s, student, students, _results;

        allStudents = (function() {
          var _ref, _results;

          _ref = this.students;
          _results = [];
          for (k in _ref) {
            s = _ref[k];
            _results.push(s);
          }
          return _results;
        }).call(this);
        _results = [];
        while (true) {
          students = allStudents.slice(this.chunk_start, this.chunk_start + this.options.chunk_size);
          if (!students.length) {
            this.allSubmissionsLoaded = true;
            break;
          }
          params = {
            student_ids: (function() {
              var _i, _len, _results1;

              _results1 = [];
              for (_i = 0, _len = students.length; _i < _len; _i++) {
                student = students[_i];
                _results1.push(student.id);
              }
              return _results1;
            })(),
            response_fields: ['id', 'user_id', 'url', 'score', 'grade', 'submission_type', 'submitted_at', 'assignment_id', 'grade_matches_current_submission', 'attachments', 'late']
          };
          $.ajaxJSON(this.options.submissions_url, "GET", params, this.gotSubmissionsChunk);
          _results.push(this.chunk_start += this.options.chunk_size);
        }
        return _results;
      };

      Gradebook.prototype.gotSubmissionsChunk = function(student_submissions) {
        var data, student, submission, _i, _j, _len, _len1, _ref;

        for (_i = 0, _len = student_submissions.length; _i < _len; _i++) {
          data = student_submissions[_i];
          student = this.students[data.user_id];
          _ref = data.submissions;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            submission = _ref[_j];
            this.updateSubmission(submission);
          }
          student.loaded = true;
          this.multiGrid.invalidateRow(student.row);
          this.calculateStudentGrade(student);
        }
        return this.multiGrid.render();
      };

      Gradebook.prototype.updateSubmission = function(submission) {
        var student;

        student = this.students[submission.user_id];
        if (submission.submitted_at) {
          submission.submitted_at = $.parseFromISO(submission.submitted_at);
        }
        return student["assignment_" + submission.assignment_id] = submission;
      };

      Gradebook.prototype.updateSubmissionsFromExternal = function(submissions, submissionCell) {
        var activeCell, cell, column, columns, editing, idToMatch, index, student, submission, thisCellIsActive, _i, _j, _len, _len1, _results;

        activeCell = this.gradeGrid.getActiveCell();
        editing = $(this.gradeGrid.getActiveCellNode()).hasClass('editable');
        columns = this.gradeGrid.getColumns();
        _results = [];
        for (_i = 0, _len = submissions.length; _i < _len; _i++) {
          submission = submissions[_i];
          student = this.students[submission.user_id];
          idToMatch = "assignment_" + submission.assignment_id;
          for (index = _j = 0, _len1 = columns.length; _j < _len1; index = ++_j) {
            column = columns[index];
            if (column.id === idToMatch) {
              cell = index;
            }
          }
          thisCellIsActive = (activeCell != null) && editing && activeCell.row === student.row && activeCell.cell === cell;
          this.updateSubmission(submission);
          this.calculateStudentGrade(student);
          if (!thisCellIsActive) {
            this.gradeGrid.updateCell(student.row, cell);
          }
          _results.push(this.updateRowTotals(student.row));
        }
        return _results;
      };

      Gradebook.prototype.updateRowTotals = function(rowIndex) {
        var column, columnIndex, columns, _i, _len, _results;

        columns = this.gradeGrid.getColumns();
        _results = [];
        for (columnIndex = _i = 0, _len = columns.length; _i < _len; columnIndex = ++_i) {
          column = columns[columnIndex];
          if (column.type !== 'assignment') {
            _results.push(this.gradeGrid.updateCell(rowIndex, columnIndex));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Gradebook.prototype.cellFormatter = function(row, col, submission) {
        var assignment;

        if (!this.rows[row].loaded) {
          return this.staticCellFormatter(row, col, '');
        } else if (submission == null) {
          return this.staticCellFormatter(row, col, '-');
        } else {
          assignment = this.assignments[submission.assignment_id];
          if (assignment == null) {
            return this.staticCellFormatter(row, col, '');
          } else {
            if (assignment.grading_type === 'points' && assignment.points_possible) {
              return SubmissionCell.out_of.formatter(row, col, submission, assignment);
            } else {
              return (SubmissionCell[assignment.grading_type] || SubmissionCell).formatter(row, col, submission, assignment);
            }
          }
        }
      };

      Gradebook.prototype.staticCellFormatter = function(row, col, val) {
        return "<div class='cell-content gradebook-cell'>" + val + "</div>";
      };

      Gradebook.prototype.groupTotalFormatter = function(row, col, val, columnDef, student) {
        var letterGrade, percentage, templateOpts;

        if (val == null) {
          return '';
        }
        percentage = Math.round((val.score / val.possible) * 1000) / 10;
        if (isNaN(percentage)) {
          percentage = 0;
        }
        if (val.possible && this.options.grading_standard && columnDef.type === 'total_grade') {
          letterGrade = GradeCalculator.letter_grade(this.options.grading_standard, percentage);
        }
        templateOpts = {
          score: round(val.score, DISPLAY_PRECISION),
          possible: round(val.possible, DISPLAY_PRECISION),
          letterGrade: letterGrade,
          percentage: percentage
        };
        if (columnDef.type === 'total_grade') {
          templateOpts.warning = this.totalGradeWarning;
          templateOpts.lastColumn = true;
          templateOpts.showPointsNotPercent = this.showPointTotals;
        }
        return groupTotalCellTemplate(templateOpts);
      };

      Gradebook.prototype.calculateStudentGrade = function(student) {
        var finalOrCurrent, group, key, result, submissionData, submissionsAsArray, value, _i, _j, _len, _len1, _ref, _ref1;

        if (student.loaded) {
          finalOrCurrent = this.include_ungraded_assignments ? 'final' : 'current';
          submissionsAsArray = (function() {
            var _results;

            _results = [];
            for (key in student) {
              value = student[key];
              if (key.match(/^assignment_(?!group)/)) {
                _results.push(value);
              }
            }
            return _results;
          })();
          result = GradeCalculator.calculate(submissionsAsArray, this.assignmentGroups, this.options.group_weighting_scheme);
          _ref = result.group_sums;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            group = _ref[_i];
            student["assignment_group_" + group.group.id] = group[finalOrCurrent];
            _ref1 = group[finalOrCurrent].submissions;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              submissionData = _ref1[_j];
              submissionData.submission.drop = submissionData.drop;
            }
          }
          student["total_grade"] = result[finalOrCurrent];
          return this.addDroppedClass(student);
        }
      };

      Gradebook.prototype.addDroppedClass = function(student) {
        var a, assignment, droppedAssignments, drops, name, styleKey, _i, _len;

        droppedAssignments = (function() {
          var _results;

          _results = [];
          for (name in student) {
            assignment = student[name];
            if (name.match(/assignment_\d+/) && (assignment.drop != null)) {
              _results.push(name);
            }
          }
          return _results;
        })();
        drops = {};
        drops[student.row] = {};
        for (_i = 0, _len = droppedAssignments.length; _i < _len; _i++) {
          a = droppedAssignments[_i];
          drops[student.row][a] = 'dropped';
        }
        styleKey = "dropsForRow" + student.row;
        this.gradeGrid.removeCellCssStyles(styleKey);
        return this.gradeGrid.addCellCssStyles(styleKey, drops);
      };

      Gradebook.prototype.highlightColumn = function(columnIndexOrEvent) {
        var match;

        if (isNaN(columnIndexOrEvent)) {
          match = columnIndexOrEvent.currentTarget.className.match(/c\d+/);
          if (match) {
            columnIndexOrEvent = match.toString().replace('c', '');
          }
        }
        return this.$grid.find('.slick-header-column:eq(' + columnIndexOrEvent + ')').addClass('hovered-column');
      };

      Gradebook.prototype.unhighlightColumns = function() {
        return this.$grid.find('.hovered-column').removeClass('hovered-column');
      };

      Gradebook.prototype.fixColumnReordering = function() {
        var $headers, fixupStopCallback, initHeaderDropMenus, makeOnlyAssignmentsSortable, onlyAssignmentColsSelector, originalItemsSelector, originalStopFn,
          _this = this;

        $headers = $('#gradebook_grid').find('.slick-header-columns');
        originalItemsSelector = $headers.sortable('option', 'items');
        onlyAssignmentColsSelector = '> *:not([id*="assignment_group"]):not([id*="total_grade"])';
        (makeOnlyAssignmentsSortable = function() {
          var $notAssignments;

          $headers.sortable('option', 'items', onlyAssignmentColsSelector);
          $notAssignments = $(originalItemsSelector, $headers).not($(onlyAssignmentColsSelector, $headers));
          return $notAssignments.data('sortable-item', null);
        })();
        (initHeaderDropMenus = function() {
          return $headers.find('.assignment_header_drop').click(function(event) {
            var $link;

            $link = $(event.target);
            if (!$link.data('gradebookHeaderMenu')) {
              $link.data('gradebookHeaderMenu', new GradebookHeaderMenu(_this.assignments[$link.data('assignmentId')], $link, _this));
            }
            return false;
          });
        })();
        originalStopFn = $headers.sortable('option', 'stop');
        return (fixupStopCallback = function() {
          return $headers.sortable('option', 'stop', function(event, ui) {
            var returnVal;

            $headers.sortable('option', 'items', originalItemsSelector);
            returnVal = originalStopFn.apply(this, arguments);
            makeOnlyAssignmentsSortable();
            initHeaderDropMenus();
            fixupStopCallback();
            return returnVal;
          });
        })();
      };

      Gradebook.prototype.minimizeColumn = function($columnHeader) {
        var colIndex, columnDef;

        colIndex = $columnHeader.index();
        columnDef = this.gradeGrid.getColumns()[colIndex];
        columnDef.cssClass = (columnDef.cssClass || '').replace(' minimized', '') + ' minimized';
        columnDef.unselectable = true;
        columnDef.unminimizedName = columnDef.name;
        columnDef.name = '';
        columnDef.minimized = true;
        this.$grid.find(".l" + colIndex).add($columnHeader).addClass('minimized');
        this.assignmentsToHide.push(columnDef.id);
        return userSettings.contextSet('hidden_columns', _.uniq(this.assignmentsToHide));
      };

      Gradebook.prototype.unminimizeColumn = function($columnHeader) {
        var colIndex, columnDef;

        colIndex = $columnHeader.index();
        columnDef = this.gradeGrid.getColumns()[colIndex];
        columnDef.cssClass = (columnDef.cssClass || '').replace(' minimized', '');
        columnDef.unselectable = false;
        columnDef.name = columnDef.unminimizedName;
        columnDef.minimized = false;
        this.$grid.find(".l" + colIndex).add($columnHeader).removeClass('minimized');
        $columnHeader.find('.slick-column-name').html(columnDef.name);
        this.assignmentsToHide = $.grep(this.assignmentsToHide, function(el) {
          return el !== columnDef.id;
        });
        return userSettings.contextSet('hidden_columns', _.uniq(this.assignmentsToHide));
      };

      Gradebook.prototype.hoverMinimizedCell = function(event) {
        var $hoveredCell, assignment, columnDef, htmlLines, offset, submission, _ref,
          _this = this;

        $hoveredCell = $(event.currentTarget).removeClass('hover');
        columnDef = this.gradeGrid.getColumns()[$hoveredCell.index()];
        assignment = columnDef.object;
        offset = $hoveredCell.offset();
        htmlLines = [assignment.name];
        if ($hoveredCell.hasClass('slick-cell')) {
          submission = this.rows[this.gradeGrid.getCellFromEvent(event).row][columnDef.id];
          if (assignment.points_possible != null) {
            htmlLines.push("" + ((_ref = submission.score) != null ? _ref : '--') + " / " + assignment.points_possible);
          } else if (submission.score != null) {
            htmlLines.push(submission.score);
          }
          Array.prototype.push.apply(htmlLines, $.map(SubmissionCell.classesBasedOnSubmission(submission, assignment), function(c) {
            return GRADEBOOK_TRANSLATIONS["#submission_tooltip_" + c];
          }));
        } else if (assignment.points_possible != null) {
          htmlLines.push(I18n.t('points_out_of', "out of %{points_possible}", {
            points_possible: assignment.points_possible
          }));
        }
        return $hoveredCell.data('tooltip', $("<span />", {
          "class": 'gradebook-tooltip',
          css: {
            left: offset.left - 15,
            top: offset.top,
            zIndex: 10000,
            display: 'block'
          },
          html: htmlLines.join('<br />')
        }).appendTo('body').css('top', function(i, top) {
          return parseInt(top) - $(this).outerHeight();
        }));
      };

      Gradebook.prototype.unhoverMinimizedCell = function(event) {
        var $tooltip;

        if ($tooltip = $(this).data('tooltip')) {
          if (event.toElement === $tooltip[0]) {
            return $tooltip.mouseleave(function() {
              return $tooltip.remove();
            });
          } else {
            return $tooltip.remove();
          }
        }
      };

      Gradebook.prototype.fixMaxHeaderWidth = function() {
        return this.$grid.find('.slick-header-columns').width(1000000);
      };

      Gradebook.prototype.onGridBlur = function(e) {
        if (e.target.className.match(/cell|slick/) || !this.gradeGrid.getActiveCell) {
          return;
        }
        if (e.target.className === 'grade' && this.gradeGrid.getCellEditor() instanceof SubmissionCell.out_of) {
          return;
        }
        return this.gradeGrid.getEditorLock().commitCurrentEdit();
      };

      Gradebook.prototype.onGridInit = function() {
        var grid, tooltipTexts,
          _this = this;

        tooltipTexts = {};
        $(this.spinner.el).remove();
        $('#gradebook_wrapper').show();
        this.$grid = grid = $('#gradebook_grid').fillWindowWithMe({
          alsoResize: '# gradebook_students_grid',
          onResize: function() {
            return _this.multiGrid.resizeCanvas();
          }
        }).delegate('.slick-cell', {
          'mouseenter.gradebook focusin.gradebook': this.highlightColumn,
          'mouseleave.gradebook focusout.gradebook': this.unhighlightColumns,
          'mouseenter focusin': function(event) {
            grid.find('.hover, .focus').removeClass('hover focus');
            return $(this).addClass((event.type === 'mouseenter' ? 'hover' : 'focus'));
          },
          'mouseleave focusout': function() {
            return $(this).removeClass('hover focus');
          }
        }).delegate('.gradebook-cell-comment', "click.gradebook", function(event) {
          var data;

          event.preventDefault();
          data = $(event.currentTarget).data();
          return SubmissionDetailsDialog.open(_this.assignments[data.assignmentId], _this.students[data.userId], _this.options);
        }).delegate('.minimized', {
          'mouseenter': this.hoverMinimizedCell,
          'mouseleave': this.unhoverMinimizedCell
        });
        if (this.options.gradebook_is_editable) {
          this.$grid.addClass('editable');
        }
        this.fixMaxHeaderWidth();
        $('#gradebook_grid .slick-resizable-handle').live('drag', function(e, dd) {
          return _this.$grid.find('.slick-header-column').each(function(colIndex, elem) {
            var $columnHeader, columnDef;

            $columnHeader = $(elem);
            columnDef = _this.gradeGrid.getColumns()[colIndex];
            if ($columnHeader.outerWidth() <= minimumAssignmentColumWidth) {
              if (!columnDef.minimized) {
                return _this.minimizeColumn($columnHeader);
              }
            } else if (columnDef.minimized) {
              return _this.unminimizeColumn($columnHeader);
            }
          });
        });
        return $(document).trigger('gridready');
      };

      Gradebook.prototype.initHeader = function() {
        var $sectionToShowMenu, $settingsMenu, $upload_modal, allSectionsText, id, s, sections, totalHeader, updateSectionBeingShownText, _ref,
          _this = this;

        if (this.sections_enabled) {
          allSectionsText = I18n.t('all_sections', 'All Sections');
          sections = [
            {
              name: allSectionsText,
              checked: !this.sectionToShow
            }
          ];
          _ref = this.sections;
          for (id in _ref) {
            s = _ref[id];
            sections.push({
              name: s.name,
              id: id,
              checked: this.sectionToShow === id
            });
          }
          $sectionToShowMenu = $(sectionToShowMenuTemplate({
            sections: sections
          }));
          (updateSectionBeingShownText = function() {
            return $('#section_being_shown').html(_this.sectionToShow ? _this.sections[_this.sectionToShow].name : allSectionsText);
          })();
          $('#section_to_show').after($sectionToShowMenu).show().kyleMenu();
          $sectionToShowMenu.bind('menuselect', function(event, ui) {
            _this.sectionToShow = Number($sectionToShowMenu.find('[aria-checked="true"] input[name="section_to_show_radio"]').val()) || void 0;
            userSettings[_this.sectionToShow ? 'contextSet' : 'contextRemove']('grading_show_only_section', _this.sectionToShow);
            updateSectionBeingShownText();
            return _this.buildRows();
          });
        }
        $settingsMenu = $('#gradebook_settings').next();
        $.each(['show_attendance', 'include_ungraded_assignments', 'show_concluded_enrollments'], function(i, setting) {
          return $settingsMenu.find("#" + setting).prop('checked', !!_this[setting]).change(function(event) {
            if (setting === 'show_concluded_enrollments' && _this.options.course_is_concluded && _this.show_concluded_enrollments) {
              $("#" + setting).prop('checked', true);
              $settingsMenu.menu("refresh");
              return alert(I18n.t('concluded_course_error_message', 'This is a concluded course, so only concluded enrollments are available.'));
            }
            _this[setting] = $(event.target).is(':checked');
            userSettings.contextSet(setting, _this[setting]);
            if (setting === 'show_concluded_enrollments') {
              window.location.reload();
            }
            if (setting === 'show_attendance') {
              _this.gradeGrid.setColumns(_this.getVisibleGradeGridColumns());
            }
            return _this.buildRows();
          });
        });
        if (!(_.detect(this.assignments, function(a) {
          return ('' + a.submission_types) === "attendance";
        }))) {
          $settingsMenu.find('#show_attendance').closest('li').hide();
        }
        this.$columnArrangementTogglers = $('#gradebook-toolbar [data-arrange-columns-by]').bind('click', function(event) {
          var newSortOrder;

          event.preventDefault();
          newSortOrder = {
            sortType: $(event.currentTarget).data('arrangeColumnsBy')
          };
          return _this.arrangeColumnsBy(newSortOrder);
        });
        this.arrangeColumnsBy(this.getStoredSortOrder());
        $('#gradebook_settings').show().kyleMenu();
        $upload_modal = null;
        $settingsMenu.find('.gradebook_upload_link').click(function(event) {
          var locals;

          event.preventDefault();
          if (!$upload_modal) {
            locals = {
              download_gradebook_csv_url: "" + _this.options.context_url + "/gradebook.csv",
              action: "" + _this.options.context_url + "/gradebook_uploads",
              authenticityToken: ENV.AUTHENTICITY_TOKEN
            };
            $upload_modal = $(gradebook_uploads_form(locals)).dialog({
              bgiframe: true,
              autoOpen: false,
              modal: true,
              width: 720,
              resizable: false
            }).fixDialogButtons();
          }
          return $upload_modal.dialog('open');
        });
        $settingsMenu.find('.student_names_toggle').click(function(e) {
          var $wrapper;

          $wrapper = $('.grid-canvas');
          $wrapper.toggleClass('hide-students');
          if ($wrapper.hasClass('hide-students')) {
            return $(this).text(I18n.t('show_student_names', 'Show Student Names'));
          } else {
            return $(this).text(I18n.t('hide_student_names', 'Hide Student Names'));
          }
        });
        this.userFilter = new InputFilterView({
          el: '.gradebook_filter input'
        });
        this.userFilter.on('input', this.onUserFilterInput);
        this.showPointTotals = this.setPointTotals(userSettings.contextGet('show_point_totals'));
        totalHeader = new TotalColumnHeaderView({
          showingPoints: function() {
            return _this.showPointTotals;
          },
          toggleShowingPoints: this.togglePointsOrPercentTotals.bind(this),
          weightedGroups: this.weightedGroups.bind(this)
        });
        return totalHeader.render();
      };

      Gradebook.prototype.weightedGroups = function() {
        return this.options.group_weighting_scheme === "percent";
      };

      Gradebook.prototype.setPointTotals = function(showPoints) {
        return this.showPointTotals = this.weightedGroups() ? false : showPoints;
      };

      Gradebook.prototype.togglePointsOrPercentTotals = function() {
        this.setPointTotals(!this.showPointTotals);
        userSettings.contextSet('show_point_totals', this.showPointTotals);
        return this.gradeGrid.invalidate();
      };

      Gradebook.prototype.onUserFilterInput = function(term) {
        var index, item, matched, propertiesToMatch, student, _i, _len, _ref,
          _this = this;

        _.each(this.multiGrid.data, function(student) {
          if (student.beforeFilteredRow != null) {
            student.row = student.beforeFilteredRow;
            return delete student.beforeFilteredRow;
          }
        });
        _.each(this.userFilterRemovedRows.reverse(), function(removedStudentItem) {
          return _this.multiGrid.data.splice(removedStudentItem.index, 0, removedStudentItem.data);
        });
        this.userFilterRemovedRows = [];
        if (term !== '') {
          propertiesToMatch = ['name', 'login_id', 'short_name', 'sortable_name'];
          index = this.multiGrid.data.length;
          while (index--) {
            student = this.multiGrid.data[index];
            matched = _.any(propertiesToMatch, function(prop) {
              var _ref;

              return (_ref = student[prop]) != null ? _ref.match(new RegExp(term, 'i')) : void 0;
            });
            if (!matched) {
              item = {
                index: index,
                data: this.multiGrid.data.splice(index, 1)[0]
              };
              this.userFilterRemovedRows.push(item);
            }
          }
        }
        _ref = this.multiGrid.data;
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          student = _ref[index];
          student.beforeFilteredRow = student.row;
          student.row = index;
        }
        return this.multiGrid.invalidate();
      };

      Gradebook.prototype.getVisibleGradeGridColumns = function() {
        var column, res, submissionType, _i, _len, _ref;

        res = [];
        _ref = this.allAssignmentColumns;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          submissionType = '' + column.object.submission_types;
          if (!(submissionType === "not_graded" || submissionType === "attendance" && !this.show_attendance)) {
            res.push(column);
          }
        }
        return res.concat(this.aggregateColumns);
      };

      Gradebook.prototype.assignmentHeaderHtml = function(assignment) {
        return columnHeaderTemplate({
          assignment: assignment,
          href: assignment.html_url,
          showPointsPossible: assignment.points_possible != null
        });
      };

      Gradebook.prototype.initGrid = function() {
        var $widthTester, assignment, columnDef, fieldName, grids, group, html, id, minWidth, options, outOfFormatter, percentage, sortRowsBy, testWidth, total,
          _this = this;

        $widthTester = $('<span style="padding:10px" />').appendTo('#content');
        testWidth = function(text, minWidth, maxWidth) {
          var width;

          width = Math.max($widthTester.text(text).outerWidth(), minWidth);
          return Math.min(width, maxWidth);
        };
        this.setAssignmentWarnings();
        this.parentColumns = [
          {
            id: 'student',
            name: I18n.t('student_name', 'Student Name'),
            field: 'display_name',
            width: 150,
            cssClass: "meta-cell",
            resizable: false,
            sortable: true
          }, {
            id: 'secondary_identifier',
            name: I18n.t('secondary_id', 'Secondary ID'),
            field: 'secondary_identifier',
            width: 100,
            cssClass: "meta-cell secondary_identifier_cell",
            resizable: false,
            sortable: true
          }
        ];
        this.allAssignmentColumns = (function() {
          var _ref, _results,
            _this = this;

          _ref = this.assignments;
          _results = [];
          for (id in _ref) {
            assignment = _ref[id];
            outOfFormatter = assignment && assignment.grading_type === 'points' && (assignment.points_possible != null) && SubmissionCell.out_of;
            minWidth = outOfFormatter ? 70 : 90;
            fieldName = "assignment_" + id;
            columnDef = {
              id: fieldName,
              field: fieldName,
              name: this.assignmentHeaderHtml(assignment),
              object: assignment,
              formatter: this.cellFormatter,
              editor: outOfFormatter || SubmissionCell[assignment.grading_type] || SubmissionCell,
              minWidth: columnWidths.assignment.min,
              maxWidth: columnWidths.assignment.max,
              width: testWidth(assignment.name, minWidth, columnWidths.assignment.default_max),
              sortable: true,
              toolTip: assignment.name,
              type: 'assignment'
            };
            if (__indexOf.call(this.assignmentsToHide, fieldName) >= 0) {
              columnDef.width = 10;
              (function(fieldName) {
                return $(document).bind('gridready', function() {
                  return _this.minimizeColumn(_this.$grid.find("[id*='" + fieldName + "']"));
                }).unbind('gridready.render').bind('gridready.render', function() {
                  return _this.gradeGrid.invalidate();
                });
              })(fieldName);
            }
            _results.push(columnDef);
          }
          return _results;
        }).call(this);
        this.aggregateColumns = (function() {
          var _ref, _results;

          _ref = this.assignmentGroups;
          _results = [];
          for (id in _ref) {
            group = _ref[id];
            html = "" + group.name;
            if (group.group_weight != null) {
              percentage = I18n.toPercentage(group.group_weight, {
                precision: 2
              });
              html += "<div class='assignment-points-possible'>\n  " + (I18n.t('percent_of_grade', "%{percentage} of grade", {
                percentage: percentage
              })) + "\n</div>";
            }
            _results.push({
              id: "assignment_group_" + id,
              field: "assignment_group_" + id,
              formatter: this.groupTotalFormatter,
              name: html,
              toolTip: group.name,
              object: group,
              minWidth: columnWidths.assignmentGroup.min,
              maxWidth: columnWidths.assignmentGroup.max,
              width: testWidth(group.name, columnWidths.assignmentGroup.min, columnWidths.assignmentGroup.default_max),
              cssClass: "meta-cell assignment-group-cell",
              sortable: true,
              type: 'assignment_group'
            });
          }
          return _results;
        }).call(this);
        total = I18n.t("total", "Total");
        this.aggregateColumns.push({
          id: "total_grade",
          field: "total_grade",
          formatter: this.groupTotalFormatter,
          name: "" + total + "\n<div id=total_column_header></div>",
          toolTip: total,
          minWidth: columnWidths.total.min,
          maxWidth: columnWidths.total.max,
          width: testWidth("Total", columnWidths.total.min, columnWidths.total.max),
          cssClass: "total-cell",
          sortable: true,
          type: 'total_grade'
        });
        $widthTester.remove();
        options = $.extend({
          enableCellNavigation: false,
          enableColumnReorder: false,
          enableAsyncPostRender: true,
          asyncPostRenderDelay: 1,
          autoEdit: true,
          rowHeight: 35,
          headerHeight: 38
        }, this.options);
        grids = [
          {
            selector: '#gradebook_students_grid',
            columns: this.parentColumns
          }, {
            selector: '#gradebook_grid',
            columns: this.getVisibleGradeGridColumns(),
            options: {
              enableCellNavigation: true,
              editable: this.options.gradebook_is_editable,
              syncColumnCellResize: true,
              enableColumnReorder: true
            }
          }
        ];
        this.multiGrid = new MultiGrid(this.rows, options, grids, 1);
        this.gradeGrid = this.multiGrid.grids[1];
        this.gradeGrid.onCellChange.subscribe(function(event, data) {
          _this.calculateStudentGrade(data.item);
          return _this.gradeGrid.invalidate();
        });
        $('body').on('click', this.onGridBlur);
        sortRowsBy = function(sortFn) {
          var i, student, _i, _len, _ref;

          _this.rows.sort(sortFn);
          _ref = _this.rows;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            student = _ref[i];
            student.row = i;
            _this.addDroppedClass(student);
          }
          return _this.multiGrid.invalidate();
        };
        this.gradeGrid.onSort.subscribe(function(event, data) {
          return sortRowsBy(function(a, b) {
            var aScore, bScore, _ref, _ref1;

            aScore = (_ref = a[data.sortCol.field]) != null ? _ref.score : void 0;
            bScore = (_ref1 = b[data.sortCol.field]) != null ? _ref1.score : void 0;
            if (!aScore && aScore !== 0) {
              aScore = -99999999999;
            }
            if (!bScore && bScore !== 0) {
              bScore = -99999999999;
            }
            if (data.sortAsc) {
              return bScore - aScore;
            } else {
              return aScore - bScore;
            }
          });
        });
        this.multiGrid.grids[0].onSort.subscribe(function(event, data) {
          var propertyToSortBy;

          propertyToSortBy = {
            display_name: 'sortable_name',
            secondary_identifier: 'secondary_identifier'
          }[data.sortCol.field];
          return sortRowsBy(function(a, b) {
            var res;

            res = a[propertyToSortBy] < b[propertyToSortBy] ? -1 : a[propertyToSortBy] > b[propertyToSortBy] ? 1 : 0;
            if (data.sortAsc) {
              return res;
            } else {
              return 0 - res;
            }
          });
        });
        this.multiGrid.parent_grid.onKeyDown.subscribe(function() {
          return false;
        });
        this.multiGrid.parent_grid.onColumnsReordered.subscribe(this.storeCustomColumnOrder);
        return this.onGridInit();
      };

      Gradebook.prototype.setAssignmentWarnings = function() {
        var a, ag, groupNames, invalidAssignmentGroups, pointsPossible, _i, _j, _len, _len1, _ref;

        if (this.weightedGroups()) {
          invalidAssignmentGroups = _.filter(this.assignmentGroups, function(ag) {
            var pointsPossible;

            pointsPossible = _.inject(ag.assignments, (function(sum, a) {
              return sum + (a.points_possible || 0);
            }), 0);
            return pointsPossible === 0;
          });
          for (_i = 0, _len = invalidAssignmentGroups.length; _i < _len; _i++) {
            ag = invalidAssignmentGroups[_i];
            _ref = ag.assignments;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              a = _ref[_j];
              a.invalid = true;
            }
          }
          if (invalidAssignmentGroups.length > 0) {
            groupNames = (function() {
              var _k, _len2, _results;

              _results = [];
              for (_k = 0, _len2 = invalidAssignmentGroups.length; _k < _len2; _k++) {
                ag = invalidAssignmentGroups[_k];
                _results.push(ag.name);
              }
              return _results;
            })();
            return this.totalGradeWarning = I18n.t('invalid_assignment_groups_warning', {
              one: "Score does not include %{groups} because it has                  no points possible",
              other: "Score does not include %{groups} because they have                    no points possible"
            }, {
              groups: $.toSentence(groupNames),
              count: groupNames.length
            });
          }
        } else {
          pointsPossible = _.inject(this.assignments, (function(sum, a) {
            return sum + (a.points_possible || 0);
          }), 0);
          if (pointsPossible === 0) {
            return this.totalGradeWarning = I18n.t('no_assignments_have_points_warning', "Can't compute score until an assignment has points possible");
          }
        }
      };

      return Gradebook;

    })();
  });

}).call(this);
