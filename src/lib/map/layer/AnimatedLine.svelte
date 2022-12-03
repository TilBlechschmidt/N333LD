<script>
	import { onMount, onDestroy } from 'svelte';
	import ChunkedLine from '$lib/map/layer/ChunkedLine.svelte';
	import { Marker } from '@beyonk/svelte-mapbox';
	import { fade } from 'svelte/transition';

	export let name;
	export let geojson;

	export let color;
	export let segmentLength = 0.01;
	export let stepSize = 0.005;
	export let progress = 0;
	export let fadeOut = false;
	export let delay = 0;

	let position;
	let drawInterval;
	let hideMarker = false;

	onMount(() => {
		position = geojson.geometry.coordinates[0];
		setTimeout(() => {
			drawInterval = setInterval(() => {
				// TODO Ease in the speed
				progress += stepSize;

				if (progress >= 1) {
					clearInterval(drawInterval);
					if (fadeOut) {
						setTimeout(() => {
							hideMarker = true;
						}, 750);
					}
				}
			}, 10);
		}, delay);
	});

	onDestroy(() => {
		clearInterval(drawInterval);
	});
</script>

<ChunkedLine {name} {geojson} {progress} {color} {segmentLength} bind:latestPosition={position} />

{#if position && !hideMarker}
	<Marker lat={position[1]} lng={position[0]}>
		{#if fadeOut}
			<div out:fade class="pulse bg-blue-500 border-4 border-white rounded-full w-6 h-6" />
		{:else}
			<div class="pulse bg-blue-500 border-4 border-white rounded-full w-6 h-6" />
		{/if}
	</Marker>
{/if}
