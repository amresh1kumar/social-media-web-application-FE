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

