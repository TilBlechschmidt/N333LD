<script>
	import { getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';

	export let location = null;
	export let transform = null;
	export let instantly = false;
	export let speed = 0.5;
	export let padding = 400;

	const { getMap } = getContext(contextKey);
	const map = getMap();

	function flyToTransform(transform) {
		if (instantly) {
			map.jumpTo(transform);
		} else {
			map.flyTo(
				{
					speed,
					...transform
				},
				{ zoomingToLocation: true }
			);
		}
	}

	function flyToLocation(location) {
		const transform = map.cameraForBounds(location, {
			padding: { top: 100, bottom: 100, left: 100, right: 100 + padding }
		});

		flyToTransform(transform);
	}

	function flyTo(location, transform) {
		if (transform != null) {
			flyToTransform(transform);
		} else if (location != null) {
			flyToLocation(location);
		} else {
			console.error('attempted to focus with no location or transform');
		}
	}

	$: flyTo(location, transform);
</script>
