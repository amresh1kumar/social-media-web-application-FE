import "./ProfileSection.css";
import Profileimag from "./image.png";
import { useEffect, useState } from "react";
import API from "../API/api";
import PostCard from "../components/PostCard";
import { useAuth } from "../Context/AuthContext";
import "./ProfileSection.css"; // yeh add karna

export default function PostSection() {
   const [posts, setPosts] = useState([]);
   const { user } = useAuth();

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
   const avatarUrl = user?.avatar || user?.photoURL || "/default-avatar.png";
   const bio = user?.bio || "";

   return (
      <div className="profile-page">
         {/* Profile-style Header */}
         <div className="profile-header">
            <img src={Profileimag} alt="avatar" className="profile-avatar" />
            <div className="profile-info">
               <h2>{displayName}</h2>
               {bio && <p>{bio}</p>}
               <div className="profile-stats">
                  <span><b>{posts.length}</b> posts</span>
                  {/* <span><b>{user?.followers?.length || 0}</b> followers</span> */}
                  {/* <span><b>{user?.following?.length || 0}</b> following</span> */}
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