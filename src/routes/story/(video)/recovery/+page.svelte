<script>
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import MdKeyboardArrowRight from 'svelte-icons/md/MdKeyboardArrowRight.svelte';

	let time;
	let paused;
	let video;

	let hideSuccess = false;

	$: showSuccess = time > 17 && !hideSuccess;

	function goToReal() {
		let value = 1.0;
		const interval = setInterval(() => {
			video.style.opacity = value;
			video.volume = value;
			value -= 0.01;

			if (value < 0.5) {
				hideSuccess = true;
			}

			if (value <= 0) {
				clearInterval(interval);
				goto('./real');
			}
		}, 10);
	}
</script>

<div class="absolute top-0 left-0 h-full w-full bg-black -z-10">
	<video
		class="w-full h-full"
		src="/video/recovery.webm"
		bind:currentTime={time}
		bind:paused
		bind:this={video}
		autoplay
	/>
</div>

{#if showSuccess}
	<div
		transition:fade
		class="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center text-white b612"
	>
		<div
			class="w-full flex flex-col items-center justify-center backdrop-blur bg-black bg-opacity-50 backdrop-grayscale py-8 shadow-2xl drop-shadow-2xl"
		>
			<div class="text-green-600 text-5xl">Success</div>
			<div class="text-gray-400 text-xl mb-4" in:fade={{ delay: 1500, duration: 3000 }}>
				You saved the plane!
			</div>
			<button
				class="flex items-center"
				in:fade={{ delay: 4500, duration: 3000 }}
				on:click={goToReal}
			>
				<div>Continue</div>
				<span class="w-8 h-8 inline-block"><MdKeyboardArrowRight /></span>
			</button>
		</div>
	</div>
{/if}

{#if paused && time < 17}
	<div
		transition:fade
		class="absolute top-0 left-0 h-full w-full backdrop-blur bg-black bg-opacity-75 flex flex-col items-center justify-center text-white b612"
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
