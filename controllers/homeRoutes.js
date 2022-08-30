const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// VIEW ALL BLOGS ON THE HOMEPAGE
router.get('/', async (req, res) => {
  try {

    const blogData = await Blog.findAll({
      include: [
        {
          model: User, 
          attributes: ['name'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// FIND A BLOG WITH COMMENTS
router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User, 
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('comment', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// MAKE A COMMENT
router.post('/comments/:blog_id', async (req, res) => {

  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blog_id: req.params.blog_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err.message);
  }
  });

// Signup
router.get('/signup', (req, res) => {

  res.render('signup');
});

// Login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;