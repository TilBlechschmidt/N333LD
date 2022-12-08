<script>
	import CrashScreen from '$lib/CrashScreen.svelte';
	import { goto } from '$app/navigation';
	import Video from '$lib/Video.svelte';

	let time;

	$: showFailure = time > 32;

	function reset() {
		goto('/story/descent');
	}
</script>

<Video src="/video/wingrip.mp4" bind:time />

{#if showFailure}
	<CrashScreen on:click={reset} />
{/if}
