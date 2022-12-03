<script>
	export let title;
	export let credit;
</script>

<tr class="">
	<td class="py-1 text-gray-500 text-end w-1/2 pr-4 align-top">{title}</td>
	<td class="py-1 w-1/2 pl-4">
		{#if credit instanceof Array}
			{#each credit as c}
				{c}<br />
			{/each}
		{:else}
			{credit}
		{/if}
	</td>
</tr>
