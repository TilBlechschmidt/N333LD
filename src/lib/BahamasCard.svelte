<script>
	import { fly } from 'svelte/transition';
	import IconButton from './IconButton.svelte';
	import MdArrowForward from 'svelte-icons/md/MdArrowForward.svelte';

	export let delay = 0;
</script>

<div class="absolute top-0 right-0 h-full overflow-y-auto">
	<div class="card p-8 max-w-lg m-16" in:fly={{ y: 400, delay }} out:fly={{ y: -400 }}>
		<div class="text-2xl"><slot name="title" /></div>
		<hr class="my-4" />
		<div class="mb-4"><slot /></div>
		<div class="flex">
			<div class="grow" />
			<IconButton on:click>
				Continue
				<MdArrowForward slot="icon" />
			</IconButton>
		</div>
	</div>
</div>
