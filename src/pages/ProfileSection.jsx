import "./ProfileSection.css";
import Profileimag from "./image.png";

// export default function ProfileSection() {
//    // Static user data
//    const user = {
//       username: "john_doe",
//       avatar: Profileimag,
//       bio: "Full Stack Developer | Love React & Node.js",
//       posts: 12,
//       followers: 340,
//       following: 180,
//    };

//    // Static posts
//    const posts = [
//       "https://picsum.photos/300?random=1",
//       "https://picsum.photos/300?random=2",
//       "https://picsum.photos/300?random=3",
//       "https://picsum.photos/300?random=4",
//       "https://picsum.photos/300?random=5",
//       "https://picsum.photos/300?random=6",
//    ];

//    return (
//       <div className="profile-page">
//          {/* Top Profile Section */}
//          <div className="profile-header">
//             <img src={user.avatar} alt="avatar" className="profile-avatar" />
//             <div className="profile-info">
//                <h2>{user.username}</h2>
//                <p>{user.bio}</p>
//                <div className="profile-stats">
//                   <span><b>{user.posts}</b> posts</span>
//                   <span><b>{user.followers}</b> followers</span>
//                   <span><b>{user.following}</b> following</span>
//                </div>
//             </div>
//          </div>

//          {/* Posts Grid */}
//          <div className="profile-posts">
//             {posts.map((src, idx) => (
//                <div key={idx} className="post-item">
//                   <img src={src} alt={`post-${idx}`} />
//                </div>
//             ))}
//          </div>
//       </div>
//    );
// }


// import { useEffect, useState } from "react";
// import API from "../API/api";
// import PostCard from "../components/PostCard";
// import { useAuth } from "../Context/AuthContext";

// export default function PostSection() {
//    const [posts, setPosts] = useState([]);
//    const { user } = useAuth();

//    useEffect(() => {
//       if (user?._id) {
//          fetchUserPosts();
//       }
//    }, [user]);

//    const fetchUserPosts = async () => {
//       try {
//          const res = await API.get("/posts?limit=50");
//          const myPosts = (res.data || []).filter(
//             (p) => p.author?._id === user?._id
//          );
//          setPosts(myPosts);
//       } catch (err) {
//          console.error("Failed to fetch posts", err);
//       }
//    };

//    return (
//       <div style={{ padding: 20 }}>
//          <h2
//             style={{
//                textAlign: "center",
//                color: "tomato",
//                marginBottom: 20,
//             }}
//          >
//             My Posts
//          </h2>

//          {posts.length > 0 ? (
//             posts.map((p) => (
//                <PostCard key={p._id} post={p} onLike={() => { }} />
//             ))
//          ) : (
//             <p style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
//                No posts yet
//             </p>
//          )}
//       </div>
//    );
// }
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
                  <span><b>{user?.followers?.length || 0}</b> followers</span>
                  <span><b>{user?.following?.length || 0}</b> following</span>
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