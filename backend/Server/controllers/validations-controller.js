const db = require('../models/index');
const HttpError = require('../http-error');

const updateRequest = async (req, res, next) => {
    await wait(25000);
    const { request_id, group_id, seller, valid } = req.body.info;
    console.log(request_id, group_id, seller, valid);
    const request = await db.Request.findOne({ where: { request_id: request_id } })
    if (request === null) {
      res.json({message: 'Validation from non existing request!'});
    }
    else {
      try {
        let value = 0;
        if (valid) {
          value = 1;
        } else {
          try {
            console.log("Trying to return money");
            const user = await db.User.findOne({ where: { user_id: request.user_id } })
            if (user === null){
              console.log("User not found!");
            }
            else {
              const event_selected = await db.Event.findOne({ where: { event_id: request.event_id } })
              user.money += request.quantity * event_selected.price;
              event_selected.quantity += request.quantity;
              await user.save();
              await event_selected.save();}
          } catch (err) {
              const error = new HttpError('Could not return money.', 500);
              return error;
          }
        }
        request.state = value;
        await request.save();
        // Aqui se debe enviar un mail de confirmacion al usuario
        // IMPLEMENTAR

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