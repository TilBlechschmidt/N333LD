<script>
	export let heading = null;
	export let fullPage = false;
</script>

<div class="w-full flex flex-col items-center justify-center mb-32" class:h-screen={fullPage}>
	{#if heading}
		<h4 class="text-3xl mb-4">{heading}</h4>
	{/if}
	<table class="w-full">
		<tbody>
			<slot />
		</tbody>
	</table>
</div>
