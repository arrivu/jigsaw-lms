//This file is copied from instructure_image plugin for tinymce

define([
    'compiled/editor/stocktiny',
    'i18n!editor',
    'jquery',
    'underscore',
    'str/htmlEscape',
    'jqueryui/dialog',
    'compiled/fn/preventDefault',
    'jqueryui/accordion' ,
    'jqueryui/tabs',
    'jqueryui/button',
    'jqueryui/tooltip'
    ], function(tinymce, I18n, $,_, htmlEscape) {

    tinymce.create('tinymce.plugins.faq', {
        init : function(ed, url) {

            // Register commands100
            ed.addCommand('mcefaq', function() {
                var selectedNode = ed.selection.getNode();


                if (ed.dom.getAttrib(selectedNode, 'class', '').indexOf('mceItem') != -1) return;
                require(['compiled/views/tinymce/FAQView'], function(FAQView){
                    new FAQView(ed, selectedNode);
                });

            });

            // Register buttons
            ed.addButton('faq', {
                title : htmlEscape(I18n.t('embed_faq', 'Insert FAQ')),
                cmd : 'mcefaq',
                image : url + '/img/button.jpg'
            });

            // highlight our button when an image is selected
            ed.onNodeChange.add(function(ed, cm, e) {
                if(e.nodeName == 'IMG' && e.className != 'equation_image') {
                    cm.setActive('faq', true);
                } else {
                    cm.setActive('faq', false);
                }
            });
        },

        getInfo : function() {
            return {
                longname : 'faq',
                author : 'Arrivu',
                authorurl : 'http://arrivuapps.com',
                infourl : 'http://arrivuapps.com',
                version : '1'
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('faq', tinymce.plugins.faq);
});