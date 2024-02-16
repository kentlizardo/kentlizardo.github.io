<script>
	import Header from '$lib/components/Header.svelte';
</script>

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
		max-width: 40rem;
	}
</style>
