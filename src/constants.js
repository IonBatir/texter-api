const PORT = process.env.PORT ?? 3000;

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ERROR = {
  DUPLICATE: "Duplicate",
  NOT_CORRECT: "NotCorrect",
  NOT_FOUND: "NotFound",
  NOT_MATCH: "NotMatch",
  NOT_VALID: "NotValid",
  MAX_LENGTH: "MaxLength",
  MIN_LENGTH: "MinLength",
  REQUIRED: "Required",
};

module.exports = {
  PORT,
  EMAIL_REGEX,
  ERROR,
};
