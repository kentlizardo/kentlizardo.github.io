<script>
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter';

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
			status = result.message || 'Success!';
		}
	};

	onMount(() => {
		form.reset();
	});
</script>

<h1>Contact Me!</h1>
<div>
	<script src="https://web3forms.com/client/script.js" async defer></script>
	<section>
		<form
			bind:this={form}
			action="https://api.web3forms.com/submit"
			method="POST"
			on:submit|preventDefault={submitForm}
		>
			<input type="hidden" name="access_key" value="9d550562-e74a-4069-8515-f719038f2d77" />
			<input type="hidden" name="subject" value="Portfolio Contact Submission" />
			<div class="form-section">
				<input type="text" placeholder="name" name="name" required />
				<input type="email" placeholder="email" name="email" required />
			</div>
			<div class="form-section">
				<textarea name="message" placeholder="write your message here!" required rows="3"
				></textarea>
			</div>
			<div class="h-captcha" data-captcha="true"></div>
			<div class="form-section"><input type="submit" /></div>
			<div class="status">
				<Typewriter>
					{status}
				</Typewriter>
			</div>
		</form>
	</section>
</div>

<style>
	form {
		position: relative;
		margin: 30px auto 30px auto;
	}
	form * {
		font-family: 'Fira Sans Condensed', sans-serif;
		font-weight: 500;
	}

	input,
	textarea {
		background: #cccccc;
		border: solid;
		padding: 0.5rem;
		transition: all 0.3s ease-in-out;
	}
	textarea {
		resize: none;
	}
	textarea:placeholder-shown,
	input:placeholder-shown {
		background: #f8f8f8;
		border: dashed;
	}
	input[type='submit'] {
		background-color: #f8f8f8;
		font-weight: 600px;
	}
	input[type='submit']:hover {
		background-color: #cccccc;
	}

	.form-section {
		display: flex;
		flex-wrap: wrap;
	}
	.form-section > * {
		flex: 1;
		margin: 0.2rem;
	}
</style>
