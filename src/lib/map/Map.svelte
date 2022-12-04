<script>
	import { Map } from '@beyonk/svelte-mapbox';
</script>

<!-- Use bounds instead of center + zoom -->
<Map
	accessToken="pk.eyJ1IjoidGlsYmxlY2hzY2htaWR0IiwiYSI6ImNqczYxZXplZjA3bnM0M3A5djB1cDl3azUifQ.MEU9Fe4JHD1_3U1BLNJWbg"
	style="mapbox://styles/tilblechschmidt/ckraoako74wms18mx5xv38zea/draft"
	center={[-78.0127055189574, 26.403938345917567]}
	zoom={7.4}
	options={{
		customAttribution: ['Til Blechschmidt', 'FlightRadar24', 'FAA']
		interactive: false,
		keyboard: false
	}}
>
	<slot />
</Map>
