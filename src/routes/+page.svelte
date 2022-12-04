<script>
	import IntroVideo from '$lib/IntroVideo.svelte';
	import MdArrowForward from 'svelte-icons/md/MdArrowForward.svelte';
	import { fade } from 'svelte/transition';

	let time = 0;

	$: shadow = time < 92;
	$: windowScene = time > 61 && time < 92;
</script>

<IntroVideo bind:time />

<div
	transition:fade
	class="absolute bottom-64 right-64 text-center"
	class:text-shadow={shadow}
	class:text-gray-200={!windowScene}
	class:mix-blend-overlay={!windowScene}
	class:text-gray-300={windowScene}
	class:mix-blend-screen={windowScene}
>
	<h2 class="text-6xl">The flight of</h2>
	<h1 class="text-8xl">N333LD</h1>
	<button
		class="mt-8 p-3 border rounded shadow-2xl drop-shadow-2xl text-shadow bg-gray-600 hover:bg-black transition-all"
	>
		<a href="/story/bahamas">
			Get started
			<span class="w-6 h-6 align-middle inline-block -mt-0.5">
				<MdArrowForward />
			</span>
		</a>
	</button>
</div>
