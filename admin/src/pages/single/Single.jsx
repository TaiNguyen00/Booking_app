import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import EditForm from "../../components/editFrom/EditForm"
const Single = () => {
  const location = useLocation()
  const pathName = location.pathname.split('/')[1]
  const pathId = location.pathname.split('/')[2]

  const [editFromUser, setEditFromUser] = useState(false)
 
  const { data, loading } = useFetch(`/${pathName}/${pathId}`)


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => setEditFromUser(true)}>Edit</div>
            <h1 className="title">Information</h1>
            {loading ? "Loading..." : (
              <div className="item">
                <img
                  src={data.img}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{data.username}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{data.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{data.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      {data.city}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">{data.country}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
     
      {editFromUser && (<EditForm setOpen={setEditFromUser} userID={pathId} data={data}/>)}
    
    </div>
  );
};

export default Single;
