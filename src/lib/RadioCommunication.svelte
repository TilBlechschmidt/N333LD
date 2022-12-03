<script>
	import { fade, fly } from 'svelte/transition';

	// @00:02.000
	// H: Traffic N333LD come in!

	// @00:05.955
	// C: Airband, 333LD, Fort Pierce Tower?

	// @00:09.365
	// H: I have got a serious situation here my pilot has gone ... incoherent, I have no idea how to fly the airplane but I am maintaining ninety-one-hundred.

	// @00:20.287
	// C: N333LD, roger, what is your position?

	// @00:24.330
	// H: I have no idea, I see the coast of Florida in front of me and ... I have no idea.

	// @00:30.334
	// C: N333LD, do you know how to operate the transponder, can you squawk 7700?

	// @00:38.320
	// H: Standby, let me see.

	const FLY_DIST = 20;
	const HARRISON = 1;
	const TOWER = 2;

	let time = 0;
	let speaker = 0;
	let harrisonText = '';
	let towerText = '';

	function updateQuote(time) {
		if (time < 2) {
			speaker = 0;
		} else if (time < 5.955) {
			harrisonText = 'Traffic N333LD come in!';
			speaker = HARRISON;
		} else if (time < 9.365) {
			towerText = 'Airband, 333LD, KFPR TWR';
			speaker = TOWER;
		} else if (time < 20.287) {
			harrisonText =
				'I have got a serious situation here my pilot has gone ... incoherent, I have no idea how to fly the airplane but I am maintaining ninety-one-hundred';
			speaker = HARRISON;
		} else if (time < 24.33) {
			towerText = 'N333LD, roger, what is your position?';
			speaker = TOWER;
		} else if (time < 30.334) {
			harrisonText =
				'I have no idea, I see the coast of Florida in front of me and ... I have no idea';
			speaker = HARRISON;
		} else if (time < 38.32) {
			towerText = 'N333LD, do you know how to operate the transponder, can you squawk 7700?';
			speaker = TOWER;
		} else {
			harrisonText = 'Standby, let me see';
			speaker = HARRISON;
		}
	}

	$: updateQuote(time);
</script>

<div class="my-4 relative w-full h-48 bg-gray-100 rounded-xl text-justify">
	{#if speaker == 1}
		<div
			class="px-8 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
			in:fly={{ y: FLY_DIST, delay: 250 }}
			out:fly={{ y: -FLY_DIST }}
		>
			<div class="text-blue-500 text-base">Harrison</div>
			<div class="b612-mono mb-2">
				{harrisonText}
			</div>
		</div>
	{/if}

	{#if speaker == 2}
		<div
			class="px-8 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
			in:fly={{ y: FLY_DIST, delay: 250 }}
			out:fly={{ y: -FLY_DIST }}
		>
			<div class="text-orange-500 text-base">KFPR</div>
			<div class="b612-mono">
				{towerText}
			</div>
		</div>
	{/if}
</div>

<audio src="/audio/mayday.mp3" type="audio/mpeg" controls class="w-full" bind:currentTime={time} />
