/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {

	tinymce.create('tinymce.plugins.EOClozeeditorPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceeoclozeeditor');
			ed.addCommand('mceeoclozeeditor', function() {
			lang = ed.getParam('language');
				ed.windowManager.open({
					file : ed.getParam("moodle_plugin_base") + 'eoclozeeditor/dialog.php?lang=' + lang ,
					width : 590 + parseInt(ed.getLang('eoclozeeditor.delta_width', 0)),
					height : 360 + parseInt(ed.getLang('eoclozeeditor.delta_height', 0)),
					inline : true
				}, {
					plugin_url : url, // Plugin absolute URL
				});
			});

			// Register eoclozeeditor button
			ed.addButton('eoclozeeditor', {
				title : 'eoclozeeditor.desc',
				cmd : 'mceeoclozeeditor',
				image : url + '/img/cloze_editor.png'
			});

			// Add a node change handler, selects the button in the UI when a image is selected
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('eoclozeeditor', n.nodeName == 'IMG');
			});


		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'eoclozeeditor plugin',
				author : 'Andreas Glombitza/Achim Skuta',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/eoclozeeditor',
                                version : "2.4"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('eoclozeeditor', tinymce.plugins.EOClozeeditorPlugin);
})();
