// import { Link } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";

// export default function Navbar() {
//    const { user, logout } = useAuth();

//    return (
//       <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
//          <Link to="/feed">Feed</Link>
//          <Link to="/chat">Chat</Link>
//          <Link to="/profile">Profile</Link>
//          <div style={{ marginLeft: "auto" }}>
//             {user ? (
//                <>
//                   <span style={{ marginRight: 8 }}>{user.username}</span>
//                   <button onClick={logout}>Logout</button>
//                </>
//             ) : (
//                <Link to="/login">Login</Link>
//             )}
//          </div>
//       </nav>
//    );
// }

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

