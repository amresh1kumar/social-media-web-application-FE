// import "./PostCard.css";

// export default function PostCard({ post, onLike }) {
//    const API_URL =
//       process.env.REACT_APP_API_URL?.replace("/api", "") || "http://localhost:5000";

//    return (
//       <div className="post-card">
//          {/* Post Header */}
//          <div className="post-header">

//             <span className="post-username">{post.author?.username || "User"}</span>
//          </div>

//          {/* Post Image */}
//          {post.image && (
//             <div className="post-image-wrapper">
//                <img
//                   className="post-image"
//                   src={
//                      post.image.startsWith("http")
//                         ? post.image
//                         : API_URL + "/uploads/" + post.image
//                   }
//                   alt="post"
//                />
//             </div>
//          )}

//          {/* Actions */}
//          <div className="post-actions">
//             <button
//                className="icon-btn"
//                onClick={() => onLike(post._id)}
//             >
//                ❤
//             </button>
//             <button className="icon-btn">💬</button>
//             <button className="icon-btn">📤</button>
//          </div>

//          {/* Likes */}
//          <div className="post-likes">
//             {post.likes?.length || 0} likes
//          </div>

//          {/* Caption */}
//          <div className="post-caption">
//             <span className="post-caption-username">
//                {post.author?.username || "User"}
//             </span>{" "}
//             {post.content}
//          </div>

//          {/* Add comment UI (static for now) */}
//          {/* <div className="post-add-comment">
//             <input placeholder="Add a comment..." />
//          </div> */}
//       </div>
//    );
// }


import "./PostCard.css";

export default function PostCard({ post, onLike }) {
   const API_URL =
      process.env.REACT_APP_API_URL?.replace("/api", "") || "http://localhost:5000";

   // Profile image URL (default if not available)
   const profileImg =
      post.author?.profilePicture
         ? post.author.profilePicture.startsWith("http")
            ? post.author.profilePicture
            : API_URL + "/uploads/" + post.author.profilePicture
         : "https://via.placeholder.com/40"; // default profile pic

   return (
      <div className="post-card">
         {/* Post Header */}
         <div className="post-header">
            <img
               className="post-profile-pic"
               src={profileImg}
               // alt={post.author?.username || "User"}
            />
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
            <button className="icon-btn" onClick={() => onLike(post._id)}>❤</button>
            <button className="icon-btn">💬</button>
            <button className="icon-btn">📤</button>
         </div>

         {/* Likes */}
         <div className="post-likes">
            {post.likes?.length || 0} likes
         </div>

         {/* Caption */}
         <div className="post-caption">
            <span className="post-caption-username">
               {post.author?.username || "User"}
            </span>{" "}
            {post.content}
         </div>
      </div>
   );
}
