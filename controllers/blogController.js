const Blog = require('../models/blog')

const blog_index = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.render('blogs/index', { title: 'All blogs', blogs })
  } catch (error) {
    console.log(error);
  }
}

const blog_create = async (req, res) => {
  res.render('blogs/create', { title: 'Create' })
}

const blog_create_post = async (req, res) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()
    res.redirect('/blogs')
  } catch (error) {
    console.log(error);
  }
}

const blog_delete = async (req, res) => {
  const blogId = req.params.id
  
  try {
    Blog.findByIdAndDelete(blogId).then(() => {
      res.json({ redirect: '/blogs' })
    })
  } catch (error) {
    console.log(error);
  }
}

const blog_details_get = async (req, res) => {
  const blogId = req.params.id

  try {
    const blog = await Blog.findById(blogId)
    res.render('blogs/details', { title: 'Blog details', blog })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  blog_index,
  blog_create,
  blog_delete,
  blog_details_get,
  blog_create_post
}