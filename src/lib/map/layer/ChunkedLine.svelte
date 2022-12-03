<script>
	import lineChunk from '@turf/line-chunk';
	import Line from './Line.svelte';

	export let name;
	export let geojson;
	export let progress = 1.0;

	export let color = '#ffffff';
	export let width = 3;
	export let segmentLength = 0.01;

	export let latestPosition;

	function chunkedCoordinates(geojson, segmentLength) {
		const features = lineChunk(geojson, segmentLength).features;
		const coordinateSets = features.map((f) => f.geometry.coordinates);
		return coordinateSets;
	}

	function buildGeojson(chunked, progress) {
		const segmentCount = Math.round(chunked.length * progress);
		const segments = chunked.slice(0, segmentCount);

		if (segments.length > 0) {
			const segment = segments[segments.length - 1];
			const point = segment[segment.length - 1];
			latestPosition = point;
		}

		return {
			type: 'Feature',
			properties: {},
			geometry: {
				coordinates: segments.flat(),
				type: 'LineString'
			}
		};
	}

	$: chunked = chunkedCoordinates(geojson, segmentLength);
	$: subjson = buildGeojson(chunked, progress);
</script>

<Line {name} {color} {width} geojson={subjson} />
