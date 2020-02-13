const express = require('express');
const Posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMsg: "Can't retrieve Posts"
      });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.findById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMsg: 'Error retrieving post' });
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMsg: 'Error deleting post' });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMsg: 'Error updating post' });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params.id;

  Posts.getById(id).then(post => {
    if (!post) {
      res.status(404).json({ errorMsg: 'Not a valid post ID' });
    }
  });

  next();
}

module.exports = router;
