import React from "react";
import "./PostCard.css";

export default function PostCard({ post, onLike }) {
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
            <button className="icon-btn">📤</button>
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

         {/* Add comment */}
         <div className="post-add-comment">
            <input placeholder="Add a comment..." />
         </div>
      </div>
   );
}

