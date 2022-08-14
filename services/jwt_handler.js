const jwt = require(`jsonwebtoken`);

module.exports.createNewAccessToken = (userEmail) => {
    const accessToken = jwt.sign(
        { "email": userEmail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "560s" }
    );

    return accessToken;
}

module.exports.createNewRefreshToken = (userEmail) => {
    const refreshToken = jwt.sign(
        { "email": userEmail },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1000s" }
    );

    return refreshToken;
}

module.exports.validateAccessToken = async (accessToken) => {
    try {
        const verifiedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        return verifiedToken.email;
    } catch (error) {
        if (error.message == "jwt malformed") {
            throw "Please provide valid token"
        } else if (error.message == "jwt expired") {
            throw "The token is expired";
        }
    }
}

module.exports.validateRefreshToken = async (refreshToken) => {
    try {
        const verifiedToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return verifiedToken.email;
    } catch (error) {
        if (error.message == "jwt malformed") {
            throw "Please provide valid refresh token"
        } else if (error.message == "jwt expired") {
            throw "The refresh token is expired";
        }
    }
}