<script>
	export let data;
</script>

<h1>Posts</h1>
<ul>
	{#each data.posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{#if post.meta && post.meta.title}
						{post.meta.title}
					{:else}
						Untitled
					{/if}
				</a>
			</h2>
			{#if post.meta && post.meta.date}
				Published {post.meta.date}
			{/if}
		</li>
	{/each}
</ul>
