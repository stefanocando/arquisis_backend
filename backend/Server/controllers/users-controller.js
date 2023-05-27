const db = require('../models/index');
const HttpError = require('../http-error');

const createUsers = async (req, res, next) => {
    try {
        const { user_id, email, } = req.body.info;
        const createdUser = db.User.build({
            user_id: user_id,
            email: email,
            money: 0,
        });
        try {
            await createdUser.save();
            res.json({message: 'User created!'});
        } catch (err) {
            console.log(err);
    }
    } catch {
        const error = new HttpError('User in wrong format', 500);
        return error;
    }
}

const addMoney = async (req, res, next) => {
    try {
        const { user_id, money } = req.body.info;
        const user = await db.User.findOne({ where: { user_id: user_id } })
        if (user === null) {
            res.json({message: 'User does not exist!'});
        }
        else {
            try {
                user.money += money;
                await user.save();
                res.json({message: 'Money added!'});
            } catch (err) {
                const error = new HttpError('Could not add money.', 500);
                return error;
            }
        }
    } catch {
        const error = new HttpError('User in wrong format', 500);
        return error;
    }
}

exports.createUsers = createUsers;
exports.addMoney = addMoney;