function generateErrorCode(field, error, value) {
    return value ? `${field}${error}${value}` : `${field}${error}`;
}

function getErrorCode(error) {
    return error.errors ? Object.values(error.errors)[0].properties.message : JSON.stringify(error);
}

module.exports = {
    generateErrorCode,
    getErrorCode
};