<script>
	import { fade } from 'svelte/transition';
	import PauseScreen from './PauseScreen.svelte';

	export let src;

	export let time = 0;
	export let duration;

	export let autoplay = true;
	export let muted = false;
	export let loop = false;
	export let cover = false;

	export function fadeOut(callback) {
		let value = 1.0;
		const interval = setInterval(() => {
			video.volume = value;
			value -= 0.01;
			video.style.opacity = value;

			if (value <= 0) {
				clearInterval(interval);
				callback();
			}
		}, 10);
	}

	let video;
	let paused = autoplay && !muted;

	$: showPauseScreen = paused && (time && duration ? time < duration - 1 : true);
</script>

<div class="absolute top-0 left-0 h-full w-full bg-black -z-10">
	<video
		out:fade
		class="w-full h-full"
		class:object-cover={cover}
		{src}
		{autoplay}
		{muted}
		{loop}
		bind:currentTime={time}
		bind:paused
		bind:this={video}
		bind:duration
	/>
	<div
		class="absolute top-0 left-0 h-full w-full flex justify-center items-center"
		class:opacity-0={time > 0}
	>
		<div class="lds-ripple">
			<div />
			<div />
		</div>
	</div>
</div>

{#if showPauseScreen}
	<PauseScreen
		on:click={() => {
			paused = false;
		}}
	/>
{/if}
