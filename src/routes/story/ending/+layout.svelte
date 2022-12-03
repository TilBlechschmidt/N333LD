<script>
	import { setContext } from 'svelte';

	let soundtrack;

	setContext('soundtrack', {
		startSoundtrack: () => {
			soundtrack.play();
		}
	});
</script>

<audio src="/audio/top-gun.mp3" type="audio/mpeg" bind:this={soundtrack} />

<slot />
