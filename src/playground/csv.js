const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('../../static/objectives.csv')
        .pipe(csv())
        .on('data', (row) => {
            console.log(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });