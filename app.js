const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


const app = express()

const mongoDB = 'mongodb+srv://BlogUser:deefterAdi2022@blog.w1zgknw.mongodb.net/blogs?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB).then(() => app.listen(3000)).catch((error) => console.log(error))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const ObjectId = mongoose.Types.ObjectId;

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.render('index', { title: 'All blogs', blogs })
  } catch (error) {
    console.log(error);
  }
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' })
})

app.get('/blogs/:id', async (req, res) => {
  const blogId = req.params.id
  
  try {
    const blog = await Blog.findById(blogId)
    res.render('details', { title: 'Blog details', blog })
  } catch (error) {
    console.log(error);
  }
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})


app.post('/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()
    res.redirect('/blogs')
  } catch (error) {
    console.log(error);
  }
})

app.use((req, res) => {
  res.status(404).render('404', { title: 'Error' })
})