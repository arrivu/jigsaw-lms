//This file is copied from instructure_image plugin for tinymce

define([
  'compiled/editor/stocktiny',
  'i18n!editor',
  'jquery',
  'str/htmlEscape',
  'jqueryui/dialog'
], function(tinymce, I18n, $, htmlEscape) {

  tinymce.create('tinymce.plugins.WistiaPlugin', {
    init : function(ed, url) {
      // Register commands
      ed.addCommand('mceWistia', function() {
        var selectedNode = ed.selection.getNode();
        $('#combo_field').remove();
        // Internal wistia object like as iframe placeholder
        if (ed.dom.getAttrib(selectedNode, 'class', '').indexOf('mceItem') != -1) return;

        require(['compiled/views/tinymce/WistiaVideoView'], function(WistiaVideo){
          new WistiaVideo(ed, selectedNode);
        });
      });

      // Register buttons
      ed.addButton('wistia', {
        title : htmlEscape(I18n.t('embed_video', 'Embed Wistia Video')),
        cmd : 'mceWistia',
        image : url + '/img/button.png'
      });

      // highlight our button when an image is selected
      ed.onNodeChange.add(function(ed, cm, e) {
        if(e.nodeName == 'IMG' && e.className != 'equation_image') {
          cm.setActive('wistia', true);
        } else {
          cm.setActive('wistia', false);
        }
      });
    },

    getInfo : function() {
      return {
        longname : 'WistiaPlugin',
        author : 'Arrivu',
        authorurl : 'http://arrivuapps.com',
        infourl : 'http://arrivuapps.com',
        version : '1'
      };
    }
  });

  // Register plugin
  tinymce.PluginManager.add('wistia', tinymce.plugins.WistiaPlugin);
});