<script>
</script>

<div class="card">
	<h2>
		<slot name="title">Untitled</slot>
	</h2>
	<div>
		<slot name="image" />
	</div>
</div>

<style>
	.card {
		background-color: beige;
		aspect-ratio: 3/2;
	}
</style>
