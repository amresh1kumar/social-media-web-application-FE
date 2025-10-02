// import { useState } from "react";
// import API from "../API/api";

// export default function CreatePost({ onCreated }) {
//    const [text, setText] = useState("");
//    const [file, setFile] = useState(null);

//    const onSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          const form = new FormData();
//          form.append("content", text);
//          if (file) form.append("image", file);

//          const res = await API.post("/posts", form, {
//             headers: { "Content-Type": "multipart/form-data" },
//          });

//          setText("");
//          setFile(null);
//          onCreated(res.data);
//       } catch (err) {
//          alert("Create post failed");
//       }
//    };

//    return (
//       <form onSubmit={onSubmit} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
//          <textarea
//             placeholder="What's on your mind?"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             rows={3}
//             style={{ width: "100%" }}
//          />
//          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
//          <button type="submit">Post</button>
//       </form>
//    );
// }

// import { useState } from "react";
// import API from "../API/api";
// import "./CreatePost.css"; // <- import the external stylesheet

// export default function CreatePost({ onCreated, currentUser = { username: "you", avatar: "/default-avatar.png", location: "Unknown" } }) {
//    const [text, setText] = useState("");
//    const [file, setFile] = useState(null);

//    const onSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          const form = new FormData();
//          form.append("content", text);
//          if (file) form.append("image", file);

//          const res = await API.post("/posts", form, {
//             headers: { "Content-Type": "multipart/form-data" },
//          });

//          setText("");
//          setFile(null);
//          onCreated(res.data);
//       } catch (err) {
//          alert("Create post failed");
//       }
//    };

//    return (
//       <div className="post-card">
//          {/* Image preview */}
//          {file && (
//             <img
//                className="post-image"
//                src={URL.createObjectURL(file)}
//                alt="preview"
//             />
//          )}

//          {/* Caption */}
//          <div className="post-caption">
//             <span className="post-caption-username">{currentUser.username}</span>
//             <span className="post-caption-text">{text}</span>
//          </div>

//          {/* Form */}
//          <form className="post-form" onSubmit={onSubmit}>
//             <textarea
//                className="post-textarea"
//                placeholder="Write a caption..."
//                value={text}
//                onChange={(e) => setText(e.target.value)}
//                rows={2}
//             />
//             <input
//                className="post-file"
//                type="file"
//                accept="image/*"
//                onChange={(e) => setFile(e.target.files[0])}
//             />
//             <button className="post-submit" type="submit">Post</button>
//          </form>
//       </div>
//    );
// }

import { useState } from "react";
import API from "../API/api";
import { Modal, Button, Upload, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../Context/AuthContext";  // 👈 import context

export default function CreatePost({ onCreated }) {
   const { user } = useAuth();   // 👈 get current logged-in user
   const [text, setText] = useState("");
   const [file, setFile] = useState(null);
   const [open, setOpen] = useState(false);

   const onSubmit = async () => {
      try {
         const form = new FormData();
         form.append("content", text);
         if (file) form.append("image", file);

         const res = await API.post("/posts", form, {
            headers: { "Content-Type": "multipart/form-data" },
         });

         setText("");
         setFile(null);
         setOpen(false);
         onCreated(res.data);
      } catch (err) {
         alert("Create post failed");
      }
   };

   return (
      <>
         {/* Open Button */}
         <Button style={{ position: 'sticky', top: '100px' }} type="primary" onClick={() => setOpen(true)}>
            + Create Post

         </Button>

         {/* AntD Modal */}
         <Modal
            title="Create New Post"
            open={open}
            onOk={onSubmit}
            onCancel={() => setOpen(false)}
            okText="Post"
            cancelText="Cancel"
         >
            {/* Username from context */}
            <p><b>{user?.username || "Guest"}</b></p>

            {/* Caption input */}
            <Input.TextArea
               rows={3}
               placeholder="Write a caption..."
               value={text}
               onChange={(e) => setText(e.target.value)}
            />

            {/* Image Upload */}
            <Upload
               beforeUpload={(file) => {
                  setFile(file);
                  return false; // prevent auto upload
               }}
               maxCount={1}
               accept="image/*"
            >
               <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>

            {/* Image preview */}
            {file && (
               <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{ marginTop: 10, maxWidth: "100%", borderRadius: 8 }}
               />
            )}
         </Modal>
      </>
   );
}

