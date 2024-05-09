import Hotel from "../models/hotel";
import Room from "../models/room";
import { createError } from "../utils/error";

// Create
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)
  try {
    const savedHotel = await newHotel.save()
    return res.status(200).json(savedHotel)
  } catch (err) {
    next(err)
  }
}

//  Updated
export const updatedHotel = async (req, res) => {
  try {
    const IDHotel = req.params.id
    const updatedHotel = await Hotel.findByIdAndUpdate(IDHotel, {$set: req.body}, { new: true })
    return res.status(200).json(updatedHotel)
  } catch (e) {
    return res.status(500).json(e)
  }
}

export const DeleteHotel = async (req, res) => {
  try {
    const IDHotel = req.params.id
    const hotel = await Hotel.findByIdAndDelete(IDHotel)
    return res.status(200).json(hotel)
  } catch (e) {
    return res.status(500).json(e)
    
  }
}

// GET
export const getHotel = async (req, res) => {
  try {
    const IDHotel = req.params.id
    const hotel = await Hotel.findById(IDHotel)
    return res.status(200).json(hotel)
  } catch (e) {
    return res.status(500).json(e)
  }
}

// GET ALL
export const getHotels = async (req, res, next) => {
  const { min, max, ...others} = req.query
  try {
    let limit = parseInt(req.query.limit)
    // req feautured = true, .... = true
    const hotels = await Hotel.find({...others, cheapestPrice: { $gt: min || 1, $lt: max || 900000}}).limit(limit) 
    // trả về /api/hotels?featured=true&limit=3 đây là params
    return res.status(200).json(hotels)
  } catch (err) {
    next(err)
  }
}


// by query

export const countByCity = async (req, res, next ) => {
  const cities = req.query.cities.split(",") // query
  try {
    const list = await Promise.all(cities.map(city => {
      // return Hotel.find({city: city}).length // we use mongoDB count document
      return Hotel.countDocuments({city: city})
    }))
    return res.status(200).json(list)
  } catch (e) {
    return next(e)
  }
}

export const countByType = async (req, res, next ) => {
  try {
    const hotelCount = await  Hotel.countDocuments({"type": "hotel"})
    const apartmentCount = await Hotel.countDocuments({"type": "apartment"})
    const resortCount = await Hotel.countDocuments({"type": "resort"})
    const villaCount = await Hotel.countDocuments({"type": "villa"})
    const cabinCount = await Hotel.countDocuments({"type": "cabin"})
   
    return res.status(200).json([
      {type: "hotel", count: hotelCount},
      {type: "apartments", count: apartmentCount},
      {type: "resorts", count: resortCount},
      {type: "villas", count: villaCount},
      {type: "cabins", count: cabinCount},
    ])
  } catch (e) {
    return next(e)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(hotel.rooms.map(room => {
      return Room.findById(room)
    }))
    return res.status(200).json(list)
  } catch (e) {
    return next(e)
  }
}

