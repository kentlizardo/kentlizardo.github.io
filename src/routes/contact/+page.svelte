<script>
	import { onMount } from 'svelte';

	/** @type {HTMLFormElement}*/
	let form;

	let status = '';

	const submitForm = async (/** @type {SubmitEvent} */ e) => {
		status = 'Submitting...';
		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);
		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: json
		});
		const result = await response.json();
		if (result.success) {
			console.log(result);
			status = result.message || 'Success';
		}
	};

	onMount(() => {
		form.reset();
	});
</script>

<div>
	<script src="https://web3forms.com/client/script.js" async defer></script>
	<form
		bind:this={form}
		action="https://api.web3forms.com/submit"
		method="POST"
		on:submit|preventDefault={submitForm}
	>
		<input type="hidden" name="access_key" value="9d550562-e74a-4069-8515-f719038f2d77" />
		<input type="hidden" name="subject" value="Portfolio Contact Submission" />

		<input type="text" name="name" required />
		<input type="email" name="email" required />
		<textarea name="message" required rows="3"></textarea>
		<div class="h-captcha" data-captcha="true"></div>
		<input type="submit" />
	</form>
	<div>{status}</div>
</div>

<style>
</style>
