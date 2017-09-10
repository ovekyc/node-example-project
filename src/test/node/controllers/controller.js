import test from 'tape';
import httpMocks from 'node-mocks-http';
import Controller from '../../../server/controllers/controller';

test('Add Topic', t => {
  const expected = {
    status: 200,
    body: 'Hello world!'
  };

  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/api'
  });
  const res = httpMocks.createResponse();
  Controller.get(req, res, () => {
    const data = res._getData();
    t.equal(res.statusCode, expected.status, 'should be same status');
    t.equal(data, expected.body, 'should be same string');
    t.end();
  });
});
