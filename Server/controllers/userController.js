import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, dob, country } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    })

    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User with this email or username already exists" 
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      username,
      password: hashedPassword,
      dob,
      country
    })

    const savedUser = await user.save()

    // Create JWT token
    const token = jwt.sign(
      { id: savedUser._id }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        username: savedUser.username
      }
    })

  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ 
      success: false,
      message: "Error registering user" 
    })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" })
  }
}

export const createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: "Error creating user" })
  }
}