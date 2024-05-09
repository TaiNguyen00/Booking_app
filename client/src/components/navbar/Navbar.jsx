import { useContext } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch({type: "LOGIN_START"})

  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
          <span className="logo">lamabooking</span>
        </Link>
          {user ? (
            <div>
              <span style={{marginRight: "12px"}}>{user.details.username}</span>
              <button onClick={handleLogOut}>Log out</button>
            </div>
          ) : (
            <>
            <div className="navItems">
              {/* <button className="navButton">Register</button> */}
              <button ><Link to="/login" style={{textDecoration: "none", color: "#fff"}}>Login</Link></button>
            </div>
            </>
          )}
      </div>
    </div>
  )
}

export default Navbar