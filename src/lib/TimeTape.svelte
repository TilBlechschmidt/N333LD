<script context="module">
	import { writable } from 'svelte/store';

	const heightPerMs = writable(0);
	const tapeMargin = writable(0);
	const tapeStart = writable(0);
</script>

<script>
	import { onMount, setContext } from 'svelte';

	export let start = 1652194635000;
	export let end = 1652200584000;
	export let tickInterval = 1000 * 10;
	export let labelsEvery = 6;

	export let time = start;

	let container;
	let containerHeight;
	let scrollPosition;
	let windowHeight;

	function buildTicks(start, end, tickInterval, labelsEvery) {
		const labelInterval = tickInterval * labelsEvery;
		let duration = end - start;

		let previous = 0;
		while (duration % labelInterval > previous) {
			previous = duration % labelInterval;
			duration += tickInterval;
		}

		const tickCount = duration / tickInterval;

		let ticks = [];
		for (let i = 0; i < tickCount; i++) {
			const time = start + i * tickInterval;
			if (i % labelsEvery == 0) {
				ticks.push({
					time,
					label: new Date(time)
						.toLocaleTimeString('en-GB', { timeZone: 'America/New_York' })
						.substr(0, 5)
				});
			} else {
				ticks.push({ time });
			}
		}

		return ticks;
	}

	function onScroll() {
		scrollPosition = container.scrollTop;
	}

	$: ticks = buildTicks(start, end, tickInterval, labelsEvery);
	$: progress = Math.max(0, Math.min(1, scrollPosition / containerHeight));
	$: time = start + (end - start) * progress;

	$: heightPerMs.set(containerHeight / (end - start));
	$: tapeMargin.set(windowHeight / 2 + 11);
	$: tapeStart.set(start);

	setContext('timeTape', { heightPerMs, tapeMargin, tapeStart });
	onMount(() => {
		// TODO Remove this
		// container.scrollTop = 3614;
		onScroll();
	});
</script>

<div class="absolute top-0 left-0 h-full w-full flex items-center justify-end pointer-events-none">
	<div class="w-28 h-10 backdrop-blur bg-gray-500 bg-opacity-30 rounded-l-lg marker" />
</div>

<div
	class="absolute top-0 right-0 w-full h-full overflow-y-auto py-1/2"
	bind:this={container}
	on:scroll={onScroll}
	bind:clientHeight={windowHeight}
>
	<div bind:clientHeight={containerHeight}>
		{#each ticks as tick}
			<div class="flex items-center tick">
				<div class="grow" />
				{#if tick.label}
					<div class="text-white b612 text-xl">{tick.label}</div>
				{/if}
				<div class="ml-4 w-4 h-px bg-gray-500" class:long={tick.label} />
			</div>
		{/each}
	</div>
	<slot />
</div>

<!-- <div class="absolute top-0 left-0 text-3xl text-white">
	Scroll: {scrollPosition}
	<br />
	Height: {containerHeight}
	<br />
	Progress: {progress}
	<br />
	Time: {Math.round(time)}
</div> -->
<style>
	.marker {
		margin-top: 24px;
	}

	.tick {
		height: 24px;
	}

	.py-1\/2 {
		padding-top: 50vh;
		padding-bottom: 50vh;
	}

	.long {
		width: 2rem;
	}
</style>
