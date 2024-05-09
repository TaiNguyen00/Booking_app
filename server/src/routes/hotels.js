import express from "express";
import { DeleteHotel, countByCity, createHotel, getHotel, getHotels, updatedHotel, countByType, getHotelRooms } from "../controllers/hotelsControllers";
import { verifyAdmin } from "../utils/verifyToken";
const router = express.Router();



router.post("/", verifyAdmin,createHotel)
router.put("/:id", verifyAdmin ,updatedHotel)
router.delete("/:id",verifyAdmin ,DeleteHotel)
// 
router.get("/",getHotels)
router.get("/find/:id", getHotel)

// by citys
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

module.exports = router;