<script>
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import CreditGroup from './CreditGroup.svelte';
	import CreditRow from './CreditRow.svelte';

	const initialSpeed = 60;
	const targetSpeed = 20;

	let container;
	let scrollTimeout;
	let time = 0;

	function easeInOutQuad(x) {
		return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
	}

	function scroll() {
		const speedDelta = initialSpeed - targetSpeed;
		const speedFraction = Math.min(1, time / 10000);
		const speed = initialSpeed - easeInOutQuad(speedFraction) * speedDelta;
		time += speed;
		container.scrollTop += 1;

		scrollTimeout = setTimeout(scroll, speed);
	}

	onMount(() => {
		time = 0;
		scrollTimeout = setTimeout(() => {
			scrollTimeout = setTimeout(scroll, initialSpeed);
		}, 2500);
	});

	onDestroy(() => {
		clearTimeout(scrollTimeout);
	});
</script>

<div
	class="absolute top-0 left-0 w-screen h-screen overflow-y-auto bg-black b612 text-white text-xl"
	bind:this={container}
>
	<div class="w-full h-screen flex flex-col items-center justify-center">
		<div class="relative overflow-hidden">
			<video
				autoplay
				muted
				loop
				class="absolute top-0 left-0 w-full h-full object-cover bg-white"
				src="/video/credit-bg.webm"
			/>
			<div class="mix-blend-darken text-white bg-black text-center inter">
				<h2 class="text-6xl">The flight of</h2>
				<h1 class="text-8xl">N333LD</h1>
			</div>
		</div>
	</div>

	<div class="w-full flex flex-col items-center mb-32">
		<div class="text-gray-500">Designed & developed by</div>
		<h4 class="text-3xl mb-4">Til Blechschmidt</h4>
	</div>

	<CreditGroup heading="Media">
		<CreditRow title="Radio recordings" credit="LiveATC" />
		<CreditRow title="Landing footage" credit={['Jeff Chandler', 'Ari Hait (WPBF-TV)']} />
	</CreditGroup>

	<CreditGroup heading="Map data">
		<CreditRow title="Base layers" credit={['OpenStreetMap', 'Mapbox']} />
		<CreditRow title="Satellite Imagery" credit="Maxar" />
		<CreditRow title="ADIZ Boundary" credit="Federal Aviation Administration" />
		<CreditRow title="Flight track" credit="FlightRadar24" />
	</CreditGroup>

	<CreditGroup heading="Software">
		<CreditRow title="Flight Simulation" credit="Microsoft Flight Simulator 2020" />
		<CreditRow title="Video editing" credit="Final Cut Pro X" />
		<CreditRow title="Presentation" credit={['Svelte', 'Tailwind', 'Mapbox GL JS']} />
	</CreditGroup>

	<CreditGroup heading="Special thanks" fullPage>
		<CreditRow
			title="Executive summary"
			credit={['Petter Hörnfeldt (Mentour Pilot)', 'VASAviation']}
		/>
		<CreditRow title="Aviation education" credit={['HFC Hamburg e.V.']} />
		<CreditRow
			title="Emotional support"
			credit={['August Connolly', 'Andreea Pricopi', 'Thorben Jordt']}
		/>
	</CreditGroup>

	<div class="w-full h-screen flex items-center justify-evenly">
		<div class="h-1/2">
			<img
				src="/crew-1.jpeg"
				class="rounded-xl max-h-full"
				alt="Harrison and Morgan in front of the tower"
			/>
			<div class="text-gray-500 text-base mt-2 max-w-xs text-center m-auto">
				Morgan & Harrison in front of the Fort Pierce tower
			</div>
		</div>

		<div class="h-1/2">
			<img
				src="/crew-2.jpeg"
				class="rounded-xl max-h-full"
				alt="Harrison and Morgan in front of the tower"
			/>
			<div class="text-gray-500 text-base mt-2 max-w-xs text-center m-auto">
				Morgan showing Harrison the Cessna 208B panel printouts
			</div>
		</div>
	</div>
</div>
