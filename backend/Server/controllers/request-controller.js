const db = require('../models/index');
const requests = require('../models/event');
const HttpError = require('../http-error');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


const createRequest = async(req, res, next) =>{
  const {group_id, event_id, deposit_token, quantity, seller, user_id} =
    req.body;
  
  const uuid = uuidv4();
  const request_data = {
    "request_id": uuid,
    "group_id": group_id, 
    "event_id": event_id, 
    "deposit_token": deposit_token, 
    "quantity": quantity, 
    "seller" : seller
  };
  let isValidRequest = false;
  try {
    await axios.post('http://MqttServer:9000/requests', {
      request_data
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => isValidRequest=response.data.sendValidationRequest.valid)
  } catch (err) {
    console.log(err);
  }
  if (isValidRequest){
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
      await 
      res.json({messaje: 'Succesfully created Request'})
    } catch (err) {
      const error = new HttpError('Could not create Request due to Create in DB', 500);
      return error;
    }
  }else{
    res.json({messaje: "Could not create Request due to Invalid Validation"})
  }

}

exports.createRequest = createRequest;