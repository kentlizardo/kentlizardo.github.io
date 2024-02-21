<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import NavPath from '$lib/components/NavPath.svelte';

	/** @type {string} */
	let selected_route = '';
</script>

<div class="header">
	<div class="header-logo">
		<h1 class="oxygen-mono-regular">kentmakes.games</h1>
		<div class="header-icon"></div>
	</div>
	<div class="subheader">
		<NavPath typed_pathname={selected_route}></NavPath>
	</div>
	<div class="navbar-container">
		<NavBar bind:selected_route></NavBar>
	</div>
</div>

<style>
	.header {
		margin: 1rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.header-logo {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
	.header-logo > h1 {
		margin: 0;
		padding: 0;
	}
	.header-icon {
		width: 32px;
		height: 32px;
		background-image: url($lib/images/pfl-icons.png);
		background-position: 0px 0px;
		image-rendering: crisp-edges;
		background-size: 400%;
		filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.401));
	}
	.subheader {
		/* position: relative; */
		top: 0%;
		left: 0%;
		align-self: center;
	}
	.navbar-container {
		margin: 0;
		margin-left: auto;
	}
</style>
