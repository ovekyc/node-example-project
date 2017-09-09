export default class TopicController {
  static get(req, res, cb) {
    res.send('Hello world!');
    cb();
  }
}
