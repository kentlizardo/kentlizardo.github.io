<script>
	import { onMount } from 'svelte';

	/** @type {HTMLFormElement}*/
	let form;
	/** @type {HTMLElement}*/
	let result;

	function submitForm(/** @type {SubmitEvent} */ e) {
		e.preventDefault();
		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);
		result.innerHTML = 'Please wait...';

		fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: json
		})
			.then(async (response) => {
				let json = await response.json();
				if (response.status == 200) {
					result.innerHTML = json.message;
				} else {
					console.log(response);
					result.innerHTML = json.message;
				}
			})
			.catch((error) => {
				console.log(error);
				result.innerHTML = 'Something went wrong!';
			})
			.then(function () {
				form.reset();
				setTimeout(() => {
					result.style.display = 'none';
				}, 3000);
			});
	}

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
		on:submit={submitForm}
	>
		<input type="hidden" name="access_key" value="9d550562-e74a-4069-8515-f719038f2d77" />
		<input type="hidden" name="subject" value="Portfolio Contact Submission" />

		<input type="text" name="name" required />
		<input type="email" name="email" required />
		<textarea name="message" required></textarea>
		<div class="h-captcha" data-captcha="true"></div>
		<button type="submit">Submit Form</button>
	</form>
	<div bind:this={result}></div>
</div>

<style>
</style>
