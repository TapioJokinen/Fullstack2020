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
        if (blog.likes >= maxLikes) {
            maxLikes = blog.likes
            bestBlog = blog
        }
    })

    return bestBlog
}

const mostBlogs = (blogs) => {

    const authors = blogs.map(blog => blog.author)

    let counts = authors.reduce((a, c) => {
        a[c] = (a[c] || 0) + 1;
        return a;
      }, {});
      let maxCount = Math.max(...Object.values(counts));
      let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);
    
      return {
          author: mostFrequent,
          blogs: maxCount
      }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}