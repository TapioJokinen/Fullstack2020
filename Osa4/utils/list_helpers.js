const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0

    blogs.forEach(blog => {
        likes += blog.likes
    });

    return likes
}

const favoriteBlog = (blogs) => {

    let maxLikes = 0
    let bestBlog = {}

    blogs.forEach(blog => {
        console.log(blog)
        if (blog.likes >= maxLikes) {
            maxLikes = blog.likes
            bestBlog = blog
        }
    })

    return bestBlog.likes
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}