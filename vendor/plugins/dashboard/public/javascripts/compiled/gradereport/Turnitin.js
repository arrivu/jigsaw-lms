(function() {
  define(['i18n!turnitin', 'underscore'], function(I18n, _arg) {
    var Turnitin, invert, max;

    max = _arg.max, invert = _arg.invert;
    return Turnitin = {
      extractData: function(submission) {
        var attachment, data, item, stateList, stateMap, states, turnitin, _i, _len, _ref, _ref1, _ref2, _ref3;

        if (!(submission != null ? submission.turnitin_data : void 0)) {
          return;
        }
        data = {
          items: []
        };
        if (submission.attachments && submission.submission_type === 'online_upload') {
          _ref = submission.attachments;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            attachment = _ref[_i];
            attachment = (_ref1 = attachment.attachment) != null ? _ref1 : attachment;
            if (turnitin = (_ref2 = submission.turnitin_data) != null ? _ref2['attachment_' + attachment.id] : void 0) {
              data.items.push(turnitin);
            }
          }
        } else if (submission.submission_type === "online_text_entry") {
          if (turnitin = (_ref3 = submission.turnitin_data) != null ? _ref3['submission_' + submission.id] : void 0) {
            data.items.push(turnitin);
          }
        }
        if (!data.items.length) {
          return;
        }
        stateList = ['no', 'none', 'acceptable', 'warning', 'problem', 'failure'];
        stateMap = invert(stateList);
        states = (function() {
          var _j, _len1, _ref4, _results;

          _ref4 = data.items;
          _results = [];
          for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
            item = _ref4[_j];
            _results.push(parseInt(stateMap[item.state || 'no']));
          }
          return _results;
        })();
        data.state = stateList[max(states)];
        return data;
      },
      extractDataFor: function(submission, key, urlPrefix) {
        var data;

        data = submission.turnitin_data;
        if (!(data && data[key] && (data[key].similarity_score != null))) {
          return {};
        }
        data = data[key];
        data.state = "" + (data.state || 'no') + "_score";
        data.score = "" + data.similarity_score + "%";
        data.reportUrl = "" + urlPrefix + "/assignments/" + submission.assignment_id + "/submissions/" + submission.user_id + "/turnitin/" + key;
        data.tooltip = I18n.t('tooltip.score', 'Turnitin Similarity Score - See detailed report');
        return data;
      }
    };
  });

}).call(this);
