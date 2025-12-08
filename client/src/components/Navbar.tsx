"use client"
import { Link, useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          EcoStore
        </Link>

        <div className={styles.navLinks}>
            <>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
              <Link to="/register" className={styles.link}>
                Register
              </Link>
            </>
          
            <>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Username: </span>
                <span className={styles.badge}>Your Role: </span>
              </div>
              // if role is admin
                <Link to="/admin" className={styles.link}>
                  Dashboard
                </Link>
            
                // if role is user
                <Link to="/user" className={styles.link}>
                  Dashboard
                </Link>
             
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
        </div>
      </div>
    </nav>
  )
}
