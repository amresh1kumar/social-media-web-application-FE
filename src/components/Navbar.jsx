import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Navbar.css"; // 👈 CSS file

export default function Navbar() {
   const { user, logout } = useAuth();

   return (
      <header className="navbar">
         <div className="logo">ZX.in</div>
         <ul className="nav-links">
            <li>
               <Link to="/feed" className="nav-item">Feed</Link>
            </li>
            <li>
               <Link to="/chat" className="nav-item">Chat</Link>
            </li>
            <li>
               <Link to="/profile" className="nav-item">Profile</Link>
            </li>
            <li>
               <Link to="/profileSection" className="nav-item">Profile Details</Link>
            </li>
            <li>
               <Link to="/notification" className="nav-item">Notifications</Link>
            </li>
            <li className="auth-section">
               {user ? (
                  <>
                     <span className="username">{user.username}</span>
                     <button onClick={logout} className="logout-btn">Logout</button>
                  </>
               ) : (
                  <Link to="/login" className="nav-item-log-out">Login</Link>
               )}
            </li>
         </ul>
      </header>
   );
}

