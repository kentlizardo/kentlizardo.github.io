<script>
	import { onMount } from 'svelte';

	/** @type {HTMLFormElement}*/
	let form;

	onMount(() => {
		form.reset();
	});
</script>

<div>
	<script src="https://web3forms.com/client/script.js" async defer></script>
	<form bind:this={form} action="https://api.web3forms.com/submit" method="POST">
		<input type="hidden" name="access_key" value="9d550562-e74a-4069-8515-f719038f2d77" />
		<input type="hidden" name="subject" value="Portfolio Contact Submission" />

		<input type="text" name="name" required />
		<input type="email" name="email" required />
		<textarea name="message" required></textarea>
		<div class="h-captcha" data-captcha="true"></div>
		<button type="submit">Submit Form</button>
	</form>
</div>

<style>
</style>
