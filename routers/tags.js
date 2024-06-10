const express = require('express');
const router = express.Router();
const {
  store, // create
  show, // read
  index, // index
  update, // update
  destroy, // delete
} = require('../controllers/tags.js');

const validator = require('../middlewares/validator.js');
const { bodyData } = require('../validations/tags.js');

router.post('/', validator(bodyData), store);
router.get('/:slug', show);
router.get('/', index);
router.put('/:slug', validator(bodyData), update);
router.delete('/:slug', destroy);

module.exports = router;
