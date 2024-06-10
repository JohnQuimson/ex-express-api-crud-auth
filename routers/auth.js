const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.js');

// validations
const validator = require('../middlewares/validator.js');
const { registerBody, loginBody } = require('../validations/users.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/profile_pics',
  filename: (req, file, cf) => {
    const fileType = path.extname(file.originalname);
    cf(null, String(Date.now()) + fileType);
  },
});
const upload = multer({ storage });

// Register
router.post(
  '/register',
  [upload.single('profile_pic'), validator(registerBody)],
  register
);

// Login
router.post('/login', validator(loginBody), login);

module.exports = router;
