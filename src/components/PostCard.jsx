// export default function PostCard({ post, onLike }) {
//    // Use CRA environment variable
//    const API_URL = process.env.REACT_APP_API_URL?.replace("/api", "") || "http://localhost:5000";

//    return (
//       <div style={{ border: "1px solid #eee", padding: 12, marginBottom: 8 }}>
//          <div style={{ fontWeight: 600 }}>{post.author?.username || "User"}</div>
//          <div>{post.content}</div>
//          {post.image && (
//             <img
//                src={
//                   post.image.startsWith("http")
//                      ? post.image
//                      : API_URL + "/uploads/" + post.image
//                }
//                alt="post"
//                style={{ maxWidth: 300, marginTop: 8 }}
//             />
//          )}


//          <div style={{ marginTop: 8 }}>
//             <button onClick={() => onLike(post._id)}>
//                Like ({post.likes?.length || 0})
//             </button>
//          </div>
//       </div>
//    );
// }




import "./PostCard.css";

export default function PostCard({ post, onLike }) {
   const API_URL =
      process.env.REACT_APP_API_URL?.replace("/api", "") || "http://localhost:5000";

   return (
      <div className="post-card">
         {/* Post Header */}
         <div className="post-header">
            {/* <img
               className="post-avatar"
               src="/default-avatar.png"
               alt="profile"
            /> */}
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
            <button
               className="icon-btn"
               onClick={() => onLike(post._id)}
            >
               ❤
            </button>
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

         {/* Add comment UI (static for now) */}
         {/* <div className="post-add-comment">
            <input placeholder="Add a comment..." />
         </div> */}
      </div>
   );
}
