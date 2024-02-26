<script>
	import Img from '@zerodevx/svelte-img';

	export let data;
	const { title, date, src, Content } = data;
</script>

<svelte:head>
	<title>kentmakes(media) - {title}</title>
	<meta property="og:title" content={title} />
</svelte:head>
<article>
	<h1>{title}</h1>
	<p>Published: {date}</p>
	<Img {src} />
	<Content />
</article>
