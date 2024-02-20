<script>
	/**
	 * @type {string}
	 */
	export let content = '';

	/** @type {string} */
	export let target = '';

	/** @param ms {number} */
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const char_type_delay = 0.02;

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

<div>{content}</div>
