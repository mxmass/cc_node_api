require('dotenv').config()

const express = require('express'),
      consign = require('consign'),
      app = express();

consign()
  .include("lib/middleware.js")
  .then("lib/server.js")
  .into(app);

module.exports = app;
