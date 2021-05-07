const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment') 

// Show Articles
router.get('/blogs', async(req,res)=>{
    const blog = await Blog.find({})
    res.render('blog/index',{blog});
});

// Add Articles
router.get('/blogs/new', (req,res)=>{
    res.render('blog/new')
});

// Redirect to '/blogs' after adding new article
router.post('/blogs', async(req,res)=>{
    const {title, img, author, article} = req.body;
    await Blog.create({title, img, author, article});
    res.redirect('/blogs');
});

// Show Blogs using ID
router.get('/blogs/:id', async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('comment');;
   
    res.render('blog/show',{blog})
})

router.get('/blogs/:id/edit', async(req,res)=>{
    const blog = await Blog.findById(req.params.id)

    res.render('blog/edit',{blog});
})

router.patch('/blogs/:id', async(req,res)=>{
    const blog = await Blog.findByIdAndUpdate(req.params.id,req.body)

    res.redirect(`/blogs/${req.params.id}`);
});

// Delete Article
router.delete('/blogs/:id', async(req,res)=>{

    console.log(req.params.id);
    await Blog.findByIdAndDelete(req.params.id)

    res.redirect('/blogs');

});

router.post('/blogs/:id/comment', async(req,res)=>{
    const blog = await Blog.findById(req.params.id);
    const comment = new Comment(req.body);
   
    blog.comment.push(comment);

   
    await comment.save();
    await blog.save();
   
    console.log(comment);

    res.redirect(`/blogs/${req.params.id}`);
})


module.exports = router;
