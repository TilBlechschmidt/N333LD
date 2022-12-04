<script>
	import { fly, fade } from 'svelte/transition';
	import ToolButton from '$lib/ToolButton.svelte';
	import MdVisibility from 'svelte-icons/md/MdVisibility.svelte';
	import MdFlightTakeoff from 'svelte-icons/md/MdFlightTakeoff.svelte';
	import MdHeadsetMic from 'svelte-icons/md/MdHeadsetMic.svelte';
	import MdPerson from 'svelte-icons/md/MdPerson.svelte';
	import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import CrashScreen from '$lib/CrashScreen.svelte';

	let sos;
	let video;

	let paused;
	let time = 0;
	let crashText = '';
	let focusedOption = false;

	$: showOptions = time > 26.5 && time < 51 && focusedOption != 2 && focusedOption != 3;
	$: showFailure = time > 57;

	function reset() {
		time = 5;
		crashText = '';
		focusedOption = false;
		sos.pause();
		sos.currentTime = 0;
	}

	function shake() {
		focusedOption = 1;
		crashText = 'You tried your best, but the pilot did not wake up in time ...';
	}

	function callForHelp() {
		focusedOption = 4;
		crashText =
			'You fiddled with the headset and tried calling for help but received no answer in time ...';
		sos.volume = 0.25;
		sos.play();
	}

	function changeVideo(option, target) {
		focusedOption = option;
		let value = 1.0;
		const interval = setInterval(() => {
			video.style.opacity = value;
			video.volume = value;
			value -= 0.01;
			if (value <= 0) {
				clearInterval(interval);
				goto(target);
			}
		}, 10);
	}

	$: if (time > 55) {
		sos.pause();
	}
</script>

<div class="absolute top-0 left-0 h-full w-full bg-black -z-10">
	<audio src="/audio/sos.mp3" type="audio/mpeg" bind:this={sos} loop volume="0.25" />
	<video
		class="w-full h-full"
		src="/video/descent.mp4"
		bind:paused
		bind:currentTime={time}
		bind:this={video}
		autoplay
	/>
</div>

{#if paused}
	<div
		in:fade={{ delay: 1000, duration: 2000 }}
		out:fade
		class="absolute top-0 left-0 h-full w-full  bg-black  flex flex-col items-center justify-center text-white b612"
	>
		<div class="text-3xl mb-8">Please turn up your volume 🔊</div>
		<button
			class="p-3 border rounded"
			on:click={() => {
				paused = false;
			}}
		>
			I am ready!
		</button>
	</div>
{/if}

{#if showOptions}
	<div
		class="absolute bottom-8 left-0 w-full flex justify-center"
		in:fly={{ y: 200, duration: 500, delay: 500 }}
		out:fly={{ y: 200, duration: 500 }}
	>
		<div class="card p-8 pt-4">
			<div class="w-full text-center mb-4 text-xl">What do you do?</div>
			<div class="flex justify-evenly space-x-4">
				<ToolButton
					on:click={shake}
					title={focusedOption && focusedOption == 1 ? 'Shaking' : 'Shake'}
					subtitle="the pilot"
					disabled={focusedOption && focusedOption != 1}
				>
					<div class:shake={focusedOption && focusedOption == 1}><MdPerson /></div>
				</ToolButton>

				<ToolButton
					title="Pull strongly"
					subtitle="on the controls"
					on:click={() => changeVideo(2, '/story/overstress')}
					disabled={focusedOption && focusedOption != 2}
				>
					<MdFlightTakeoff />
				</ToolButton>

				<ToolButton
					title="Get a feeling"
					subtitle="for the controls"
					on:click={() => changeVideo(3, '/story/recovery')}
					disabled={focusedOption && focusedOption != 3}
				>
					<MdVisibility />
				</ToolButton>

				<ToolButton
					on:click={callForHelp}
					title={focusedOption && focusedOption == 4 ? 'Calling' : 'Call'}
					subtitle="for help"
					disabled={focusedOption && focusedOption != 4}
				>
					{#if focusedOption && focusedOption == 4}
						<div class="lds-ripple">
							<div />
							<div />
						</div>
					{:else}
						<MdHeadsetMic />
					{/if}
				</ToolButton>
			</div>
		</div>
	</div>
{/if}

{#if showFailure}
	<CrashScreen text={crashText} on:click={reset} />
{/if}
