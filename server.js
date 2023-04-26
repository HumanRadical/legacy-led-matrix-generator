const express = require("express");
const ViteExpress = require("vite-express");

const app = express();

console.log(__dirname)

app.get('/main', (req, res) => {
    res.sendFile(__dirname + 'index.html')
})

app.get("/draw", (req, res) => {
    res.sendFile(__dirname + '/draw-mode/draw.html');
});

ViteExpress.listen(app, 5173, () => console.log("Server is listening..."));