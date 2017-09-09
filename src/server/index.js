import express from 'express';
import config from 'config';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'winston';
import apiRoutes from './api-routes';

export default (cb) => {
  const app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({limit: 1024}));
  app.use((req, res, next) => { // Log requests
    logger.info(`Request - ${req.method} - PATH : ${req.originalUrl} - ${new Date()}`);
    next();
  });

  app.use('/javascripts', express.static(path.join(__dirname, '../../dist-client/javascripts')));
  app.use('/api', apiRoutes);
  app.get('*', (req, res) => {
    if (!res.headersSent) // eslint-disable-line curly
      res.sendFile(path.join(__dirname, '../../dist-client/index.html'));
  });

  // global error catcher, need four arguments
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    /* eslint-disable no-console */
    console.error('Error on request %s %s', req.method, req.url);
    console.error(err.stack);
    /* eslint-enable */
    res.status(500).send('Server error');
  });

  process.on('uncaughtException', evt => {
    console.log('uncaughtException: ', evt); // eslint-disable-line no-console
  });

  const port = process.env.PORT || config.port;
  const server = app.listen(port, cb ? cb : () => {
    console.log(`Listening on port ${port}`); // eslint-disable-line no-console
  });
  return server;
};
