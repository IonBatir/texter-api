const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = require("./secrets");

function generateErrorCode(field, error, value) {
  return value ? `${field}${error}${value}` : `${field}${error}`;
}

function getErrorCode(error) {
  console.log("error", error);
  return error.errors
    ? Object.values(error.errors)[0].properties.message
    : null;
}

function handleError(res) {
  return function (error) {
    const errorCode = getErrorCode(error);
    if (errorCode) res.status(400).send(errorCode);
    else res.sendStatus(500);
  };
}

function generateAccessToken(userId) {
  return jwt.sign(userId, TOKEN_SECRET, { expiresIn: "5d" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

module.exports = {
  generateErrorCode,
  generateAccessToken,
  authenticateToken,
  handleError,
};
