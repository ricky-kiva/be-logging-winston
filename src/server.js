const os = require('os');
const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const logger = require('./logger/index');
const ClientError = require('./exceptions/ClientError');

require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000,
  });

  server.ext('onPreResponse', (req, h) => {
    const { response } = req;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });

      newResponse.code(response.statusCode);

      return newResponse;
    }

    logger.info(`userIP=${req.info.remoteAddress}, host=${os.hostname}, method=${req.method}, path=${req.path}, payload=${JSON.stringify(response.source)}`);

    return h.continue;
  });

  await server.register(
    { plugin: notes },
  );

  await server.start();

  // eslint-disable-next-line no-console
  console.log(`server start at ${server.info.uri}`);
};

init();
