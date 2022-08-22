const jwtHandler = require(`../services/jwt_handler.js`);

// module.exports.accessTokenValidator = async (req, res, next) => {
//     const bearerToken = req.headers['authorization'];
//      // Validating access token
//      if(bearerToken == undefined || bearerToken == "" || bearerToken.trim() == ""){
//         throw 'Access token is required.'
//     }
//     const accessToken = bearerToken.split(' ')[1];

//     const userEmail = await jwtHandler.validateAccessToken(accessToken);
//     req.body.email = userEmail;
//     next();
// }

// module.exports.refreshTokenValidator = async (req, res, next) => {
//     const bearerToken = req.headers['authorization'];
//     if(bearerToken == undefined || bearerToken == "" || bearerToken.trim() == ""){
//         throw 'Refresh token is required.'
//     }
//     const refreshToken = bearerToken.split(' ')[1];

//     const userEmail = await jwtHandler.validateRefreshToken(refreshToken);
//     req.body.email = userEmail;
//     next();
// }

module.exports.accessTokenValidator = async(req,res,next) => {
    const bearerToken = req.headers["authorization"];

    if (bearerToken == undefined || bearerToken == "" || bearerToken.trim() == "") {
      throw "Access token is required";
    }
    
    const accessToken = bearerToken.split(" ")[1];
    
    const userEmail = await jwtHandler.validateAccessToken(accessToken);
    req.body.email =userEmail 
    next()
} 