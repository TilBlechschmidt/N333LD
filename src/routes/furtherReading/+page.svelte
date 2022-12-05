<script>
	import { fade } from 'svelte/transition';
	import Map from '$lib/map/Map.svelte';
	import FlightRoute from '$lib/map/layer/FlightRoute2.svelte';
	import Focus from '$lib/map/Focus.svelte';
	import LogoFR24 from '$lib/LogoFR24.svelte';
</script>

<div>
	<div class="max-w-xl w-full mx-auto my-32">
		<div class="relative overflow-hidden">
			<video
				autoplay
				muted
				loop
				class="absolute top-0 left-0 w-full h-full object-cover"
				src="/video/credit-bg.mp4"
			/>
			<div class="mix-blend-screen text-black text-center bg-white">
				<h2 class="text-6xl">The flight of</h2>
				<h1 class="text-8xl">N333LD</h1>
			</div>
		</div>

		<hr class="my-8" />

		<h3 class="text-3xl text-center text-gray-500">Further Reading</h3>
	</div>

	<div class="grid grid-cols-2 gap-16 justify-around max-w-7xl mx-auto justify-items-center">
		<div>
			<div class="text-center text-xl mb-4">Original flight track</div>
			<div class="source h-full overflow-hidden hide-mapbox-stuff relative" style="height: 200px;">
				<Map>
					<Focus
						transform={{
							zoom: 6.648697205572945,
							center: {
								lat: 26.693814274214617,
								lng: -78.73919156151649
							}
						}}
					/>
					<FlightRoute hideMarker />
				</Map>
				<div class="absolute top-0 left-0 w-full h-full backdrop-blur opacity-75" />
				<div
					class="absolute top-0 left-0 w-full h-full flex items-center justify-evenly text-white text-lg"
				>
					<a
						href="https://www.flightradar24.com/data/aircraft/n333ld"
						target="_blank"
						rel="noreferrer"
						class="w-48"
					>
						<LogoFR24 />
					</a>
					<div class="h-8 w-px bg-white" />
					<a
						href="https://flightaware.com/live/flight/N333LD/history/20220510/1515Z/MYAM/KPBI/tracklog"
						target="_blank"
						rel="noreferrer"
					>
						<img src="/flightaware.png" alt="FlightAware logo" class="w-48" />
					</a>
				</div>
			</div>
		</div>
		<div>
			<div class="text-center text-xl">Original radio recordings</div>
			<div class="h-full flex flex-col justify-evenly">
				<div>
					<div class="source">
						<audio src="/audio/full-conversation.mp3" controls class="w-full" />
					</div>
					<div class="text-gray-500 text-center w-full text-sm mt-2">
						<a href="https://archive.liveatc.net/ht/kpbi-kfpr.mp3" target="_blank" rel="noreferrer">
							Mayday call — LiveATC.net
						</a>
					</div>
				</div>

				<div>
					<div class="source">
						<audio src="/audio/chatter.mp3" controls class="w-full" />
					</div>
					<div class="text-gray-500 text-center w-full text-sm mt-2">
						<a
							href="https://archive.liveatc.net/ht/kpbi-passenger-lands.mp3"
							target="_blank"
							rel="noreferrer"
						>
							Commercial pilot exchange — LiveATC.net
						</a>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="text-center text-xl mb-4">Excellent event summary</div>
			<div class="source">
				<iframe
					class="rounded-lg"
					width="560"
					height="315"
					src="https://www.youtube-nocookie.com/embed/c-W2cnnLSTM"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div>
		</div>
		<div>
			<div class="text-center text-xl mb-4">Radio communication supercut</div>
			<div class="source">
				<iframe
					class="rounded-lg"
					width="560"
					height="315"
					src="https://www.youtube-nocookie.com/embed/8MDwzNtDMlA"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div>
		</div>
		<div>
			<div class="text-center text-xl mb-4">Landing video (Front)</div>
			<div class="tweet">
				<blockquote class="twitter-tweet" data-dnt="true">
					<p lang="en" dir="ltr">
						🛬 &quot;I&#39;ve got a serious situation here,&quot; the passenger said from the
						cockpit. &quot;My pilot&#39;s gone incoherent. I have no idea how to fly the
						airplane...&quot; Watch the landing at PBIA after the traffic controller then guided the
						passenger to a safety. <a href="https://t.co/gLxS88axix">https://t.co/gLxS88axix</a>
						<a href="https://t.co/Y2UA6QQC4e">pic.twitter.com/Y2UA6QQC4e</a>
					</p>
					&mdash; WPBF 25 News (@WPBF25News)<a
						href="https://twitter.com/WPBF25News/status/1524115625144168450?ref_src=twsrc%5Etfw"
						>May 10, 2022</a
					>
				</blockquote>
				<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
			</div>
		</div>
		<div>
			<div class="text-center text-xl mb-4">Landing video (Side)</div>
			<div class="tweet">
				<blockquote class="twitter-tweet w-full" data-dnt="true">
					<p lang="en" dir="ltr">
						This is brand new video (courtesy of Jeff Chandler) of a passenger landing a plane today
						at PBIA.<br /><br />His pilot had passed out, and the passenger with zero flight
						experience was forced to land the plane.<br /><br />Team coverage of this amazing
						landing is on
						<a href="https://twitter.com/WPBF25News?ref_src=twsrc%5Etfw">@WPBF25News</a>
						at 11.
						<a href="https://t.co/jFLIlTp6Zs">pic.twitter.com/jFLIlTp6Zs</a>
					</p>
					&mdash; Ari Hait (@wpbf_ari)<a
						href="https://twitter.com/wpbf_ari/status/1524221187009781766?ref_src=twsrc%5Etfw"
						>May 11, 2022</a
					>
				</blockquote>
				<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
			</div>
		</div>

		<div class="col-span-2 w-full">
			<div class="p-8 text-sm text-gray-500 text-center">
				For <em>bug reports &amp; page sources</em> please visit
				<a
					href="https://github.com/TilBlechschmidt/N333LD"
					target="_blank"
					rel="noopener noreferrer"
					><code>GitHub</code>
				</a>.
				<div class="lg:my-2 my-6" />
				For<em>questions &amp; inquiries</em> contact
				<a
					href="mailto:til@blechschmidt.dev?subject=N333LD Inquiry"
					target="_blank"
					rel="noopener noreferrer"
					><code>til@blechschmidt.dev</code>
				</a>.
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.source {
		@apply rounded-xl drop-shadow shadow-xl bg-white;
		width: 560px;
	}

	.tweet {
		@apply w-full rounded-xl shadow-xl overflow-hidden;
		width: 420px;
	}
</style>
