const router = require(`express`).Router();
const noteController = require(`../controllers/noteController.js`);
const tokenValidator = require(`../middleware/token_validator.js`);
const errorHandler = require(`../middleware/error_handler.js`);

router.post('/addnote', errorHandler(tokenValidator.accessTokenValidator), errorHandler(noteController.addNote));

module.exports = router;