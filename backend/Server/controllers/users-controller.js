const db = require('../models/index');
const HttpError = require('../http-error');

const createUsers = async (req, res, next) => {
    try {
        console.log(req.body.info);
        const { user_id, email, } = req.body;
        const createdUser = db.User.build({
            user_id: user_id,
            email: email,
            money: 0,
        });
            await createdUser.save();
            res.status(201).json({message: 'User created!'});
    } catch {
        const error = new HttpError('Failed to create user', 500);
        return error;
    }
}

const getUser = async (req, res, next) => {
    const id = req.params.id

    try {
        const user = await db.Request.findOne({ where: { user_id: id } }).then((users) => {
            res.json({
                user: users[0]
            });
        });
    } catch (err) {
        const error = new HttpError("Fetch user failed, please try again later", 500);
        return error;
    }

}

const addMoney = async (req, res, next) => {
    try {
        const { user_id, money } = req.body;
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
exports.getUser = getUser;
exports.addMoney = addMoney;
