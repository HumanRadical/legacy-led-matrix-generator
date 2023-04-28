const express = require('express');
const path = require('path')
// const ViteExpress = require('vite-express');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.redirect('/main')
})
app.get('/main', (req, res) => {
    res.render('index')
})

app.get('/draw', (req, res) => {
    res.render('draw')
})

app.listen(5173, () => {
    console.log('Listening on port 5173')
})
// ViteExpress.listen(app, 5173, () => console.log("Server is listening..."));