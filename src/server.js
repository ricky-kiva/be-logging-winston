const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000,
  })

  await server.register(
    {
      plugin: notes,
    },
  )

  await server.start();
  console.log(`server start at ${server.info.uri}`);
}

init();