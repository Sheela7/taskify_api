const jwtHandler = require("../services/jwt_handler.js");
const accessTokenValidator = async (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if (bearerToken == undefined || bearerToken == "") {
        throw 'access token is required.'
    }
    const accessToken = bearerToken.split(' ')[1];


    const userEmail = await jwtHandler.validateAccessToken(accessToken);
    req.body.userEmail = userEmail;
    next();
}

module.exports = accessTokenValidator;