const db = require('../models/index');
const HttpError = require('../http-error');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


const saveRequest = async(req, res, next) =>{
  try {
    const info = req.body.info;
    const {request_id, group_id, event_id, deposit_token, quantity, seller} = info;
    const event = await db.Event.findOne({ where: { event_id: event_id } });
    if (event === null){
      res.json({message: 'Event not found!'});
    } else {
      if (group_id != 23){
        const new_request = db.Request.build({
          request_id: request_id,
          group_id: group_id,
          deposit_token: deposit_token,
          quantity: quantity,
          seller: seller,
          event_id: event_id,
        });
        event.quantity = event.quantity - quantity;
        try {
          await new_request.save();
          await event.save();
          res.status(201).json({ message: "The request was succesfully created!" });
        } catch (err) {
          const error = new HttpError('Could not create request', 500);
          return error;
        }
      } else {
        res.json({message: 'Request already exists!'});
      }
    }
  } catch {
    const error = new HttpError('Request in wrong format', 500);
    return error;
  }
  
}

const getAllRequest = async (req, res, next) => {
  let requests;
  try {
    requests = await db.Request.findAll().then((request_list) => {
      res.json({
        request: request_list,
      });
    });
  } catch (err) {
    const error = new HttpError(
      'Fetch requests failed, please try again later.',
      500
    );
    return next(error);
  }
}

const getUserRequests = async (req, res, next) => {
  const userId = req.params.id;
  let userRequests;
  console.log(userId);
  try {
    userRequests = await db.Request.findAll({ where: { user_id: userId } }).then((request_list) => {
      res.json({
        request: request_list,
      });
    });
  } catch (err) {
    const error = new HttpError(
      'Fetch requests failed, please try again later.',
      500
    );
    return next(error);
  }
}

const createRequest = async (req, res, next) => {
  const info = req.body;
  const { user_id, event_id, deposit_token, quantity, seller } = info;
  console.log(info);
  const request_data = {
    "request_id": uuidv4(),
    "group_id": "23",
    "event_id": event_id,
    "deposit_token": deposit_token,
    "quantity": quantity,
    "seller": 0
  }
  const event = await db.Event.findOne({ where: { event_id: event_id } });
  if (event === null){
    res.json({message: 'Event not found!'});
  } else {
    const new_request = await db.Request.build({
      request_id: request_data.request_id,
      group_id: request_data.group_id,
      deposit_token: deposit_token,
      quantity: quantity,
      seller: seller,
      event_id: event_id,
      user_id: user_id
    });
    event.quantity = event.quantity - quantity;
    try {
      await new_request.save().then(() => {console.log("Request saved!")});
      await event.save().then(() => {console.log("Event saved!")});
      await axios.post('http://MqttServer:9000/requests', request_data, {
        headers: {'Content-Type': 'application/json'}});
      res.json({ message: "The request was succesfully created!" });
      
    } catch (err) {
      const error = new HttpError('Could not create request', 500);
      return error;
    }
  }
}


exports.saveRequest = saveRequest;
exports.getAllRequest = getAllRequest;
exports.createRequest = createRequest;
exports.getUserRequests = getUserRequests;