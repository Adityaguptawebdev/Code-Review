const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const aiRoutes = require('./routes/ai.routes'); // ✅ Correct file name

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/ai', aiRoutes); // now this works: GET /ai/get-response?prompt=hello

module.exports = app;
