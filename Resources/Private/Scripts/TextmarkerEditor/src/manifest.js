import manifest from '@neos-project/neos-ui-extensibility';
import {$add, $get} from 'plow-js';
import TextmarkerPlugin from './TextmarkerPlugin';
import TextmarkerButton from './TextmarkerButton';

// addExamplePlugin gets passed two parameters:
// - `ckEditorConfiguration` contains the so-far built CKEditor configuration.
// - `options` is an object with the following fields:
//   - `editorOptions`: gets `[propertyName].ui.inline.editorOptions` from the NodeTypes.yaml
//   - `userPreferences`: `user.preferences` from redux store
//   - `globalRegistry`: the global registry
//   - `propertyDomNode`: the DOM node where the editor should be initialized.
//
// it needs to return the updated ckEditorConfiguration.
const addTextmarkerPlugin = (ckEditorConfiguration, options) => {
	if ($get(['formatting', 'textmarker'], options.editorOptions)) {
		ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
		return $add('plugins', TextmarkerPlugin, ckEditorConfiguration);
	}
	return ckEditorConfiguration;
};

manifest('RWcon.Neos.Textmarker:Textmarker', {}, globalRegistry => {
	const richtextToolbar = globalRegistry.get('ckEditor5').get('richtextToolbar');

	richtextToolbar.set('textmarkerExtension', {
		// the command name must match the command in examplePlugin.js this.editor.commands.add(...)
		commandName: 'highlight',
		// the path in isActive must match the commandName from the line above, to ensure the active state
		// of the button automatically toggles.
		isActive: $get('highlight'),
		isVisible: $get(['formatting', 'textmarker']),

		component: TextmarkerButton,
		icon: 'highlighter',
		tooltip: 'Mark a span',
	}, 'before strong');

	const config = globalRegistry.get('ckEditor5').get('config');
	config.set('textmarkerExtension', addTextmarkerPlugin);
});
