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

async function saveFile(filename, id, req, res) {
  await axios.get(filename)
    .then(res => {
      const buffer = Buffer.from(res.data, null);
      fs.writeFileSync('../data/' + id +'.jpg', buffer);
    })
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
}

async function storeJsonData (uri, storage) {
  await axios.get(uri)
    .then(response => {
      try {
        const jsn = response.data;
        fs.writeFileSync(storage, JSON.stringify(jsn));
      }
      catch(err) {
        console.error(err);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function getNumber(path) {
  return fs.readdirSync(path).length
}

module.exports = {
  mustBeInArray,
  saveFile,
  storeJsonData,
  getNumber
}
