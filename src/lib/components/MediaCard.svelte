<script>
	/** @type {any} */
	export let post;
	let ratio = post.aspectRatio;
</script>

<div class="wrapper" style="--aspect-ratio: {ratio}">
	<div>{post.url}</div>
	<p>{post.title}</p>
</div>

<style>
	.wrapper {
		aspect-ratio: var(--aspect-ratio);
	}
</style>
