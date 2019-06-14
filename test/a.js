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
  })
})
