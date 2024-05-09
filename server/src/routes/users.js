import express from "express";
import { getUsers, getUser, createUser, DeleteUser, updatedUser,} from "../controllers/usersControllers";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken";
const router = express.Router();


// router.get("/checkauthentication", verifyToken, checkauthentication) // check role
// router.get("/checkuser/:id", verifyUser, checkUserToken)
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next ) => {
//   return res.send("Heelo admin, you are logged")
// })

// GET ALL
router.get("/",verifyAdmin ,getUsers)

// get user
router.get("/:id", verifyUser ,getUser)

router.delete("/:id", verifyUser ,DeleteUser)

router.post("/" ,createUser)

router.put("/:id",verifyUser ,updatedUser)

module.exports = router;