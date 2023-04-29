const db = require('../models/index');
const events = require('../models/event');
const HttpError = require('../http-error');

const updateRequest = async (req, res, next) => {
    const { request_id, group_id, seller, valid } = req.body.info;
    const request = await db.Request.findOne({ where: { request_id: request_id } })
    if (request === null) {
      res.json({message: 'Request not found!'});
    }
    else {
      try {
        request.valid = valid;
        await request.save();
        res.json({message: 'Request validated!'});
      } catch (err) {
        const error = new HttpError('Could update request status.', 500);
        return error;
      }
    }
}

exports.updateRequest = updateRequest;