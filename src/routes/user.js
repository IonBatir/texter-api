const {Router} = require("express");
const {isValidObjectId} = require('mongoose');

const User = require("../controllers/user");
const {ERROR} = require("../constants");
const {handleError, generateErrorCode} = require("../utils");

const router = Router();

router.get('/', (req, res) => {
    User.getAll().then(users => {
        res.json(users);
    }).catch(handleError(res));
});

router.get('/:userId', (req, res) => {
    const {userId} = req.params;
    if (!isValidObjectId(userId))
        return res.status(400).send(generateErrorCode('userId', ERROR.NOT_VALID));

    User.get(userId).then(user => {
        if (!user) return res.sendStatus(404);
        res.json(user);
    }).catch(handleError(res));
});

router.put('/:userId', (req, res) => {
    const {userId} = req.params;
    if (!isValidObjectId(userId))
        return res.status(400).send(generateErrorCode('userId', ERROR.NOT_VALID));

    const {firstName, lastName, username, bio, avatar} = req.body;
    User.update(userId, {firstName, lastName, username, bio, avatar}).then(user => {
        res.json(user);
    }).catch(handleError(res));
});

router.delete('/:userId', (req, res) => {
    const {userId} = req.params;
    if (!isValidObjectId(userId))
        return res.status(400).send(generateErrorCode('userId', ERROR.NOT_VALID));

    User.remove(userId).then(() => {
        res.sendStatus(200);
    }).catch(handleError(res));
});

module.exports = router;
