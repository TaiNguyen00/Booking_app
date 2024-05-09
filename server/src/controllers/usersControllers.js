import User from "../models/user";

// Create
export const createUser = async (req, res, next) => {
  const newUser = new User(req.body)
  try {
    const savedUser = await newUser.save()
    return res.status(200).json(savedUser)
  } catch (err) {
    next(err)
  }
}

//  Updated
export const updatedUser = async (req, res, next) => {
  try {
    const IDUser = req.params.id
    const updatedUser = await User.findByIdAndUpdate(IDUser, {$set: req.body}, { new: true })
    return res.status(200).json(updatedUser)
  } catch (e) {
    return next(e)
  }
}

export const DeleteUser = async (req, res) => {
  try {
    const IDUser = req.params.id
    const user = await User.findByIdAndDelete(IDUser)
    return res.status(200).json(user)
  } catch (e) {
    return next(e)
    
  }
}

// GET
export const getUser= async (req, res, next) => {
  try {
    const IDUser= req.params.id
    const user = await User.findById(IDUser)
    return res.status(200).json(user)
  } catch (e) {
    return next(e)
  }
}

// GET ALL
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

// check authenticated
export const checkauthentication = async (req, res, next ) => {
  return res.send("You'er logged in")
}

export const checkUserToken = async (req, res, next ) => {
  return res.send("Hello user, u are logged and can delete user")
}