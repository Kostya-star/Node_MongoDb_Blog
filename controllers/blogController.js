const blog_index = async () => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.render('index', { title: 'All blogs', blogs })
  } catch (error) {
    console.log(error);
  }
}