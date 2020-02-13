const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMsg: 'Error adding user' });
    });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  const info = { ...req.body, id: req.params.id };

  Posts.insert(info)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMsg: 'Error posting' });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ errorMsg: "Can't find users" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMsg: "Can't get users" });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ errorMsg: "Can't find users" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMsg: "Can't get users" });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMsg: 'Error retrieving user post'
      });
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(ting => {
      res.status(200).json(ting);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMsg: 'Error deleting user' });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
  const updateUser = req.body;
  const id = req.params.id;

  if (updateUser.name || updateUser.bio) {
    Users.update(id, updateUser)
      .then(update => {
        res.status(200).json(update);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMsg: 'Error deleting user' });
      });
  }
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;

  Users.getById(id).then(user => {
    if (!user) {
      res.status(404).json({ errorMsg: "Can't find user with that ID" });
    }
  });
  next();
}

function validateUser(req, res, next) {
  // do your magic!
  const content = req.body;

  if (content === null) {
    res.status(400).json({ errorMsg: 'Missing user content' });
  }

  next();
}

function validatePost(req, res, next) {
  // do your magic!
  const content = req.body;

  if (content === null) {
    res.status(400).json({ errorMsg: 'Missing post content ' });
  }
  next();
}

module.exports = router;
