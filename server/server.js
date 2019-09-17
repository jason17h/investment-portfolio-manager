const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.enable('trust proxy');

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
    console.log(`req.ip => ${req.ip}`)
});

app.listen(port, () => {
    console.log(`Server is up! Port is ${port}.`);
});