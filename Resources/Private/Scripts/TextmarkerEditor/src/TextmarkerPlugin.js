import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import AttributeCommand from '@ckeditor/ckeditor5-basic-styles/src/attributecommand';

export default class TextmarkerPlugin extends Plugin{
	init() {
		this.editor.model.schema.extend('$text', { allowAttributes: 'highlight' });

		const config ={
			model: 'highlight',
			view: {
				name: 'span',
				classes: 'textmarker'
			}
		};
		this.editor.conversion.attributeToElement(config);

		this.editor.commands.add(
			'highlight',
			new AttributeCommand(this.editor, 'highlight')
		)
	}
}

