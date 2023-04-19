const db = require('../models/index');
const requests = require('../models/event');
const HttpError = require('../http-error');


const createRequest = async(req, res, next) =>{
  const {group_id, event_id, deposit_token, quantity, seller, user_id, state } =
    req.body;

  const createdRequest = db.Request.build({
    group_id: group_id,
    deposit_token: deposit_token,
    quantity, quantity,
    seller: seller,
    user_id: user_id,
    event_id: event_id,
  })
  try {
    await createdRequest.save();
    res.json({messaje: 'Succesfully created Request'})
  } catch (err) {
    const error = new HttpError('Could not create event', 500);
    return error;
  }
}

exports.createRequest = createRequest;