// import { Link } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";
// import "./Navbar.css";

// export default function Navbar() {
//    const { user, logout } = useAuth();

//    return (
//       <>
//          {user ? (
//             <header className="navbar">
//                <div className="logo">Nextora</div>
//                <ul className="nav-links">
//                   <li>
//                      <Link to="/feed" className="nav-item">Feed</Link>
//                   </li>
//                   <li>
//                      <Link to="/chat" className="nav-item">Chat</Link>
//                   </li>
//                   <li>
//                      <Link to="/profile" className="nav-item">Profile</Link>
//                   </li>
//                   <li>
//                      <Link to="/profileSection" className="nav-item">Profile Details</Link>
//                   </li>
//                   <li>
//                      <Link to="/notification" className="nav-item">Notifications</Link>
//                   </li>
//                   <li className="auth-section">
//                      {user ? (
//                         <>
//                            <span className="username">{user.username}</span>
//                            <button onClick={logout} className="logout-btn">Logout</button>
//                         </>
//                      ) : (
//                         <Link to="/login" className="nav-item-log-out">Login</Link>
//                      )}
//                   </li>
//                </ul>
//             </header>
//          ) : (<></>)}
//       </>
//    );
// }


import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
   const { user, logout } = useAuth();
   const [openMenu, setOpenMenu] = useState(false);

   return (
      <>
         {user && (
            <header className="navbar">
               <div className="logo">Nextora</div>

               <div className="hamburger" onClick={() => setOpenMenu(!openMenu)}>
                  <div></div>
                  <div></div>
                  <div></div>
               </div>

               <ul className={`nav-links ${openMenu ? "active" : ""}`}>
                  <li><Link to="/feed" className="nav-item">Feed</Link></li>
                  <li><Link to="/chat" className="nav-item">Chat</Link></li>
                  <li><Link to="/profileSection" className="nav-item">Profile</Link></li>
                  <li><Link to="/notification" className="nav-item">Notifications</Link></li>
                  <li className="auth-section">
                     <span className="username">{user.username}</span>
                     <button onClick={logout} className="logout-btn">Logout</button>
                  </li>
               </ul>
            </header>
         )}
      </>
   );
}
