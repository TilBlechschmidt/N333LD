<script>
	import { fade } from 'svelte/transition';
	import IconButton from '$lib/IconButton.svelte';
	import MdArrowForward from 'svelte-icons/md/MdArrowForward.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';

	const { startSoundtrack } = getContext('soundtrack');

	let time;
	let paused;
	let video;
	let hideNarrative = false;
	let creditsTimeout;

	function skipAhead() {
		time = 92.5;
	}

	$: showSkip = time > 15 && time < 80;
	$: showNarrative = time > 153 && !hideNarrative;
	$: if (showNarrative) scheduleCredits();
	$: if (time > 116) startSoundtrack();

	function scheduleCredits() {
		if (!creditsTimeout) creditsTimeout = setTimeout(goToCredits, 18800);
	}

	function goToCredits() {
		let value = 1.0;
		hideNarrative = true;
		const interval = setInterval(() => {
			value -= 0.01;
			video.style.opacity = value;

			if (value <= 0) {
				clearInterval(interval);
				setTimeout(() => goto('./credits'), 1500);
			} else {
				video.volume = value;
			}
		}, 10);
	}

	onMount(() => {
		// setTimeout(() => {
		// 	time = 110;
		// }, 501);
	});

	onDestroy(() => {
		clearTimeout(creditsTimeout);
	});
</script>

<div class="absolute top-0 left-0 h-full w-full bg-black -z-10">
	<video
		class="w-full h-full"
		src="/video/landing.mp4"
		bind:currentTime={time}
		bind:paused
		bind:this={video}
		autoplay
	/>
</div>

{#if showSkip}
	<div class="absolute bottom-8 left-0 w-full flex justify-center" in:fade>
		<div class="rounded-xl p-8 backdrop-blur text-white bg-black bg-opacity-50">
			<IconButton on:click={skipAhead}>
				Skip ahead
				<MdArrowForward slot="icon" />
			</IconButton>
		</div>
	</div>
{/if}

{#if showNarrative}
	<div
		class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center b612 backdrop-blur backdrop-sepia bg-black bg-opacity-30 text-white text-xl text-shadow"
		in:fade={{ duration: 1500 }}
		out:fade={{ duration: 1000 }}
	>
		<div class="max-w-lg mx-32">
			<span in:fade={{ duration: 3000, delay: 1000 }}>
				<strong>Darren Harrison</strong> successfully and safely landed the aircraft after a total
				time of <em>40 minutes</em> at the helm.
			</span>
			<br /><br />
			<span in:fade={{ duration: 3000, delay: 4500 }}>
				All three occupants survived and the aircraft is still flying today. The pilot was
				immediately transported to a hospital and underwent heart surgery. He was released a couple
				of days later expecting a full recovery.
			</span>
			<br /><br />
			<span in:fade={{ duration: 3000, delay: 10500 }}>
				Many commercial pilots in the area congratulated Harrison on his <strong
					>first successful solo flight.</strong
				>
			</span>
		</div>
	</div>
{/if}

{#if paused && !showNarrative && !hideNarrative}
	<div
		transition:fade
		class="absolute top-0 left-0 h-full w-full backdrop-blur bg-black bg-opacity-50 flex flex-col items-center justify-center text-white b612"
	>
		<div class="text-3xl mb-8">Please turn up your volume 🔊</div>
		<button
			class="p-3 border rounded"
			on:click={() => {
				paused = false;
			}}
		>
			I am ready!
		</button>
	</div>
{/if}
