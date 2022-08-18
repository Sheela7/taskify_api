const bcrypt = require(`bcrypt`);
const salt = 10;

// Generates a hashed password.
module.exports.hashPasswordGenerator = async (password) => {
    const generatedPassword = await bcrypt.hash(password,salt);
    return `${generatedPassword}`
}

// Returns true if the user's password and hashed password match.
module.exports.comparePassword = async (userPassword, hashPassword) => {
    const isMatched = await bcrypt.compare(userPassword, hashPassword);

    return isMatched;
}