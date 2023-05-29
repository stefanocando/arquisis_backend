const db = require('../models/index');
const HttpError = require('../http-error');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const e = require('express');
const { JSON } = require('sequelize');


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

const getTicket = async (req, res, next) => {
  try{
    const info = req.body;
    const { ticket_id, user_id } = info;
    const user = db.User.findOne({ where: { user_id: user_id } });
    const ticket = await axios.post('https://2nrlawti8d.execute-api.us-east-1.amazonaws.com/Prod/pdf-generator', {
      "ticket_id": ticket_id,
      "group": "23",
      "user_name": user_id,
      "user_mail": user.email,
    }, { headers: { 'Content-Type': 'application/json' } });
    console.log(ticket.data.url);
    res.json({message: ticket.data.url});
  } catch (err) {
    res.json({message: err});
  }
}


const getUserRequests = async (req, res, next) => {
  const userId = req.body.user_id;
  let userRequests;
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
  

  const event = await db.Event.findOne({ where: { event_id: event_id } });
  if (event === null){
    console.log('Event not found!');
    res.json({message: 'Event not found!'});
  } else {
    if (event.quantity <= quantity) {
      res.json({message: 'Not enough tickets!'});
    } else {
      const user = await db.User.findOne({ where: { user_id: user_id } });
      if (user === null){
        console.log("User not found!");
        res.json({message: 'User not found!'});
      } else {
        if (user.money < quantity * event.price){
          res.json({message: 'Not enough balance!'});
        } else {
          console.log("Enviando payment data!");

          const payment_data = await axios.post('https://api.legit.capital/v1/payments', {
            "group_id": "23",
            "seller": "0",
            "event_id": event_id,
            "quantity": quantity,
            "value": event.price,
          }, {
            headers: {'Content-Type': 'application/json'}});
          // console.log(payment_data.data);

          const d_token = payment_data.data;
          const el_tokien = payment_data.data.deposit_token;

          const challenge = await axios.post('http://board:3000/job'  , d_token, { headers: {'Content-Type': 'application/json'}}); 

          const request_data = {
            "request_id": uuidv4(),
            "group_id": "23",
            "event_id": event_id,
            "deposit_token": el_tokien,
            "quantity": quantity,
            "seller": 0
          }
          try {
            const new_request = await db.Request.build({
              request_id: request_data.request_id,
              group_id: request_data.group_id,
              deposit_token: el_tokien,
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
          } catch (err) {
            res.status(500).json({message: err});
          }
        }
      }

    }
  }
}


exports.saveRequest = saveRequest;
exports.getTicket = getTicket;
exports.createRequest = createRequest;
exports.getUserRequests = getUserRequests;