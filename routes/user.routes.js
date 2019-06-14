const express = require('express');
const router = express.Router();
const axios = require('axios');
// const user = require('../models/user');
const helper = require('../helpers');
const m = require('../helpers/middlewares');

const api_uri = 'https://reqres.in/api/users/';

router.get('/:id', m.mustBeInteger, async (req, res) => {
  const id = req.params.id

  await axios.get(api_uri + id)
  .then((response) =>
    res.json(response.data.data)
  )
  .catch(err => {
    if (err.status) {
      res.status(err.status).json({ message: err.message })
    } else {
      res.status(500).json({ message: err.message })
    }
  })
})

router.get('/:id/avatar', m.mustBeInteger, async (req, res) => {
  const id = req.params.id

  await axios.get(api_uri + id)
    .then((response) => {
      helper.saveFile(response.data.data.avatar);
    })
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
})

module.exports = router
