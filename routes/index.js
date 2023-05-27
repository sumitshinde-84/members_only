var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");

/* GET home page. */
router.get("/",messageController.show_message_list);

router.get("/sign-up", userController.sign_up_get);
router.post("/sign-up", userController.sign_up_post);

router.post("/log-in", userController.log_in_post);
router.get("/log-out", userController.log_out_post);


router.get('/create-message',messageController.create_message_get);
router.post('/create-message',messageController.create_message_post)

router.get('/join-membership',userController.join_membership_get)
router.post('/join-membership',userController.join_membership_post)

router.post('/delete',messageController.message_delete_post)
router.get('/delete',messageController.message_delete_get)
module.exports = router;
