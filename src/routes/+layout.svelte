<script>
import { page } from "$app/stores";
import { onMount } from "svelte";

let path = $page.url.hostname;

// onMount(() => {
//     path = window.location.hostname;
// });

</script>

<h1>
    Header {path}
</h1>
<slot />