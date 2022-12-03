<script>
	import { Marker } from '@beyonk/svelte-mapbox';
	import MdPlace from 'svelte-icons/md/MdPlace.svelte';
	import { fade, fly } from 'svelte/transition';

	export let lat;
	export let lng;
	export let title;
	export let subtitle;
	export let color = 'text-orange-500';
</script>

<Marker {lat} {lng}>
	<div class="relative inline-block b612 text-white mb-8">
		<div class={`${color} w-8 h-8`} in:fade out:fade={{ duration: 150 }}>
			<MdPlace />
		</div>
		<div
			class="absolute whitespace-nowrap -top-2 right-10 flex align-middle items-center text-right"
			in:fly={{ x: -50 }}
			out:fade={{ duration: 150 }}
		>
			<div>
				<div class="text-lg">{title}</div>
				<div class="text-gray-400 -mt-2">{subtitle}</div>
			</div>
		</div>
	</div>
</Marker>
