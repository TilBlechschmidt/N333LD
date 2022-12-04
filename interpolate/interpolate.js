const turf = require('@turf/turf');
const fs = require('fs');

const defaultOptions = {
    altitudeInMeters: true,
    flipLatLng: true,
    deriveSpeed: true,
    deriveBearing: true,
};

function convert(input, options) {
    options = Object.assign(defaultOptions, options);
    console.log("Using options:", options);

    const coordinates = input.map(entry => {
        entry.time = Date.parse(entry.time);

        if (options.altitudeInMeters) {
            // m -> ft (adjusted for QNH)
            entry.alt = entry.alt * 3.28084;
        }

        if (options.flipLatLng) {
            // The input data has lat and lng flipped :facepalm:
            const { lat, lng } = entry;
            entry.lat = lng;
            entry.lng = lat;
        }

        return entry;
    });

    let previous = null;

    if (options.deriveSpeed) {
        // Calculate the speed
        for (let entry of coordinates) {
            if (previous != null) {
                const line = turf.lineString([[previous.lng, previous.lat], [entry.lng, entry.lat]]);
                const length = turf.length(line);
                const timeDeltaMs = entry.time - previous.time;
                const kmh = length / (timeDeltaMs / 1000 / 60 / 60);
                const knots = kmh * 0.5399568;
                entry.speed = knots;
            }

            previous = entry;
        }
    }

    // Interpolate intermediate values so we have all 1sec apart
    let interpolated = [];
    previous = null;
    for (let entry of coordinates) {
        if (previous != null) {
            if (options.deriveBearing) {
                const bearing = turf.bearing([previous.lng, previous.lat], [entry.lng, entry.lat]);
                previous.bearing = bearing;
            }

            const line = turf.lineString([[previous.lng, previous.lat], [entry.lng, entry.lat]]);
            const length = turf.length(line);
            previous.length = length;

            const timeDeltaMs = entry.time - previous.time;
            const segmentCount = timeDeltaMs / 1000;

            let iterationPrevious = previous;
            for (let i = 1; i < segmentCount; i++) {
                const fraction = i / segmentCount;

                const targetBearing = turf.bearing([iterationPrevious.lng, iterationPrevious.lat], [entry.lng, entry.lat]);
                const bearing = options.deriveBearing
                    ? targetBearing
                    : lerp_bearing(previous.bearing, entry.bearing, fraction);

                // Ignorant straight-line interpolation
                // const [lng, lat] = turf.along(line, fraction * length).geometry.coordinates;

                // ADS-B bearing based interpolation
                const interpolationBearing = lerp_bearing(previous.bearing, targetBearing, fraction);
                const [lng, lat] = turf.destination([iterationPrevious.lng, iterationPrevious.lat], length / segmentCount, interpolationBearing).geometry.coordinates;

                const newPoint = {
                    lng,
                    lat,
                    time: lerp(previous.time, entry.time, fraction),
                    alt: lerp(previous.alt, entry.alt, fraction),
                    speed: lerp(previous.speed, entry.speed, fraction),
                    bearing
                };

                interpolated.push(newPoint);
                iterationPrevious = newPoint;
            }
        }

        previous = entry;
        interpolated.push(entry);
    }

    return interpolated;
}

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

function lerp_bearing(src, dst, t) {
    const distance = Math.max(src, dst) - Math.min(src, dst);

    if (distance > 180.0) {
        if (src < dst) {
            return lerp(src + 360.0, dst, t) % 360.0;
        } else {
            return lerp(src, dst + 360.0, t) % 360.0;
        }
    } else {
        return lerp(src, dst, t);
    }
}

const interpolated_fa = convert(require('./input_fa.json'));
const interpolated_fr24 = convert(require('./input_fr24.json'), {
    altitudeInMeters: false,
    flipLatLng: true,
    deriveSpeed: false,
    deriveBearing: false,
});

fs.writeFileSync('./output_fa.json', JSON.stringify(interpolated_fa, null, 4), 'utf8');
fs.writeFileSync('./output_fr24.json', JSON.stringify(interpolated_fr24, null, 4), 'utf8');
