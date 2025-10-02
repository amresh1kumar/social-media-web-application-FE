// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../API/api";
// import { useAuth } from "../Context/AuthContext";

// export default function Register() {
//    const [username, setUsername] = useState("");
//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const { login } = useAuth();
//    const navigate = useNavigate();

//    const onSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          const res = await API.post("/auth/register", { username, email, password });
//          login(res.data.user, res.data.token);
//          navigate("/feed");
//       } catch {
//          alert("Register failed");
//       }
//    };

//    return (
//       <div style={{ padding: 20 }}>
//          <h2>Register</h2>
//          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: 320 }}>
//             <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
//             <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input
//                placeholder="password"
//                type="password"
//                value={password}
//                onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">Register</button>
//          </form>
//          <p>
//             Already have an account? <Link to="/login">Login</Link>
//          </p>
//       </div>
//    );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../API/api";
import { useAuth } from "../Context/AuthContext";
import "./Register.css"; // 👈 separate CSS file

export default function Register() {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login } = useAuth();
   const navigate = useNavigate();

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await API.post("/auth/register", { username, email, password });
         login(res.data.user, res.data.token);
         navigate("/feed");
      } catch {
         alert("Register failed");
      }
   };

   return (
      <div className="register-page">
         <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form onSubmit={onSubmit} className="register-form">
               <div className="input-group">
                  <input
                     type="text"
                     placeholder="Username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className="icon">👤</span>
               </div>
               <div className="input-group">
                  <input
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="icon">📧</span>
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

               <button type="submit" className="register-btn">Register</button>
            </form>
            <p className="login-text">
               Already have an account? <Link to="/login">Login</Link>
            </p>
         </div>
      </div>
   );
}

