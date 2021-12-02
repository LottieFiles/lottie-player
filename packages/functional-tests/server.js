const fastify = require('fastify')();
const path = require('path');

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'app'),
});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../..', 'dist'),
  prefix: '/dist/',
  decorateReply: false,
});
// Start server.
fastify.listen(8000, (err, address) => {
  if (err) {
    console.log(err);
  }
});

console.log(`Started test server on port 8000`);
