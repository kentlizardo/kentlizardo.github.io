<script>
	// @ts-nocheck
	export let post;
	let height = post.height;
</script>

<div style="min-height: {height + 'px'}">
	<div>{post.title}</div>
	<p>{post.desc}</p>
</div>
