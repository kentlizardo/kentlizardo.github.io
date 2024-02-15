<script>
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	let path = $page.url.host;
</script>

<h1>
	{path}
</h1>
<NavBar></NavBar>
