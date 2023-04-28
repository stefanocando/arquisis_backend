const db = require('../models/index');
const events = require('../models/event');
const HttpError = require('../http-error');

const updateRequest = async (req, res, next) => {
    const { request_id, group_id, seller, valid } =
      req.body.info;
    console.log(event_id);
    // const createdEvent = db.Event.build({
    //   name: name,
    //   date: date,
    //   price: price,
    //   quantity: quantity,
    //   location: location,
    //   latitude: latitude,
    //   longitude: longitude,
    //   event_id: event_id,
    // });
    // try {
    //   await createdEvent.save();
    //   res.json({message: 'it works'})
    // } catch (err) {
    //   const error = new HttpError('Could not create event', 500);
    //   return error;
    // }
  };

exports.updateRequest = updateRequest;