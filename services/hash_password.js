const bcrypt = require(`bcrypt`);
const salt = 10;

module.exports.hashPasswordGenerator = async (password) => {
    const generatedPassword = await bcrypt.hash(password,salt);
    return `${generatedPassword}`
}

module.exports.comparePassword = async (user, pass) => {
    const isMatched = await bcrypt.compare(pass, user.password);

    return isMatched;
}