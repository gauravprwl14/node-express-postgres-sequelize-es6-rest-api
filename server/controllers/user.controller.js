import httpStatus from 'http-status';
import db from '../../config/sequelize';

const User = db.User;

/**
 * Load user and append to req.
 */
async function load(req, res, next, id) {
    try {
        const userFoundResponse = await User.findById(id);
        if (!userFoundResponse) {
            const e = new Error('User does not exist');
            e.status = httpStatus.NOT_FOUND;
            return next(e);
        }
        req.user = userFoundResponse; // eslint-disable-line no-param-reassign
        return next();
    } catch (error) {
        return next(error);
    }
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
    return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
    const user = User.build({
        username: req.body.username,
    });

    user
        .save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
    const user = req.user;
    user.username = req.body.username;
    user.mobileNumber = req.body.mobileNumber;

    user
        .save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
    const { limit = 50 } = req.query;
    User.findAll({ limit })
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
    const user = req.user;
    const username = req.user.username;
    user
        .destroy()
        .then(() => res.json(username))
        .catch(e => next(e));
}

export default {
    load,
    get,
    create,
    update,
    list,
    remove,
};
