const router = require('express').Router();
const { Blog, User } = require('../../models');


// LOGIN TO DASHBOARD
  router.get('/', async (req, res) => {
  
    if (!req.session.logged_in) {
            res.redirect('/login');
            return;
          }
          // 
        try {
          const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
          });
      
          const user = userData.get({ plain: true });
      
          res.render('dashboard', {
            ...user,
            logged_in: true
          });
        } catch (err) {
          res.status(500).json(err);
        }
});
// VIEW A BLOG IN DASHBOARD
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DISPLAY CREATE NEW BLOG PAGE
router.get('/new', (req, res) => {
  
  res.render('newBlog', {
    logged_in: req.session.logged_in
  })
});

// CREATE NEW BLOG
  router.post('/new', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE BLOG
router.put('/:id', async (req, res) => {
  try {
    res.status(200).json(await Blog.update(req.body, {
    where: {
      id: req.params.id,
    }
    }));

  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// DELETE BLOG
  router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;