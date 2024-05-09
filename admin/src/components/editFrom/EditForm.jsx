import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

import "./EditForm.scss";
import { useNavigate } from "react-router-dom";

const EditFrom = ({ setOpen, inputs, data, userID }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const navigate = useNavigate()


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/da9s1x0qs/image/upload",
        data
      );

      console.log(uploadRes.data);
      const { url } = uploadRes.data;

      const newUpdateUser = {
        ...info,
        img: url,
      };

      await axios.put(`/users/${userID}`, newUpdateUser);
      setOpen(false)
      navigate("/users")
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="editFrom">
      <div className="rContainer">
        <form>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />
          <span>Change Your Info:</span>
          <div className="rItems">
            <label htmlFor="file" style={{ cursor: "pointer" }}>
              Img: <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <img
              width={60}
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <div className="rItems">
            <label>Name: </label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              placeholder={data.username}
            />
          </div>
          <div className="rItems">
            <label>Phone: </label>
            <input
              type="text"
              id="phone"
              onChange={handleChange}
              placeholder={data.phone}
            />
          </div>
          <div className="rItems">
            <label>Address: </label>
            <input
              type="text"
              id="city"
              onChange={handleChange}
              placeholder={data.city}
            />
          </div>
          <div className="rItems">
            <label>Country: </label>
            <input
              type="text"
              id="country"
              onChange={handleChange}
              placeholder={data.country}
            />
          </div>
          <button className="rButton" onClick={handleClick}>
            Update Now!
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFrom;
