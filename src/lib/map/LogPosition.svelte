<script>
	import { getContext, onDestroy, onMount } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';

	const { getMap } = getContext(contextKey);
	const map = getMap();

	function log(e) {
		console.log(e.target.transform.zoom, e.target.transform.center);
	}

	onMount(() => {
		map.on('move', log);
	});

	onDestroy(() => {
		map.off('move', log);
	});
</script>
