<script>
	import Line from './Line.svelte';
	import data from '../data/routePlane.timed.json';
	import { Marker } from '@beyonk/svelte-mapbox';
	import MdAirplanemodeActive from 'svelte-icons/md/MdAirplanemodeActive.svelte';

	export let start = 1652194635000;
	export let end = Number.MAX_SAFE_INTEGER;

	export let latest;
	export let hideMarker = false;

	function buildGeojson(start, end) {
		const startIndex = data.findIndex((e) => e.time >= start);
		const endIndex = data.findIndex((e) => e.time > end);
		const subdata = data.slice(startIndex, endIndex);

		const coordinates = subdata.map((e) => [e.lng, e.lat]);
		latest = subdata[subdata.length - 1];

		return {
			type: 'Feature',
			properties: {},
			geometry: {
				coordinates,
				type: 'LineString'
			}
		};
	}

	function formatAltitude(alt) {
		if (alt > 8000) {
			return `FL${Math.round((alt + 150) / 100)}`;
		} else {
			return `${Math.round(alt)}ft`;
		}
	}

	$: geojson = buildGeojson(start, end);
	$: planeStyle = latest ? `transform: rotate(${latest.bearing}deg)` : '';
	$: speed = latest && latest.speed ? `${Math.round(latest.speed)}` : '—';
</script>

<Line name="aircraft" {geojson} color="#0ea5e9" />

{#if latest && !hideMarker}
	<Marker lat={latest.lat} lng={latest.lng}>
		<div class="relative inline-block">
			<div
				class="absolute top-4 flex flex-col align-middle items-center text-white  -translate-x-1/2"
			>
				<div class="text-lg b612">N333LD</div>
				<div class="text-base text-gray-400 whitespace-nowrap b612-mono">
					{speed}kts · {formatAltitude(latest.alt)}
				</div>
			</div>
		</div>
	</Marker>

	<Marker lat={latest.lat} lng={latest.lng}>
		<span class="w-6 h-6 text-white align-middle inline-block" style={planeStyle}>
			<MdAirplanemodeActive />
		</span>
	</Marker>
{/if}
