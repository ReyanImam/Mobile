import express from "express"
import { registerUser, getAllUsers, createUser } from "../controllers/userController.js"

const router = express.Router()

router.post("/register", registerUser)


router.get("/", getAllUsers)
router.post("/", createUser)

export default router