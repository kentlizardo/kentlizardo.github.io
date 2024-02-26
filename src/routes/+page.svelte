<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Shelf from '$lib/components/Shelf.svelte';
</script>

<div class="page">
	<h1>Home!</h1>
	<p>More thingies</p>
	<!-- <Shelf></Shelf> -->
	<section class="projects">
		<ProjectCard>
			<span slot="title">Hi</span>
		</ProjectCard>
	</section>
	<section class="socials">
		<ul></ul>
	</section>
</div>

<style>
	.projects {
		margin: 2rem;
	}
</style>
