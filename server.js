const express = require('express');
const path = require('path')
const compression = require('compression')
const port = process.env.PORT || 5173
const root = __dirname

startServer()

async function startServer() {
  const app = express()

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(compression())

  const vite = require('vite')
  const viteDevMiddleware = (
      await vite.createServer({
      root,
      server: { middlewareMode: true }
      })
  ).middlewares
  app.use(viteDevMiddleware)

  //Need to figure out how to get this bit working
  // ========================================
  app.get('/', (req, res) => {
      res.redirect('/main')
  })
  app.get('/main', (req, res) => {
      res.render('index')
  })

  app.get('/draw', (req, res) => {
    console.log('rendered draw')
      res.render('draw')
  })
  // ========================================


  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}