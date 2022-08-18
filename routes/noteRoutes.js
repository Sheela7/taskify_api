// Importing all requiring modules.
const router = require(`express`).Router();
const Controller = require(`../controllers/noteController.js`);
const tokenValidator = require(`../middleware/token_validator.js`);
const errorHandler = require(`../middleware/error_handler.js`);

router.post('/addnote', errorHandler(tokenValidator.accessTokenValidator), errorHandler(Controller.addNote));

//Route to Get all note.
router.post('/getnote', errorHandler(tokenValidator.accessTokenValidator), errorHandler(Controller.getnotes));


module.exports = router;