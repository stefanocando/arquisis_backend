const db = require('../models/index');
const events = require('../models/event');
const HttpError = require('../http-error');

const updateRequest = async (req, res, next) => {
    await wait(25000);
    const { request_id, group_id, seller, valid } = req.body.info;
    const request = await db.Request.findOne({ where: { request_id: request_id } })
    if (request === null) {
      res.json({message: 'Validation from non existing request!'});
    }
    else {
      try {
        let value = 0;
        if (valid) {
          value = 1;
        }
        request.valid = value;
        await request.save();
        res.json({message: 'Request validated!'});
      } catch (err) {
        const error = new HttpError('Could not update request status.', 500);
        return error;
      }
    }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.updateRequest = updateRequest;