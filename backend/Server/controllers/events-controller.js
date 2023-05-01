const db = require('../models/index');
const events = require('../models/event');
const HttpError = require('../http-error');


//Create event
const createEvents = async (req, res, next) => {
  const { name, date, price, quantity, location, latitude, longitude, event_id } =
    req.body.info;
  console.log(req.body.info);
  console.log(event_id);
  const createdEvent = db.Event.build({
    name: name,
    date: date,
    price: price,
    quantity: quantity,
    location: location,
    latitude: latitude,
    longitude: longitude,
    event_id: event_id,
  });
  try {
    await createdEvent.save();
    res.json({message: 'it works'})
  } catch (err) {
    const error = new HttpError('Could not create event', 500);
    return error;
  }
};

//Get events stored in database
const getEvents = async (req, res, next) => {
  const { page = 0, size = 25 } = req.query;
  let options = {
    limit: +size,
    offset: +page * +size,
  };
  let events;
  try {
    events = await db.Event.findAll(options).then((event) => {
      res.json({
        events: event,
      });
    });
  } catch (err) {
    const error = new HttpError(
      'Fetch events failed, please try again later.',
      500
    );
    return next(error);
  }
};

exports.getEvents = getEvents;
exports.createEvents = createEvents;
