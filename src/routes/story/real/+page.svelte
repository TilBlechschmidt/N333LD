<script>
	import { fade } from 'svelte/transition';
	import MdArrowForward from 'svelte-icons/md/MdArrowForward.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let show = false;

	onMount(() => {
		show = true;
	});
</script>

{#if show}
	<div
		class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center b612 bg-black text-white text-xl"
		out:fade={{ duration: 3000 }}
	>
		<div class="max-w-lg">
			<span in:fade={{ duration: 3000 }}>
				This is the <strong>real</strong> story of <em>Darren Harrison</em> who was returning from his
				fishing trip on the Bahamas with two friends.
			</span>
			<br /><br />
			<span in:fade={{ duration: 3000, delay: 4500 }}>
				After tending to his unconscious pilot friend and placing him at the back of the aircraft,
				Darren took over the controls and started figuring out how to fly the aircraft.
			</span>
			<br /><br />
			<span in:fade={{ duration: 3000, delay: 10500 }}>
				What follows is a description of the events that took place from this point onwards.
			</span>
		</div>

		<button
			class="py-8 text-sm font-medium text-gray-400"
			in:fade={{ duration: 3000, delay: 14500 }}
			out:fade
			on:click={() => goto('./timeline')}
		>
			Continue
			<span class="w-6 h-6 align-middle inline-block -mt-0.5"><MdArrowForward /></span>
		</button>
	</div>
{/if}
