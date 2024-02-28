<script>
	import Header from '$lib/components/Header.svelte';
	import { fade } from 'svelte/transition';
	export let data;
</script>

<svelte:head>
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
	:global(h1) {
		margin: 0.4rem 0rem;
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
	/* @media only screen and (min-width: 768px) {
		main {
			max-width: min(60rem, 80%);
		}
	} */

	/* fonts */

	/* .fira-sans condensed-thin {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 100;
		font-style: normal;
	}

	.fira-sans condensed-thin-italic {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 100;
		font-style: italic;
	}

	.fira-sans condensed-extralight {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 200;
		font-style: normal;
	}

	.fira-sans condensed-extralight-italic {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 200;
		font-style: italic;
	}

	.fira-sans condensed-light {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 300;
		font-style: normal;
	}

	.fira-sans condensed-light-italic {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 300;
		font-style: italic;
	}

	.fira-sans condensed-regular {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 400;
		font-style: normal;
	}

	.fira-sans condensed-regular-italic {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 400;
		font-style: italic;
	}

	.fira-sans condensed-medium {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 500;
		font-style: normal;
	}

	.fira-sans condensed-medium-italic {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 500;
		font-style: italic;
	}

	.fira-sans condensed-semibold {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 600;
		font-style: normal;
	}

	.fira-sans condensed-semibold-italic {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 600;
		font-style: italic;
	}

	.fira-sans condensed-bold {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 700;
		font-style: normal;
	}

	.fira-sans condensed-bold-italic {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 700;
		font-style: italic;
	}

	.fira-sans condensed-extrabold {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 800;
		font-style: normal;
	}

	.fira-sans condensed-extrabold-italic {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 800;
		font-style: italic;
	}

	.fira-sans condensed-black {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 900;
		font-style: normal;
	}

	.fira-sans condensed-black-italic {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 900;
		font-style: italic;
	} */
</style>
