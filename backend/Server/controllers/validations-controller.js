const db = require('../models/index');
const events = require('../models/event');
const HttpError = require('../http-error');

const updateRequest = async (req, res, next) => {
    const { request_id, group_id, seller, valid } = req.body.info;
    let request;
    try {
      request = await db.Request.findOne({ where: { request_id: request_id } })
      .then((request) => {request.valid = valid; request.save(); res.json({message: 'Request validated!'})});
    } catch (err) {
      const error = new HttpError('Could not find request', 500);
      return error;
    }
  };

exports.updateRequest = updateRequest;