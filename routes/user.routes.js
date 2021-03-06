const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const helper = require('../helpers');
const m = require('../helpers/middlewares');

const source_api_uri = 'https://reqres.in/api/users/';
const images_store = './data/images/';

router.get('/:id', m.mustBeInteger, async (req, res) => {
  const id = req.params.id

  await axios.get(source_api_uri + id)
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

  await axios.get(source_api_uri + id)
    .then((response) => {
      const dest = images_store + id + '.jpg';
      let imageAsBase64 = '';

      if (fs.existsSync(dest)) {
        imageAsBase64 = fs.readFileSync(dest, 'base64');
        res.end(imageAsBase64);
      } else {
        const avatar = response.data.data.avatar;
        (async () => {
          imageAsBase64 = await helper.saveBinaryFile(avatar, dest);
          res.end(imageAsBase64);
        })();
      }
    })
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
})

router.delete('/:id/avatar', m.mustBeInteger, async (req, res) => {
  const filename = images_store + req.params.id + '.jpg';

  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
    res.json( { status: 200, message: 'done' } )
  } else {
    res.json( { status: 400, message: 'nothing to delete' } );
  }
})

module.exports = router
