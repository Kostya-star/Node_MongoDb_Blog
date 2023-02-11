const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

const mongoDB = 'mongodb+srv://BlogUser:deefterAdi2022@blog.w1zgknw.mongodb.net/blogs?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB).then(() => app.listen(3000)).catch((error) => console.log(error))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.use('/blogs', blogRoutes)

app.use((req, res) => {
  res.status(404).render('404', { title: 'Error' })
})