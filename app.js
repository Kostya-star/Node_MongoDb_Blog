const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'public')

app.listen(3000)

app.get('/', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
  res.sendFile('./public/about.html', { root: __dirname })
})

app.get('/about-me', (req, res) => {
  res.redirect('/about')
})

app.use((req, res) => {
  res.status(404).sendFile('./public/404.html', { root: __dirname })
})