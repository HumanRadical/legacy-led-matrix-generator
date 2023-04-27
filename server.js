const express = require("express");
const ViteExpress = require("vite-express");

const app = express();

console.log(__dirname)

app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/main.js', (req, res) => {
    res.sendFile(__dirname + '/main.js')
})
app.get('/img/error_icon.svg', (req, res) => {
    res.sendFile(__dirname + '/img/error_icon.svg')
})
app.get('/src/sanitizeColorArrayIntoHex.js', (req, res) => {
    res.sendFile(__dirname + '/src/sanitizeColorArrayIntoHex.js')
})

app.get("/draw", (req, res) => {
    res.sendFile(__dirname + '/draw-mode/draw.html');
});
app.get('/draw.js', (req, res) => {
    res.sendFile(__dirname + '/draw-mode/draw.js')
})

app.get('/app.css', (req, res) => {
    res.sendFile(__dirname + '/app.css')
})


// app.listen(5173, () => {
//     console.log('Listening on port 5173')
// })
ViteExpress.listen(app, 5173, () => console.log("Server is listening..."));