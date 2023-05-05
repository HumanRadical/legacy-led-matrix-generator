const express = require('express');
const path = require('path')
const compression = require('compression')
const port = process.env.PORT || 5173

const root = `${__dirname}/views`

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'))
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

startServer()

async function startServer() {
  const app = express()

  app.use(compression())

  const vite = require('vite')
  const viteDevMiddleware = (
      await vite.createServer({
      root,
      server: { middlewareMode: true }
      })
  ).middlewares
  app.use(viteDevMiddleware)

  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

app.get('/', (req, res) => {
    res.redirect('/main')
})
app.get('/main', (req, res) => {
    res.render('index')
})

app.get('/draw', (req, res) => {
    res.render('draw')
})
// ViteExpress.listen(app, 5173, () => console.log("Server is listening..."));