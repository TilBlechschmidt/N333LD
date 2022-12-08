<script>
	import { fade } from 'svelte/transition';
	import MdPlayArrow from 'svelte-icons/md/MdPlayArrow.svelte';
</script>

<div
	in:fade={{ delay: 1000, duration: 2000 }}
	out:fade
	class="absolute top-0 left-0 h-full w-full bg-black flex flex-col items-center justify-center text-white b612"
>
	<button class="w-32 h-32" on:click><MdPlayArrow /></button>
	<caption class="text-gray-500">
		Please click the play button,<br />I promise we won't sell your soul!
	</caption>
</div>
