<script>
	import { getContext } from 'svelte';

	export let time;

	const { heightPerMs, tapeMargin, tapeStart } = getContext('timeTape');

	$: offset = $heightPerMs * (time - $tapeStart) + $tapeMargin;
	$: style = `top: ${offset}px`;
	$: timeString = new Date(time).toLocaleTimeString('en-GB', { timeZone: 'America/New_York' });
</script>

<div class="absolute right-0 w-48 bg-red-500 h-px" {style}>
	<div class="-mt-8 relative w-px h-px">
		<div class="absolute top-0 right-0 card w-lg shadow-2xl p-8">
			<div class="flex justify-between items-baseline">
				<div class="text-lg"><slot name="title" /></div>
				<div class="text-gray-500 text-sm font-mono">
					{timeString}
				</div>
			</div>
			<hr class="my-4" />
			<div class="text-sm text-justify">
				<slot />
			</div>
		</div>
	</div>
</div>

<style>
	.w-lg {
		width: 24rem;
	}
</style>
