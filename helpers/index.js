const axios = require('axios');
const fs = require('fs');

function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
    const row = array.find(r => r.id == id)
    if (!row) {
      reject({
        message: 'ID is not good',
        status: 404
      })
    }
    resolve(row)
  })
}

async function saveFile(filename) {
  const options = {
    url: filename,
    encoding: null
  };

  await axios.get(options)
    .then(function (res) {
      const buffer = Buffer.from(res, 'utf8');
      fs.writeFileSync('../data', buffer);
    })
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
}

module.exports = {
  mustBeInArray,
  saveFile
}
