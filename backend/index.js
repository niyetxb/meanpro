const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Backend работает!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
