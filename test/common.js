//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
global.chai = require('chai');
let chaiHttp = require('chai-http');
global.server = require('../main.js');
chai.should();
chai.use(chaiHttp);
// chai.use(require('chai-like'));
// chai.use(require('chai-things'));
