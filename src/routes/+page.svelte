<script>
	import IntroVideo from '$lib/IntroVideo.svelte';

	import MdArrowForward from 'svelte-icons/md/MdArrowForward.svelte';
</script>

<div
	class="fixed bottom-0 right-32 backdrop-blur bg-gray-700 bg-opacity-40 rounded-t-xl p-8 inter text-center text-white"
>
	<h1 class="text-4xl">The flight of <span class="b612-mono">N333LD</span></h1>
	<hr class="w-full my-2" />
	<h4 class="text-xl mb-8">How passengers landed a plane ✈️</h4>

	<button class="p-3 border rounded">
		Get started
		<span class="w-6 h-6 align-middle inline-block -mt-0.5"><MdArrowForward /></span>
	</button>
</div>

<IntroVideo />
