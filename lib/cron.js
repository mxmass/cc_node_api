const fs = require('fs');
const cron = require("node-cron");
const helper = require("../helpers/index.js");

const uri = 'https://reqres.in/api/users?page=';
const dir = './data/cron';

cron.schedule("* * * * *", () => {
  let page = helper.getNumber(dir)+1;
  let filename =  dir + '/' + page + '.json';

  helper.storeJsonData(uri + page, filename)
});
