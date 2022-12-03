<script>
	import { onMount, onDestroy, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	import { firstNonBackgroundLayer } from '../helpers';
	import geojson from '../data/adiz.json';

	const name = 'adiz';
	const paint = { 'fill-color': '#dc2626', 'fill-opacity': 0.15 };

	const { getMap } = getContext(contextKey);
	const map = getMap();

	onMount(() => {
		const lowerLayer = firstNonBackgroundLayer(map);

		map.addSource(name, {
			type: 'geojson',
			data: geojson
		});

		map.addLayer(
			{
				id: name,
				type: 'fill',
				source: name,
				paint
			},
			lowerLayer
		);
	});

	onDestroy(() => {
		map.removeLayer(name);
		map.removeSource(name);
	});
</script>
