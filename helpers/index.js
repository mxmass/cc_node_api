const axios = require('axios');
const fs = require('fs');

async function saveBinaryFile(uri, filename) {
  const dest = filename;
  return await axios.get(uri)
    .then(res => {
      const buffer = Buffer.from(res.data, 'binary');
      fs.writeFileSync(dest, buffer);
      return fs.readFileSync(dest, 'base64');
    })
    .catch(err => {
      return err;
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
  saveBinaryFile,
  storeJsonData,
  getNumber
}
