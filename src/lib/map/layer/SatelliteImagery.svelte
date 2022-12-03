<script>
	import { onMount, onDestroy, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	import { firstNonBackgroundLayer } from '../helpers.js';

	const { getMap } = getContext(contextKey);
	const map = getMap();
	const name = 'satellite';

	function easeInOutCubic(x) {
		return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
	}

	onMount(() => {
		const lowerLayer = firstNonBackgroundLayer(map);
		const paint = {
			'raster-fade-duration': 1000,
			'raster-resampling': 'nearest',
			'raster-opacity': ['interpolate', ['exponential', 0.5], ['zoom'], 10, 0, 11, 1]
		};

		map.addLayer(
			{
				id: `${name}-mapbox`,
				source: { type: 'raster', url: 'mapbox://mapbox.satellite', tileSize: 256 },
				type: 'raster',
				paint: {
					'raster-brightness-min': 0.3,
					'raster-saturation': 0.1,
					'raster-contrast': 0.25,
					'raster-opacity': 1.0,
					...paint
				}
			},
			lowerLayer
		);
	});

	onDestroy(() => {
		let opacity = 1;

		const fadeOutInterval = setInterval(() => {
			map.setPaintProperty(`${name}-mapbox`, 'raster-opacity', easeInOutCubic(opacity));

			opacity -= 0.01;

			if (opacity < 0) {
				clearInterval(fadeOutInterval);
				map.removeLayer(`${name}-mapbox`);
				map.removeSource(`${name}-mapbox`);
			}
		}, 10);
	});
</script>
