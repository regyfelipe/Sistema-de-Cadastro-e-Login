const express = require("express");
const { 
    registerUser,
    loginUser,
    getUserData 
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); 

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user-data", authMiddleware, getUserData);

module.exports = router;
