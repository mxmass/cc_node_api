const fs = require('fs');
const rimraf = require('rimraf');
const helper = require('../helpers/index.js');
const middlewares = require('../helpers/middlewares.js');

const json_store = './test/json';

describe('Testing simple functions', () => {
    describe('#getNumber()', () => {
      before(() => {
  			rimraf(json_store + '/*', () => { console.log( 'Json store wiped' ) } );
  		})
      it('should return 0 than 1', () => {
        let num = helper.getNumber(json_store);
        num.should.be.eql(0)
        fs.writeFileSync( json_store + '/file.txt', 'Lorem ipsum ...' );
        num = helper.getNumber(json_store);
        num.should.be.eql(1)
      })
      after(() => {
  			rimraf(json_store + '/*', () => { console.log( 'Json store wiped' ) } );
  		})
    })


});
