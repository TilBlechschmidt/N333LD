<script>
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import MdKeyboardArrowRight from 'svelte-icons/md/MdKeyboardArrowRight.svelte';
	import Video from '$lib/Video.svelte';

	let time;
	let fadeOut;

	let hideSuccess = false;

	$: showSuccess = time > 17 && !hideSuccess;

	function goToReal() {
		setTimeout(() => {
			hideSuccess = true;
		}, 500);

		fadeOut(() => goto('./real'));
	}
</script>

<Video src="/video/recovery.mp4" bind:time bind:fadeOut />

{#if showSuccess}
	<div
		transition:fade
		class="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center text-white b612"
	>
		<div
			class="w-full flex flex-col items-center justify-center backdrop-blur bg-black bg-opacity-50 backdrop-grayscale py-8 shadow-2xl drop-shadow-2xl"
		>
			<div class="text-green-600 text-5xl">Success</div>
			<div class="text-gray-400 text-xl mb-4" in:fade={{ delay: 500, duration: 3000 }}>
				You saved the plane!
			</div>
			<button
				class="flex items-center"
				in:fade={{ delay: 1500, duration: 3000 }}
				on:click={goToReal}
			>
				<div>Continue</div>
				<span class="w-8 h-8 inline-block"><MdKeyboardArrowRight /></span>
			</button>
		</div>
	</div>
{/if}
