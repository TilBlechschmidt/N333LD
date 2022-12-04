<script>
	import CrashScreen from '$lib/CrashScreen.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let time;
	let paused;

	$: showFailure = time > 32;

	function reset() {
		goto('/story/descent');
	}
</script>

<div class="absolute top-0 left-0 h-full w-full bg-black -z-10">
	<video
		class="w-full h-full"
		src="/video/wingrip.mp4"
		bind:currentTime={time}
		bind:paused
		autoplay
	/>
</div>

{#if showFailure}
	<CrashScreen on:click={reset} />
{/if}

{#if paused}
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
