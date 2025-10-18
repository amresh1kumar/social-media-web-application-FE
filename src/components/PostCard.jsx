import React, { useState } from "react";
import axios from "axios";
import {Tooltip} from 'antd';
import "./PostCard.css";
import { useAuth } from "../Context/AuthContext";

export default function PostCard({ post, onLike }) {
   const { user } = useAuth();
   const [commentText, setCommentText] = useState("");
   const [comments, setComments] = useState(post.comments || []);

   const API_URL =
      process.env.REACT_APP_API_URL?.replace("/api", "") || "http://localhost:5000";

   // ✅ Function to get avatar or default letter
   const getProfileAvatar = (author, size = 40) => {
      const firstLetter = author?.username?.[0]?.toUpperCase() || "U";

      if (author?.avatar) {
         const avatarSrc = author.avatar.startsWith("http")
            ? author.avatar
            : API_URL + author.avatar;

         return (
            <img
               src={avatarSrc}
               alt={author.username}
               style={{
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: 10,
               }}
            />
         );
      }

      // Default letter avatar
      return (
         <div
            style={{
               width: size,
               height: size,
               borderRadius: "50%",
               backgroundColor: "#1890ff",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               color: "white",
               fontWeight: "bold",
               fontSize: size / 2,
               marginRight: 10,
            }}
         >
            {firstLetter}
         </div>
      );
   };

   // ✅ Handle Add Comment
   const handleAddComment = async () => {
      if (!commentText.trim()) return;

      try {
         const token = localStorage.getItem("token");
         const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/posts/${post._id}/comment`,
            { text: commentText },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         // backend returns updated post with populated comments
         setComments(res.data.comments);
         setCommentText("");
      } catch (err) {
         console.error("Error adding comment:", err);
         alert("Failed to add comment");
      }
   };

   return (
      <div className="post-card">
         {/* Header: Avatar + Username */}
         <div className="post-header">
            {getProfileAvatar(post.author, 40)}
            <span className="post-username">{post.author?.username || "User"}</span>
         </div>

         {/* Post Image */}
         {post.image && (
            <div className="post-image-wrapper">
               <img
                  className="post-image"
                  src={
                     post.image.startsWith("http")
                        ? post.image
                        : API_URL + "/uploads/" + post.image
                  }
                  alt="post"
               />
            </div>
         )}

         {/* Actions */}
         <div className="post-actions">
            <button className="icon-btn" onClick={() => onLike(post._id)}>
               ❤
            </button>
            <button className="icon-btn">💬</button>
         </div>

         {/* Likes */}
         <div className="post-likes">{post.likes?.length || 0} likes</div>

         {/* Caption */}
         <div className="post-caption">
            <span className="post-caption-username">
               {post.author?.username || "User"}
            </span>{" "}
            {post.content}
         </div>

         {/* Comments List */}

         <Tooltip title="scroll to show all comment" >
            <div className="post-comments">
               {comments.length > 0 ? (
                  comments.map((c, i) => (
                     <div key={i} className="comment">
                        <strong>{c.user?.username || "User"}:</strong> {c.text}
                     </div>
                  ))
               ) : (
                  <div className="no-comments">No comments yet</div>
               )}
            </div>
         </Tooltip>


         {/* Add comment */}
         <div className="post-add-comment">
            <input
               placeholder="Add a comment..."
               value={commentText}
               onChange={(e) => setCommentText(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
            <button onClick={handleAddComment}>Post</button>
         </div>
      </div>
   );
}
