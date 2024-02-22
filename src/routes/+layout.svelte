<script>
	import Header from '$lib/components/Header.svelte';
	import { fade } from 'svelte/transition';
	import './fonts.css';
	export let data;
</script>

<svelte:head>
	<!-- PT Sans -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
	<!-- Oxygen Mono -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Oxygen+Mono&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
	<!-- Fira Sans Condensed -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<body>
	<Header></Header>
	<main>
		<div class="content-wrapper">
			{#key data.pathname}
				<div class="content" in:fade>
					<slot />
				</div>
			{/key}
		</div>
	</main>
	<footer></footer>
</body>

<style>
	body {
		margin: 0;
		background: #eee;
		color: #333;
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 400;
	}
	.content-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	.content-wrapper:nth-last-child(0) {
		margin-bottom: 0;
	}
	.content-wrapper > * {
		grid-row: 1;
		grid-column: 1;
		padding: --spacing-sm;
	}
	main {
		background: #f8f8f8;
		padding: 1rem;
		margin: 2rem auto;
		max-width: min(40rem, 80%);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
</style>
