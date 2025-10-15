// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../API/api";
// import { useAuth } from "../Context/AuthContext";
// import "./Register.css"; // 👈 separate CSS file

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
//       <div className="register-page">
//          <div className="register-container">
//             <h2 className="register-title">Register</h2>
//             <form onSubmit={onSubmit} className="register-form">
//                <div className="input-group">
//                   <input
//                      type="text"
//                      placeholder="Username"
//                      value={username}
//                      onChange={(e) => setUsername(e.target.value)}
//                   />
//                   <span className="icon">👤</span>
//                </div>
//                <div className="input-group">
//                   <input
//                      type="email"
//                      placeholder="Email"
//                      value={email}
//                      onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <span className="icon">📧</span>
//                </div>
//                <div className="input-group">
//                   <input
//                      type="password"
//                      placeholder="Password"
//                      value={password}
//                      onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <span className="icon">🔒</span>
//                </div>

//                <button type="submit" className="register-btn">Register</button>
//             </form>
//             <p className="login-text">
//                Already have an account? <Link to="/login">Login</Link>
//             </p>
//          </div>
//       </div>
//    );
// }

import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import API from "../API/api"; // ✅ same API instance used in login
import { useAuth } from "../Context/AuthContext";
import "./Register.css";

const Register = () => {
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const { login } = useAuth();
   const [messageApi, contextHolder] = message.useMessage();

   const onFinish = async (values) => {
      try {
         const res = await API.post("/auth/register", {
            username: values.username,
            email: values.email,
            password: values.password,
         });

         login(res.data.user, res.data.token);
         messageApi.success("🎉 Registered successfully!");
         setTimeout(() => navigate("/feed"), 600);
      } catch (err) {
         console.error(err.response?.data || err.message);
         if (err.response?.status === 400) {
            messageApi.error(err.response.data.message || "User already exists!");
         } else {
            messageApi.error("⚠️ Server error! Please try again later.");
         }
      }
   };

   return (
      <div className="register-form">
         {contextHolder}
         <div className="all-items-register">
            <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Register</h2>

            <Form
               form={form}
               name="registerForm"
               onFinish={onFinish}
               autoComplete="off"
               layout="vertical"
            >
               {/* Username */}
               <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Please enter your username!" }]}
               >
                  <Input
                     prefix={<UserOutlined />}
                     placeholder="Username"
                     className="input-field"
                  />
               </Form.Item>

               {/* Email */}
               <Form.Item
                  name="email"
                  rules={[
                     { required: true, message: "Please enter your email!" },
                     { type: "email", message: "Enter a valid email!" },
                  ]}
               >
                  <Input
                     prefix={<MailOutlined />}
                     placeholder="Email"
                     className="input-field-register"
                  />
               </Form.Item>

               {/* Password */}
               <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please enter your password!" }]}
               >
                  <Input.Password
                     prefix={<LockOutlined />}
                     placeholder="Password"
                     className="input-field"
                  />
               </Form.Item>

               {/* Submit Button */}
               <Form.Item>
                  <Button
                     type="primary"
                     htmlType="submit"
                     className="register-btn-full"
                     block
                  >
                     Register
                  </Button>
               </Form.Item>

               {/* Login Link */}
               <Form.Item className="signup-link-register" style={{ textAlign: "center" }}>
                  <p>
                     Already have an account? <Link to="/login">Login</Link>
                  </p>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};

export default Register;
