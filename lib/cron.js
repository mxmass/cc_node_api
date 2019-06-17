const fs = require('fs');
const cron = require("node-cron");
const helper = require("../helpers/index.js");

const source_api_uri = 'https://reqres.in/api/users?page=';
const json_store = './data/cron';

cron.schedule("* * * * *", () => {
  let page = helper.getNumber(json_store)+1;
  let filename =  json_store + '/' + page + '.json';

  helper.storeJsonData(source_api_uri + page, filename)
});
