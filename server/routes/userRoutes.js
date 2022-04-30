const {register,login,setAvatar,chat} = require("../controller/userController");
const router = require("express").Router();
router.post("/register",register);
router.post("/login",login);
router.post("/avatar/:id",setAvatar);
router.get("/chat/:id",chat);

module.exports = router;
