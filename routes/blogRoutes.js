const express = require('express')
const Blog = require('../models/blog')

const router = express.Router()

router.get('/', (req, res) => {
})

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create' })
})

router.delete('/:id', (req, res) => {
  const blogId = req.params.id

  try {
    Blog.findByIdAndDelete(blogId).then(() => {
      res.json({ redirect: '/blogs' })
    })
  } catch (error) {
    console.log(error);
  }
})

router.get('/:id', async (req, res) => {
  const blogId = req.params.id

  try {
    const blog = await Blog.findById(blogId)
    res.render('details', { title: 'Blog details', blog })
  } catch (error) {
    console.log(error);
  }
})

router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()
    res.redirect('/blogs')
  } catch (error) {
    console.log(error);
  }
})

module.exports = router