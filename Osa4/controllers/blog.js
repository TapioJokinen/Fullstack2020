const blogRouter = require('express').Router()
const Blog = require("../models/Blog")

blogRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogRouter