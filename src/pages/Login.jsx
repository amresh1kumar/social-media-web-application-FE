// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../API/api";
// import { useAuth } from "../Context/AuthContext";

// export default function Login() {
//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const { login } = useAuth();
//    const navigate = useNavigate();

//    const onSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          const res = await API.post("/auth/login", { email, password });
//          login(res.data.user, res.data.token);
//          navigate("/feed");
//       } catch {
//          alert("Login failed");
//       }
//    };

//    return (
//       <div style={{ padding: 20 }}>
//          <h2>Login</h2>
//          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: 320 }}>
//             <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input
//                placeholder="password"
//                type="password"
//                value={password}
//                onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">Login</button>
//          </form>
//          <p>
//             Don’t have an account? <Link to="/register">Register</Link>
//          </p>
//       </div>
//    );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../API/api";
import { useAuth } from "../Context/AuthContext";
import "./Login.css"; // 👈 import CSS

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login } = useAuth();
   const navigate = useNavigate();

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await API.post("/auth/login", { email, password });
         login(res.data.user, res.data.token);
         navigate("/feed");
      } catch {
         alert("Login failed");
      }
   };

   return (
      <div className="login-page">
         <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={onSubmit} className="login-form">
               <div className="input-group">
                  <input
                     type="text"
                     placeholder="Username"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="icon">👤</span>
               </div>
               <div className="input-group">
                  <input
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="icon">🔒</span>
               </div>
               <div className="options">
                  <label>
                     <input type="checkbox" /> Remember me
                  </label>
                  <Link to="/forgot" className="forgot-link">Forgot password?</Link>
               </div>
               <button type="submit" className="login-btn">Login</button>
            </form>
            <p className="register-text">
               Don’t have an account? <Link to="/register">Register</Link>
            </p>
         </div>
      </div>
   );
}
