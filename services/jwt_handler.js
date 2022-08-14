const jwt = require('jsonwebtoken');

module.exports.createNewAccessToken = (userEmail) => {
    const accessToken = jwt.sign(
        {"email": userEmail},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "600s"}
    );
    return accessToken;
}
module.exports.createNewRefreshToken = (userEmail) => {
    const refreshToken = jwt.sign(
        {"email": userEmail},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "600s"}
    );
    return refreshToken;
}

module.exports.validateAccessToken = (accessToken) => {
    try {
        const jwtVerification = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        return jwtVerification.email;
    } catch (err) {
        if(err.message == "jwt malformed") {
            throw 'Please provide a valid access token.'
        } else if (err.message == "jwt expired") {
            throw 'The token is expired.'
        }
    }
}

module.exports.validateRefreshToken = (refreshToken) => {
    try {
        const jwtVerification = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return jwtVerification.email;
    } catch (err) {
        if(err.message == "jwt malformed") {
            throw 'Please provide a valid refresh token.'
        } else if (err.message == "jwt expired") {
            throw 'The refresh token is expired.'
        }
    }
}