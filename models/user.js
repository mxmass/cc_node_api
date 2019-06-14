const axios = require('axios');
const helper = require('../helpers');
const api_uri = 'https://reqres.in/api/users/';

async function getRecord(id) {
  await axios.get(api_uri + id)
    .then(response => {
      try {
        res.json(response.data.data);
      }
      catch(err) {
        console.error(err);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

module.exports = {
  getRecord
}
