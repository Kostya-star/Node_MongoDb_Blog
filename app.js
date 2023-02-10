const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


const app = express()

const mongoDB = 'mongodb+srv://BlogUser:deefterAdi2022@blog.w1zgknw.mongodb.net/blogs?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB).then(() => app.listen(3000)).catch((error) => console.log(error))

app.set('view engine', 'ejs')

app.use(express.static('public'))



app.get('/', (req, res) => {
  // const blogs = [
  //   { title: 'The title of the blog', snippet: 'The description ot the text of the blog call it whatever u want' },
  //   { title: 'The title of the blog', snippet: 'The description ot the text of the blog call it whatever u want' },
  //   { title: 'The title of the blog', snippet: 'The description ot the text of the blog call it whatever u want' },
  // ]
  // res.render('index', { title: 'Home', blogs })
  res.redirect('/blogs')
})

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.render('index', { title: 'All blogs', blogs })
    // res.send(resp)
  } catch (error) {
    console.log(error);
  }
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' })
})

app.use((req, res) => {
  res.status(404).render('404', { title: 'Error' })
})