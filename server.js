const express = require('express');
const app = express();
const port = process.env.PORT || 3001;


app.get("/", (req, res) => {
    // read query parameters
    const symbol = req.query["symbol"];
    const range = req.query["range"];

    // craft IEX API URL
    const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbol}&types=quote,chart&range=${range}`;

    // make request to IEX API and forward response
    request(url).pipe(res);
});

app.listen(port, () => console.log(`http://localhost:${port}`));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
});

