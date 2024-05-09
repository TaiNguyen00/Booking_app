import React, { useContext, useState } from 'react'
import "./reserve.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reserve = ({SetopenModal, hotelId}) => {
  const { data } = useFetch(`/hotels/room/${hotelId}`)

  const [ selectedRooms, setSelectedRooms] = useState([])

  const { dates } = useContext(SearchContext) 


  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate); //Saturday ngày 29
    const end = new Date(endDate); //monday ngày 31
    // console.log("start date", start)
    // console.log("end date", end)

    const date = new Date(start.getTime()); // lấy từ saturdat ngày 29

 

    const dates = [];

    while (date <= end) { // true conditrational
      dates.push(new Date(date).getTime()); // sẽ lấy từ ngày đầu tiên lặp đặt push vào mảng dates 
      console.log("dates ARRAY", dates)
      date.setDate(date.getDate()  + 1); // nếu k có đk sẽ bị infi loop
    }
    
    // console.log("date array", date) // trả về ngày 1  tháng 8
    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate) 

  const navigate = useNavigate()
  const isAvailible = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()));

    return !isFound
  }
  const handleClick = async () => {
   try {
      await Promise(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/room/availability/${roomId}`, {
            dates: allDates
          });
          return res.data
        })
      )
      SetopenModal(false)
      navigate("/")
   } catch (e) {
    console.log(e)
   }
  }
 
  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className='rClose' 
        onClick={() => SetopenModal(false)}/>
        <span style={{padding: "20px"}}>Select your rooms: </span>
        {data.map((room, idx) => (
          <div className='rItem'>
            <div className="rInfo">
              <div className="rTitle">{room.title}</div>
              <div className="rDesc">{room.desc}</div>
              <div className="rMax">
                Max people: {room.maxPeople}
              </div>
              <div className="rPrice">Price: ${room.price}</div>
              <h5 style={{padding: "5px 0px"}}>Select Your Room</h5>
              <div className="rSelectRooms">
                {room.roomNumbers.map(roomNumber => (
                  <div className="room">
                    <label className=''>{roomNumber.number}</label>
                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect}
                      disabled={!isAvailible}
                    />
                  </div>
                ))}
              </div>
            </div>  
          </div>
        ))}
        <button onClick={handleClick} className='rButton'>Reverse Now!</button>
      </div>
    </div>
  )
}

export default Reserve