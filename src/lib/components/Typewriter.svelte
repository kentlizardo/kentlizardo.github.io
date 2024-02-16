<script>
	/**
	 * @type {string}
	 */
	export let content = '';

	/** @param ms {number} */
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const char_type_delay = 0.02;

	let target = 'undefined';

	/** @param x {string} */
	export const setTarget = async (x) => {
		content = '';
		target = x;
		let end = 0;
		while (content != target) {
			await delay(char_type_delay * 1000);
			content = target.substring(0, end);
			end += 1;
		}
	};
	setTarget(target);
</script>

<span>{content}</span>
