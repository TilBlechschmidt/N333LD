<script>
	import { goto } from '$app/navigation';
	import { Marker } from '@beyonk/svelte-mapbox';
	import SatelliteImagery from '$lib/map/layer/SatelliteImagery.svelte';
	import Focus from '$lib/map/Focus.svelte';
	import Line from '$lib/map/layer/Line.svelte';
	import AnimatedLine from '$lib/map/layer/AnimatedLine.svelte';
	import FlightRoute from '$lib/map/layer/FlightRoute.svelte';
	import routeBoat from '$lib/map/data/routeBoat.json';
	import routeCar from '$lib/map/data/routeCar.json';
	import {
		bahamasTransform,
		planeMovementTransform,
		groundMovementBoundingBox
	} from '$lib/map/data/boundingBoxes.js';
	import BahamasCard from '$lib/BahamasCard.svelte';

	const position = [-77.04022809341052, 26.52391763050926];

	// Step 0: "You are on a vacation (overview map)"
	// Step 1: "You are on a boat in the Bahamas (satmap + closeup)"
	// Step 2: "You are driving the boat"
	// Step 3: "You are in an Uber"
	// Step 4: "You boarded the plane"
	let step = 0;

	function next() {
		step += 1;
	}

	function startVideo() {
		goto('/story/descent');
	}
</script>

{#if step < 2}
	<SatelliteImagery />
{/if}

{#if step == 1}
	<Focus transform={bahamasTransform} padding={0} />
{:else if step == 2 || step == 3}
	<Focus location={groundMovementBoundingBox} />
{:else if step == 4}
	<Focus transform={planeMovementTransform} padding={0} speed={0.075} />
{/if}

{#if step < 2}
	<Marker lat={position[1]} lng={position[0]}>
		<div class="pulse bg-blue-500 border-4 border-white rounded-full w-6 h-6" />
	</Marker>
{/if}

{#if step == 2}
	<AnimatedLine name="boat-1" geojson={routeBoat} color="#22c55e" delay={1000} />
{:else if step == 3}
	<Line name="boat-2" geojson={routeBoat} color="#22c55e" />
	<AnimatedLine name="car-2" geojson={routeCar} color="#f97316" fadeOut />
{:else if step == 4}
	<Line name="boat-3" geojson={routeBoat} color="#22c55e" />
	<Line name="car-3" geojson={routeCar} color="#f97316" />
	<FlightRoute end={1652198301000} />
	<!-- Fort pierce airport marker -->
	<Marker lat={27.492981548807236} lng={-80.36747534447036}>
		<div class="relative inline-block b612">
			<div class="absolute text-white whitespace-nowrap -top-7 flex align-middle items-center">
				<div class="h-px w-8 mx-4 bg-white" />
				<div>
					<div class="text-lg">Treasure Coast Intl. Airport</div>
					<div class="text-gray-400 -mt-2">KFPR</div>
				</div>
			</div>
		</div>
	</Marker>
{/if}

{#if step == 0}
	<BahamasCard on:click={next}>
		<span slot="title">Holiday season 🛫</span>
		After the hard work of the past weeks, you embark on a vacation with some of your friends. One of
		them happens to own an airplane and as all of you enjoy fishing you decide to take a trip to ...
	</BahamasCard>
{/if}

{#if step == 1}
	<BahamasCard on:click={next}>
		<span slot="title">The Bahamas 🏝️🍹</span>
		It is the last day of your vacation and you are currently trying to catch some final fish for lunch.
		However, as you have a long journey ahead of you, you start packing your things and head back to
		the shore ...
	</BahamasCard>
{/if}

{#if step == 2}
	<BahamasCard on:click={next} delay={3500}>
		<span slot="title">Wrapping up 🚕</span>
		Arriving in port, you hand over the boat to the rental company, pay them with some fish you caught,
		and then proceed to call an Uber to get to the airport ...
	</BahamasCard>
{/if}

{#if step == 3}
	<BahamasCard on:click={next} delay={3000}>
		<span slot="title">The journey home 🛫</span>
		At the airport, you pass through security and board the aircraft of your friend:
		<emph class="font-mono">N333LD</emph>
		<img src="/N333LD.jpg" class="rounded-2xl my-4" alt="Aircraft N333LD on the apron." />
		It is a <emph class="italic">Cessna 208B Grand Caravan</emph> with a powerful Pratt & Whitney
		PT6A-114A turboprop engine — though unlike the picture above, it no longer has floats but
		instead runs on wheels.
		<br /><br />
		As your make yourself comfortable in the back, your friend begins with the pre-flight check and starts
		the engine. It is a beautiful day out with little to no clouds and a very light breeze.
		<br /><br />
		You taxi to the beginning of RWY09 and await take-off clearance ...
	</BahamasCard>
{/if}

{#if step == 4}
	<BahamasCard on:click={startVideo} delay={25000}>
		<span slot="title">Flying home ✈️</span>
		You ascend up to FL120, about 3.700m, and marvel at the beauty of the landscape below you:
		<img src="/bahamas.jpg" class="rounded-2xl my-4" alt="Aerial view of the Bahamas." />
		As you get closer to your destination —
		<emph class="italic">Treasure Coast International Airport (KFPR)</emph>
		in <strong>Fort Pierce</strong>
		— your pilot descends the aircraft down to FL100, about 3.000m.
	</BahamasCard>
{/if}
