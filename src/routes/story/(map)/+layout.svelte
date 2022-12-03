<script>
	import Map from '$lib/map/Map.svelte';
	import { fade } from 'svelte/transition';
</script>

<div out:fade class="w-full h-full">
	<Map>
		<slot />
	</Map>
</div>
