<script>
	import { fly, fade } from 'svelte/transition';
	import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';

	export let text = '';
</script>

<div
	class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center b612 bg-black"
	out:fade
>
	<div class="text-red-600 text-5xl" in:fade={{ duration: 3000 }}>The plane crashed</div>
	<div class="text-gray-400 text-xl mb-16" in:fade={{ delay: 1500, duration: 3000 }}>
		into the atlantic ocean
	</div>
	<div class="text-white text-xl max-w-lg text-center" in:fade={{ delay: 4500, duration: 3000 }}>
		{text}
	</div>
</div>

<button
	class="absolute bottom-0 left-0 w-full py-8 text-sm font-medium text-gray-600"
	in:fade={{ duration: 3000, delay: 6000 }}
	out:fade
	on:click
>
	<span class="w-6 h-6 align-middle inline-block -mt-0.5"><MdRefresh /></span>
	Try again
</button>
