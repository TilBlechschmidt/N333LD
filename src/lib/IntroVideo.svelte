<script>
	import { fade } from 'svelte/transition';
	export let time = 0;
</script>

<div class="absolute top-0 left-0 h-full w-full bg-black -z-10">
	<video
		out:fade
		class="object-cover w-full h-full"
		src="/video/intro.mp4"
		autoplay
		loop
		muted
		bind:currentTime={time}
	/>
</div>
