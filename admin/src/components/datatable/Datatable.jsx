import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch"
import axios from "axios";

const Datatable = ({columns}) => {
  // const [data, setData] = useState(userRows);
  const location = useLocation()
  const path = location.pathname.split("/")[1]
  // console.log("check path name", path)
  const [ list, setList ] = useState([]) // dùng để cập nhật lại
  const { data, error } = useFetch(`/${path}`)

  useEffect(() => {
    setList(data)
  },[data]) // cập nhật lại (render) list mỗi khi có sự thay đổi ở data, for ex: delete user...

  const handleDelete = async (id) => {
   
    try {
      await axios.delete(`/${path}/${id}`)
      setList(list.filter((item) => item._id !== id))
    } catch (e) {
      error(e)
    }
  
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
      />
    </div>
  );
};

export default Datatable;
