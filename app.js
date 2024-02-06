// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Post model
const Post = mongoose.model('Post', {
  title: String,
  content: String
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index.ejs', { posts });
});

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post.ejs', { post });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
