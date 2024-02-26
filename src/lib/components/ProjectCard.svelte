<script>
	let color = 'white';
</script>

<div class="card" style="--theme-color: {color}">
	<div>
		<h2>
			<slot name="title">Untitled</slot>
		</h2>
	</div>
	<div></div>
</div>

<style>
	.card {
		background-color: var(--theme-color);
		aspect-ratio: 552/167;
	}
</style>
