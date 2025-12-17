const express=require("express");
const router = express.Router();
const {signupUser}=require("./../Controller/signupController");
router.post("/signup", signupUser);
module.exports = router;