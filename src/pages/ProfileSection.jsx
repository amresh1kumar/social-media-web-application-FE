import "./ProfileSection.css";
import Profileimag from "./image1.png";
import { useEffect, useState } from "react";
import API from "../API/api";
import PostCard from "../components/PostCard";
import { useAuth } from "../Context/AuthContext";
import "./ProfileSection.css"; // yeh add karna

export default function PostSection() {
   const [posts, setPosts] = useState([]);
   const { user } = useAuth();

   // username ka first letter (capital)
   const firstLetter = user?.username ? user.username[0].toUpperCase() : "";

   useEffect(() => {
      if (user?._id) {
         fetchUserPosts();
      }
   }, [user]);

   const fetchUserPosts = async () => {
      try {
         const res = await API.get("/posts?limit=50");
         const myPosts = (res.data || []).filter(
            (p) => p.author?._id === user?._id
         );
         setPosts(myPosts);
      } catch (err) {
         console.error("Failed to fetch posts", err);
      }
   };

   // Header me basic info (simple fallback)
   const displayName = user?.username || user?.name || "My Profile";
   const displayEmail = user?.email || user?.name || "My Profile";

   return (
      <div className="profile-page">
         {/* Profile-style Header */}
         <div className="profile-header">
            {user.avatar ? (
               // agar avatar hai
               <img
                  src={`http://localhost:5000${user.avatar}`}
                  alt="avatar"
                  width={100}
                  style={{ borderRadius: "50%", marginBottom: 10 }}
               />
            ) : (
               // default avatar me first letter show karenge
               <div
                  style={{
                     width: 100,
                     height: 100,
                     borderRadius: "50%",
                     backgroundColor: "#4caf50", // green circle
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     fontSize: 40,
                     color: "white",
                     marginBottom: 10,
                  }}
               >
                  {firstLetter}
               </div>
            )}
            <div className="profile-info">
               <h2>Username : {displayName}</h2>
               <p> Email : {displayEmail}</p>
               <div className="profile-stats">
                  <span><b>{posts.length}</b> posts</span>
               </div>
            </div>
         </div>

         {/* Posts Grid (PostCard ko grid me dikhaya hai) */}
         {posts.length > 0 ? (
            <div className="profile-posts">
               {posts.map((p) => (
                  <div key={p._id} className="post-item">
                     <PostCard post={p} onLike={() => { }} />
                  </div>
               ))}
            </div>
         ) : (
            <p className="no-posts">No posts yet</p>
         )}
      </div>
   );
}