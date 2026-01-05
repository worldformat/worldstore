import autosize from 'autosize';
import type { Attachment } from 'svelte/attachments';

/**
 * Creates an autosize attachment for a textarea element.
 * @param content The content of the textarea. (only for reactivity)
 * @returns An attachment that applies autosize to the textarea element.
 */
function factory(content: string): Attachment {
	return (element) => {
		autosize(element);
		return () => autosize.destroy(element);
	};
}

export default factory;
