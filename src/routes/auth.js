const {Router} = require("express");

const User = require("../controllers/user");
const {ERROR} = require("../constants");
const {handleError, generateErrorCode, generateAccessToken} = require("../utils");

const router = Router();

router.post("/register", (req, res) => {
    const {username, email, password, passwordConfirm} = req.body;

    if (password !== passwordConfirm)
        return res
            .status(400)
            .send(generateErrorCode("passwordConfirm", ERROR.NOT_MATCH));

    User.isEmailUsed(email).then((isUsed) => {
        if (isUsed)
            return res.status(400).send(generateErrorCode("email", ERROR.DUPLICATE));

        User.add(email, username, password)
            .then((user) => {
                const token = generateAccessToken(user._id);
                res.json(token);
            })
            .catch(handleError(res));
    }).catch(handleError(res));
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;

    User.getByEmail(email)
        .then((user) => {
            if (!user)
                return res
                    .status(400)
                    .send(generateErrorCode("user", ERROR.NOT_CORRECT));

            user.isPasswordCorrect(password).then((isCorrect) => {
                if (!isCorrect)
                    return res
                        .status(400)
                        .send(generateErrorCode("user", ERROR.NOT_CORRECT));

                const token = generateAccessToken(user._id);
                res.json(token);
            }).catch(handleError(res));
        })
        .catch(handleError(res));
});