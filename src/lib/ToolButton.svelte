<script>
	export let title;
	export let subtitle;
	export let disabled = false;
</script>

<button
	on:click
	class="cursor-pointer no-default rounded-xl border border-solid border-gray-300 flex p-4 hover:shadow transition-all hover:bg-gray-50"
	class:bg-gray-200={disabled}
	class:pointer-events-none={disabled}
>
	<span class="w-12 h-12 text-blue-500 mr-4">
		<slot />
	</span>
	<div>
		<div class:text-gray-500={disabled}>{title}</div>
		<div class="text-sm text-gray-400">
			{subtitle}
		</div>
	</div>
</button>
