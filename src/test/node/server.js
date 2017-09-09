import test from 'tape';
import startServer from '../../server';

test('application server', t => {
  let server;
  const onServer = () => {
    t.ok(server, 'should expose server instance');
    server.close(t.end);
  };
  server = startServer(onServer);
});
