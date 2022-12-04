<script>
	import { Marker } from '@beyonk/svelte-mapbox';
	import MdAirplanemodeActive from 'svelte-icons/md/MdAirplanemodeActive.svelte';
	import data from '../data/routePlane.timed.json';
	import { onDestroy, onMount } from 'svelte';
	import Line from './Line.svelte';

	export let start = 1652194635000;
	export let end = Number.MAX_SAFE_INTEGER;

	export let maxSpeed = 15;
	export let initialSpeed = 100;
	export let speedup = 0.35;
	export let showTime = false;

	export let time = start;

	let timeout;
	let coordinates = [];
	let latestValue = null;

	function processValue(value) {
		latestValue = value;
		coordinates.push([latestValue.lng, latestValue.lat]);
		coordinates = coordinates;
		time = latestValue.time;
	}

	function progress(offset, speed) {
		processValue(data[offset]);
		offset += 1;

		if (offset >= data.length || latestValue.time > end) return;

		const newSpeed = Math.max(speed - speedup, maxSpeed);
		timeout = setTimeout(() => progress(offset, newSpeed), speed);
	}

	function loadInitial() {
		for (let i = 0; i < data.length; i++) {
			const value = data[i];
			if (value.time > start) return i;
			processValue(value);
		}
	}

	function formatAltitude(alt) {
		if (alt > 8000) {
			return `FL${Math.round((alt + 150) / 100)}`;
		} else {
			return `${Math.round(alt)}ft`;
		}
	}

	onMount(() => {
		const offset = loadInitial();
		progress(offset, initialSpeed);
	});

	onDestroy(() => {
		clearTimeout(timeout);
	});

	$: geojson = {
		type: 'Feature',
		properties: {},
		geometry: {
			coordinates,
			type: 'LineString'
		}
	};

	$: planeStyle = latestValue ? `transform: rotate(${latestValue.bearing}deg)` : '';
	$: speed = latestValue && latestValue.speed ? `${Math.round(latestValue.speed)}` : '—';
</script>

<Line name="aircraft" {geojson} color="#0ea5e9" />

{#if latestValue}
	<Marker lat={latestValue.lat} lng={latestValue.lng}>
		<div class="relative inline-block">
			<div
				class="absolute top-4 flex flex-col align-middle items-center text-white  -translate-x-1/2"
			>
				<div class="text-lg b612">N333LD</div>
				<div class="text-base text-gray-400 whitespace-nowrap b612-mono">
					{speed}kts · {formatAltitude(latestValue.alt)}
				</div>
			</div>
		</div>
	</Marker>
{/if}

{#if latestValue}
	<Marker lat={latestValue.lat} lng={latestValue.lng}>
		<span class="w-6 h-6 text-white align-middle inline-block" style={planeStyle}
			><MdAirplanemodeActive /></span
		>
	</Marker>
{/if}

{#if showTime}
	<div class="absolute bottom-0 left-0 w-full flex flex-col items-center mb-4">
		<div class="text-3xl text-white b612">
			{new Date(time).toLocaleTimeString('en-GB', { timeZone: 'America/New_York' })}
		</div>
	</div>
{/if}
