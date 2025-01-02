const router = require('express').Router();
const { adminLogin } = require('../../controllers/user/user.controller');



router.post("/admin", adminLogin);

module.exports = router;
                    