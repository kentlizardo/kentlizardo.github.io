<script>
	import { onMount } from 'svelte';
	const char_type_delay = 0.2;

	/** @type {string} */
	export let target = '';
	/** @type {string} */
	let visible = '';
	let remaining = '';

	let index = 0;
	onMount(() => {
		const interval = setInterval(() => {
			if (index <= target.length) {
				index += 1;
			}
		}, 1000 * char_type_delay);
		return () => {
			clearInterval(interval);
		};
	});

	$: {
		visible = target.substring(0, index);
		remaining = target.substring(index);
	}
</script>

<span>{visible}</span><span class="invis">{remaining}</span>

<style>
	.invis {
		color: transparent;
	}
</style>
