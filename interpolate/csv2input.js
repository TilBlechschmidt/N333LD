const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('../N333LD-2bcde5e0.csv')
    .pipe(csv())
    .on('data', (data) => results.push(processRow(data)))
    .on('end', () => {
        processRows(results);
    });

function processRow(row) {
    const [lng, lat] = row.Position.split(',');
    return {
        time: row.UTC,
        alt: parseInt(row.Altitude),
        speed: parseInt(row.Speed),
        bearing: parseInt(row.Direction),
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    };
}

function processRows(rows) {
    fs.writeFileSync('./input_fr24.json', JSON.stringify(rows, null, 4), 'utf8');
}