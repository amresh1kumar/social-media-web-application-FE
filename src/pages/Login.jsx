// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../API/api";
// import { useAuth } from "../Context/AuthContext";
// import "./Login.css"; 

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
//       <div className="login-page">
//          <div className="login-container">
//             <h2 className="login-title">Login</h2>
//             <form onSubmit={onSubmit} className="login-form">
//                <div className="input-group">
//                   <input
//                      type="text"
//                      placeholder="Username"
//                      value={email}
//                      onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <span className="icon">👤</span>
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
//                <div className="options">
//                   <label>
//                      <input type="checkbox" /> Remember me
//                   </label>
//                   <Link to="/forgot" className="forgot-link">Forgot password?</Link>
//                </div>
//                <button type="submit" className="login-btn">Login</button>
//             </form>
//             <p className="register-text">
//                Don’t have an account? <Link to="/register">Register</Link>
//             </p>
//          </div>
//       </div>
//    );
// }
import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import API from "../API/api";
import { useAuth } from "../Context/AuthContext";
import "./Login.css";

const Login = () => {
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const { login } = useAuth();

   // ✅ Ant Design message hook
   const [messageApi, contextHolder] = message.useMessage();

   const onFinish = async (values) => {
      try {
         const res = await API.post("/auth/login", {
            email: values.email,
            password: values.password,
         });

         login(res.data.user, res.data.token);

         messageApi.success("Login successful!");
         setTimeout(() => navigate("/feed"), 800);
      } catch (err) {
         console.error("Login error:", err.response?.data || err.message);

         if (err.response?.status === 400) {
            messageApi.error(err.response.data.message || "Invalid credentials!");
         } else {
            messageApi.error("Server error! Please try again later.");
         }
      }
   };

   return (
      <div className="login-form">
         {/* ✅ This is needed to render the message popup */}
         {contextHolder}

         <div className="all-items">
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>
            <Form
               form={form}
               name="login"
               layout="vertical"
               initialValues={{ remember: true }}
               onFinish={onFinish}
            >
               <Form.Item
                  name="email"
                  rules={[
                     { required: true, message: "Please input your email!" },
                     { type: "email", message: "Enter a valid email!" },
                  ]}
               >
                  <Input prefix={<UserOutlined />}
                     className="input-field"
                     placeholder="Email" />
               </Form.Item>

               <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
               >
                  <Input.Password prefix={<LockOutlined />} placeholder="Password" className="input-field"
                  />
               </Form.Item>

               {/* <Form.Item>
                  <div className="rem-forgot-inner">
                     <Checkbox>Remember me</Checkbox>
                     <Link to="/forgot">Forgot password?</Link>
                  </div>
               </Form.Item> */}

               <Form.Item>
                  <Button type="primary" htmlType="submit"
                     className="login-btn-full"
                     block >
                     Login
                  </Button>
               </Form.Item>

               <div className="signup-link">
                  Don’t have an account? <Link to="/register">Register</Link>
               </div>
            </Form>
         </div>
      </div>
   );
};

export default Login;
