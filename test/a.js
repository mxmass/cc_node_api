const fs = require('fs');
const rimraf = require('rimraf');
const images_dir = './data/images';
const sample_image = './test/samples/image.6.jpg';
let str = fs.readFileSync(sample_image, 'base64');

describe('Initial', () => {
	describe('Call API root with GET verb', () => {
	  it('should return API welcome message', (done) => {
			chai.request(server)
		    .get('/')
		    .end((err, res) => {
			  	res.should.have.status(200)
			  	res.body.message.should.be.eql('GET / submitted')
		      done()
				})
	  })
	}),
	describe('Call API user info route', () => {
		it('should return JSON object with user data', (done) => {
			chai.request(server)
				.get('/api/user/6/')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.an('object')
					res.body.should.have.property('id').to.be.eql(6)
					done()
				})
		})
	}),
	describe('Call API user avatar route', () => {
		before(() => {
			rimraf(images_dir + '/*', () => { console.log('Images directory whiped'); });
		})
		it('should save avatar file and return base64 encoded string', (done) => {
			chai.request(server)
				.get('/api/user/6/avatar/')
				.end((err, res) => {
					res.should.have.status(200)
					res.text.should.be.eql(str) // comparing to the sample image
					done()
				})
		})
	}),
	describe('Call API user avatar route (2nd call - file exists)', () => {
		// here we have images file created on previous route call
		// not a best practice but in this case it is reasonable
		// to make a chain of 3 API calls according to the expected API behaviour
		it('should return base64 encoded string', (done) => {
			chai.request(server)
				.get('/api/user/6/avatar/')
				.end((err, res) => {
					res.should.have.status(200)
					res.text.should.be.eql(str) // comparing to the sample image
					done()
				})
		})
	}),
	describe('Call API user avatar with DELETE verb', () => {
		it('should return JSON { 200, done }', (done) => {
			chai.request(server)
				.delete('/api/user/6/avatar/')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.an('object')
					res.body.should.have.property('status').to.be.eql(200)
					res.body.should.have.property('message').to.be.eql('done')
					done()
				})
		}),
		it('should return JSON { 400, nothing to delete }', (done) => {
			chai.request(server)
				.delete('/api/user/6/avatar/')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.an('object')
					res.body.should.have.property('status').to.be.eql(400)
					res.body.should.have.property('message').to.be.eql('nothing to delete')
					done()
				})
		})
	})
})
