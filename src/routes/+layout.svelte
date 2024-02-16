<script>
	import Header from '$lib/components/Header.svelte';
	import './fonts.css';
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
</svelte:head>
<body>
	<Header></Header>
	<main>
		<slot />
	</main>
	<footer></footer>
</body>

<style>
	body {
		margin: 0;
		background: #eee;
		color: #333;
		font-family: sans-serif;
	}

	main {
		background: #f8f8f8;
		padding: 1rem;
		margin: 2rem auto;
		max-width: min(40rem, 80%);
	}
</style>
