// import React from "react";
// import { Form, Input, Button, message } from "antd";
// import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../API/api"; // ✅ same API instance used in login
// import { useAuth } from "../Context/AuthContext";
// import "./Register.css";

// const Register = () => {
//    const [form] = Form.useForm();
//    const navigate = useNavigate();
//    const { login } = useAuth();
//    const [messageApi, contextHolder] = message.useMessage();

//    const onFinish = async (values) => {
//       try {
//          const res = await API.post("/auth/register", {
//             username: values.username,
//             email: values.email,
//             password: values.password,
//          });

//          login(res.data.user, res.data.token);
//          messageApi.success("🎉 Registered successfully!");
//          setTimeout(() => navigate("/feed"), 600);
//       } catch (err) {
//          console.error(err.response?.data || err.message);
//          if (err.response?.status === 400) {
//             messageApi.error(err.response.data.message || "User already exists!");
//          } else {
//             messageApi.error("⚠️ Server error! Please try again later.");
//          }
//       }
//    };

//    return (
//       <div className="register-form">
//          {contextHolder}
//          <div className="all-items-register">
//             <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Register</h2>

//             <Form
//                form={form}
//                name="registerForm"
//                onFinish={onFinish}
//                autoComplete="off"
//                layout="vertical"
//             >
//                {/* Username */}
//                <Form.Item
//                   name="username"
//                   rules={[{ required: true, message: "Please enter your username!" }]}
//                >
//                   <Input
//                      prefix={<UserOutlined />}
//                      placeholder="Username"
//                      className="input-field"
//                   />
//                </Form.Item>

//                {/* Email */}
//                <Form.Item
//                   name="email"
//                   rules={[
//                      { required: true, message: "Please enter your email!" },
//                      { type: "email", message: "Enter a valid email!" },
//                   ]}
//                >
//                   <Input
//                      prefix={<MailOutlined />}
//                      placeholder="Email"
//                      className="input-field-register"
//                   />
//                </Form.Item>

//                {/* Password */}
//                <Form.Item
//                   name="password"
//                   rules={[{ required: true, message: "Please enter your password!" }]}
//                >
//                   <Input.Password
//                      prefix={<LockOutlined />}
//                      placeholder="Password"
//                      className="input-field"
//                   />
//                </Form.Item>

//                {/* Submit Button */}
//                <Form.Item>
//                   <Button
//                      type="primary"
//                      htmlType="submit"
//                      className="register-btn-full"
//                      block
//                   >
//                      Register
//                   </Button>
//                </Form.Item>

//                {/* Login Link */}
//                <Form.Item className="signup-link-register" style={{ textAlign: "center" }}>
//                   <p>
//                      Already have an account? <Link to="/login">Login</Link>
//                   </p>
//                </Form.Item>
//             </Form>
//          </div>
//       </div>
//    );
// };

// export default Register;


import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import API from "../API/api";
import { useAuth } from "../Context/AuthContext";
import "./Register.css";

const Register = () => {
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const { login } = useAuth();
   const [messageApi, contextHolder] = message.useMessage();

   // ✅ File state
   const [avatar, setAvatar] = useState(null);

   const onFinish = async (values) => {
      try {
         // ✅ create formData (for file upload)
         const formData = new FormData();
         formData.append("username", values.username);
         formData.append("email", values.email);
         formData.append("password", values.password);
         if (avatar) formData.append("avatar", avatar); // ✅ add image file

         const res = await API.post("/auth/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
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
                  <Input prefix={<UserOutlined />} placeholder="Username" className="input-field" />
               </Form.Item>

               {/* Email */}
               <Form.Item
                  name="email"
                  rules={[
                     { required: true, message: "Please enter your email!" },
                     { type: "email", message: "Enter a valid email!" },
                  ]}
               >
                  <Input prefix={<MailOutlined />} placeholder="Email" className="input-field" />
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

               {/* ✅ Avatar Upload */}
               <Form.Item label="Profile Picture">
                  <input
                     type="file"
                     accept="image/*"
                     onChange={(e) => setAvatar(e.target.files[0])}
                  />
               </Form.Item>

               {avatar && (
                  <img
                     src={URL.createObjectURL(avatar)}
                     alt="preview"
                     style={{ width: 50, height: 50, borderRadius: "50%"}}
                  />
               )}


               {/* Submit Button */}
               <Form.Item>
                  <Button type="primary" htmlType="submit" className="register-btn-full" block>
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
