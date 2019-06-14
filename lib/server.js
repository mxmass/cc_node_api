module.exports = app => {
  const API_PORT = process.env.PORT || 3000,
        LOCAL = '0.0.0.0';

  app.listen(API_PORT, LOCAL, () => console.log(`API server running on ${API_PORT}`))
}
