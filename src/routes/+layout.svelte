<script>
	import Header from '$lib/components/Header.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<Header></Header>
<NavBar></NavBar>
<main>
	<slot />
</main>
<footer></footer>
