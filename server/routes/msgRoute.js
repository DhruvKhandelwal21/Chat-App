const {sendMsg,showMsg} = require("../controller/msgController");
const router = require("express").Router();
router.post("/sendmsg/",sendMsg);
router.post("/showmsg/",showMsg);



module.exports = router;