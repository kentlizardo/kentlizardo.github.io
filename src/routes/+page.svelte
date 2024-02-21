<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { onMount } from 'svelte';
</script>

<h1>Home!</h1>
<p>More thingies</p>
<ProjectCard>
	<span slot="title">Hi</span>
	<img slot="image" src="" />
</ProjectCard>
