<script>
	import Img from '@zerodevx/svelte-img';

	export let data;
	const { title, date, src, Content } = data;
</script>

<svelte:head>
	<title>kentmakes.media - {title}</title>
	<meta property="og:title" content={title} />
</svelte:head>
<article>
	<div class="img-card">
		<div class="img-wrapper">
			<Img
				class="d"
				{src}
				on:click={() => {
					console.log('bruh');
				}}
			/>
			<div class="content">
				<h1>{title}</h1>
				<p class="date">Published: {date}</p>
				<Content />
			</div>
		</div>
	</div>
</article>

<style>
	.img-card {
		text-align: center;
	}
	.img-wrapper {
		text-align: left;
		display: inline-block;
		margin: auto;
		position: relative;
	}
	.content {
		padding: 1rem;
		position: absolute;
		z-index: 1;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.content::before {
		border: solid 2px white;
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: 4px;
		z-index: -1;
		background: linear-gradient(0deg, #ffffff44 30%, #ffffff00 100%);
	}
	.date {
		line-height: 1rem;
	}
</style>
