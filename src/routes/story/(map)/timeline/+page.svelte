<script>
	import FlightRoute from '$lib/map/layer/FlightRoute2.svelte';
	import Adiz from '$lib/map/layer/ADIZ.svelte';
	import TimeTape from '$lib/TimeTape.svelte';
	import TimeTapeCard from '$lib/TimeTapeCard.svelte';
	import RadioCommunication from '$lib/RadioCommunication.svelte';
	import { Marker } from '@beyonk/svelte-mapbox';
	import MdPlace from 'svelte-icons/md/MdPlace.svelte';
	import { fade, fly } from 'svelte/transition';
	import AirportMarker from '$lib/map/layer/AirportMarker.svelte';
	import Focus from '$lib/map/Focus.svelte';
	import IconButton from '$lib/IconButton.svelte';
	import MdArrowForward from 'svelte-icons/md/MdArrowForward.svelte';
	import { goto } from '$app/navigation';
	import {
		planeMovementTransform,
		approachTransform,
		finalBoundingBox
	} from '$lib/map/data/boundingBoxes.js';

	let time;

	function showLanding() {
		goto('./ending/landing');
	}
</script>

<FlightRoute end={time} />

{#if time < 1652199627002}
	<Focus transform={planeMovementTransform} />
{:else if time < 1652200020747}
	<Focus transform={approachTransform} />
{:else}
	<Focus location={finalBoundingBox} />
{/if}

{#if time > 1652198718053 && time < 1652200020747}
	<AirportMarker
		lat={27.492981548807236}
		lng={-80.36747534447036}
		color="text-orange-500"
		title="Fort Pierce"
		subtitle="KFPR"
	/>
{/if}

{#if time > 1652198986144 && time < 1652199229988}
	<Adiz />
{/if}

{#if time > 1652199312087 && time < 1652200020747}
	<AirportMarker
		lat={26.683056}
		lng={-80.095556}
		color="text-green-500"
		title="Palm Beach"
		subtitle="KPBI"
	/>
{/if}

<TimeTape bind:time start={1652198280342}>
	<TimeTapeCard time={1652198337750}>
		<span slot="title">Uncontrolled descent</span>
		As the pilot collapsed, the aircraft banked right and started descending at
		<emph>8000fpm (~40m/s)</emph>. It accelerated to a top speed of
		<strong>295kts (~550km/h)</strong> — significantly beyond the maximum speed the aircraft was rated
		for. Any rapid control movements would have torn the plane into pieces, though Harrison knew that
		from previous chats with his pilot friends and thus pulled very carefully out of the dive.
	</TimeTapeCard>

	<TimeTapeCard time={1652198516523}>
		<span slot="title">Tending to the pilot</span>
		Harrison stabilised the plane at around FL95 and shifted his attention to the unconscious pilot.
		He and his friend placed him at the back of the aircraft as there was nothing they could do in the
		air — the primary goal now was to get the aircraft on the ground.
	</TimeTapeCard>

	<TimeTapeCard time={1652198718053}>
		<span slot="title">Calling for help</span>
		Unfortunately, the headset cable of the pilot ripped as they moved him to the back. Luckily, the
		second passenger sitting in the front had a headset too which Harrison used to call for help. The
		controller at their destination, <span class="text-orange-500">Fort Pierce</span>, answered:
		<RadioCommunication />
		<!-- TODO: Mention transponder switching that did not work -->
	</TimeTapeCard>

	<TimeTapeCard time={1652198986144}>
		<span slot="title">Getting an escort</span>
		At this stage, the Miami Center controller who the aircraft was supposed to be in contact with tried
		to reach the aircraft without success. The dialed frequency was likely switched over to Fort Pierce
		by accident during the whole commotion. Due to this, the Miami controller declared the aircraft as
		<strong>NORDO</strong>
		<emph class="text-gray-500">(no radio)</emph>.
		<br /><br />
		The aircraft was currently passing through the
		<span class="text-red-500">ADIZ</span>
		<emph class="text-gray-500">(Air Defense Identification Zone)</emph>
		and could not be contacted, thus the controller was legally required to report this to the FAA and
		Department of Defense who dispatched a set of fighter jets to intercept N333LD and identify the situation.

		<img src="/f-16.jpeg" class="rounded-xl mt-4" alt="F-16 fighter jet on the ground" />
	</TimeTapeCard>

	<TimeTapeCard time={1652199312087}>
		<span slot="title">Out of range</span>
		The controller in <span class="text-orange-500">Fort Pierce</span> continued to try and locate
		the aircraft. However, as time went on the plane got further and further south eventually
		leaving communication range. The controller tried giving Harrison a phone number to call but
		that message was never received.
		<br /><br />
		At the same time, a controller in <span class="text-green-500">Palm Beach</span> heard about
		what was going on and was confident he had identified the aircraft. However, their radio was not
		able to send on the frequency Harrison was listening to — so they scrambled to find a way to
		establish communication.
		<img src="/motorola.jpeg" class="rounded-xl my-4" alt="Motorola PET-2000 Emergency Radio" />
		They found an old Motorola PET-2000 radio which they tuned to the frequency of Fort Pierce, establishing
		communication with Harrison!
	</TimeTapeCard>

	<TimeTapeCard time={1652199627002}>
		<span slot="title">First flight lesson</span>
		Robert Morgan, a controller at Palm Beach who also happens to be a <strong>CFI</strong>
		<emph class="text-gray-500">(Certified Flight Instructor)</emph>, was on his lunch break when he
		got paged by his supervisor — something that hardly ever happens. He immediately made his way up
		to the tower to assess the situation and guide Harrison.

		<div class="mt-4 text-center font-mono">
			"Keep the coastline to the right,<br />continue flying north"
		</div>
	</TimeTapeCard>

	<TimeTapeCard time={1652199780000}>
		<span slot="title">Unknown aircraft type</span>
		Morgan was not familiar with the particular type of aircraft Harrison was in. However, his colleagues
		immediately sourced and printed a panel diagram as a reference:

		<img
			src="/panel.png"
			class="mt-4"
			alt="Instrument panel diagram of the aircraft Harrison was flying"
		/>
	</TimeTapeCard>

	<TimeTapeCard time={1652200124085}>
		<!-- TODO Make bracketed text footnotes -->
		<span slot="title">Final approach</span>
		Initially they planned on making a right turn straight towards the runway. However, Morgan remembered
		that there was a large antenna just south of the approach path which he did not want Harrison to
		hit — so instead he suggested a 270º shallow left turn into a long final approach.
		<br /><br />
		During the approach, Morgan coached Harrison on how to land the aircraft. Up to this point, Harrison
		had no problem holding the altitude. However, during the turn the screens in the cockpit turned black
		(likely due to the sun now shining into the cockpit from the back which, together with the polarized
		sunglasses, made the screens appear black) and he no longer had access to this information (while
		there were backup instruments, he did not know how to read them). To help him out, Morgan continuously
		provided Harrison with altitude and speed updates.
	</TimeTapeCard>

	<TimeTapeCard time={1652200537028}>
		<span slot="title">Runway 10L, cleared to land</span>
		As Harrison exited the turn, he found the runway straight ahead of him. He continued the approach,
		slowed down to 120kts (~222km/h) for landing, and asked Morgan some last questions ...
		<div class="flex">
			<div class="grow" />
			<IconButton on:click={showLanding}>
				Continue
				<MdArrowForward slot="icon" />
			</IconButton>
		</div>
	</TimeTapeCard>
</TimeTape>

<div class="absolute bottom-0 left-0 w-full flex flex-col items-center mb-4">
	<div class="text-3xl text-white b612">
		{new Date(time).toLocaleTimeString('en-GB', { timeZone: 'America/New_York' })}
	</div>
</div>

<style lang="postcss">
	emph {
		@apply italic;
	}

	strong {
		@apply font-bold;
	}
</style>
