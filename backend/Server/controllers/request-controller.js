const db = require('../models/index');
const HttpError = require('../http-error');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


const saveRequest = async(req, res, next) =>{
  const {request_id, group_id, event_id, deposit_token, quantity, seller, user_id} =
    req.body.info
  try {
    await db.Request.build({
      request_id: request_id,
      group_id: group_id,
      event_id: event_id,
      deposit_token: deposit_token,
      quantity: quantity,
      seller: seller,
      user_id: user_id,
    }).then((new_request) => {
      new_request.save();
    });
    await db.Event.findOne({ where: { event_id: event_id } }).then({
      event_id : event_id,
    }).then((event) => {event.quantity = event.quantity - quantity; event.save();});
  } catch (err) {
    const error = new HttpError('Could not create request', 500);
    return next(error);
  }
  res.status(201).json({ message: "The request was succesfully created!" });
}

const createRequest = async (req, res, next) => {
  
}

exports.createRequest = createRequest;