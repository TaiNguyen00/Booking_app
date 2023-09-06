import express from "express";
import { verifyAdmin } from "../utils/verifyToken";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/roomsControllers";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom)

// update
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

// get room
router.get("/:id", getRoom)

// get all
router.get("/", getRooms)

module.exports = router