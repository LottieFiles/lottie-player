const fastify = require('fastify')();
const path = require('path');
const fs = require('fs');
const os = require('os');

async function globalSetup() {
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
  });

  // Start server.
  await fastify.listen(8000, (err, address) => {
    if (err) {
      console.log('err on fastify');
    }
  });

  console.log(`Started test server on port ${fastify.server.address().port}`);

  // Return the global teardown function.
  return async () => {
    await new Promise((done) => fastify.close(done));
  };
}

module.exports = globalSetup;
