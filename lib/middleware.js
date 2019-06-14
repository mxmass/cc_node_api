module.exports = app => {
  const express = require('express'),
        morgan = require('morgan');

  app.use(morgan('dev'));
  app.use(express.static('.'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.set('json spaces', 2);
  app.use(require('../routes/index'));
}
