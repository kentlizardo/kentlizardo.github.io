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

<!-- <div class="full">
	<Img
		class="d"
		{src}
		on:click={() => {
			console.log('bruh');
		}}
	/>
</div> -->

<style>
	.img-card {
		text-align: center;
	}
	.img-wrapper {
		text-align: left;
		display: inline-block;
		margin: auto;
		position: relative;

		background-color: #ccc;
		backdrop-filter: blur(2px);
		box-shadow: 0 1px 12px rgba(0, 0, 0, 0.25);
		border: 4px solid #eee;
	}
	.content {
		margin: -4px;
		padding: 1rem;
		position: absolute;
		z-index: 1;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.content::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: 0;
		z-index: -1;

		background: linear-gradient(0deg, #ffffffad 60%, #ffffff00 100%);
		backdrop-filter: blur(2px);
		border-radius: 8px;
		/* box-shadow: 0 1px 12px rgba(0, 0, 0, 0.25); */
		border: 1px solid rgba(255, 255, 255, 0.3);
	}
	.date {
		line-height: 0;
	}

	.full :global(img) {
		max-width: 100%;
		max-height: 100%;
		bottom: 0;
		left: 0;
		margin: auto;
		overflow: auto;
		position: fixed;
		right: 0;
		top: 0;
		object-fit: contain;
		background-size: cover;
		width: 100%;
		height: 100%;
	}
</style>
