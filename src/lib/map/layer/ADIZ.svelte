<script>
	import { onMount, onDestroy, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	import { firstNonBackgroundLayer } from '../helpers';
	import geojson from '../data/adiz.json';

	export let hidden = false;

	const name = 'adiz';
	const paint = { 'fill-color': '#dc2626', 'fill-opacity': hidden ? 0 : 0.15 };

	const { getMap } = getContext(contextKey);
	const map = getMap();

	let fadeInterval;

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
		clearInterval(fadeInterval);
	});

	function fade(hidden) {
		if (!map.getLayer(name)) return;

		console.log('starting fade');
		clearInterval(fadeInterval);

		if (hidden) {
			if (map.getPaintProperty(name, 'fill-opacity') < 0.1) return;

			let opacity = 0.15;
			fadeInterval = setInterval(() => {
				map.setPaintProperty(name, 'fill-opacity', opacity);
				opacity -= 0.01;
				if (opacity <= 0) clearInterval(fadeInterval);
			}, 25);
		} else {
			if (map.getPaintProperty(name, 'fill-opacity') > 0.14) return;

			let opacity = 0;
			fadeInterval = setInterval(() => {
				map.setPaintProperty(name, 'fill-opacity', opacity);
				opacity += 0.01;
				if (opacity >= 0.15) clearInterval(fadeInterval);
			}, 25);
		}
	}

	$: fade(hidden);
</script>
