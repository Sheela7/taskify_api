const jwt = require('jsonwebtoken');

module.exports.createNewAccessToken = (userEmail) => {
    const accessToken = jwt.sign(
        {"email": userEmail},
        process.env.TOKEN_SECRET,
        {expiresIn: "100s"}
    );
    return accessToken;
}
module.exports.createNewRefreshToken = (userEmail) => {
    const refreshToken = jwt.sign(
        {"email": userEmail},
        process.env.TOKEN_SECRET,
        {expiresIn: "600s"}
    );
    return refreshToken;
}