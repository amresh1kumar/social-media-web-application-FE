// import { useEffect, useRef, useState } from "react";
// import API from "../API/api";
// import CreatePost from "../components/CreatePost";
// import PostCard from "../components/PostCard";
// import useSocket from "../hooks/useSocket";
// import InfiniteScroll from "react-infinite-scroll-component";
// import './Feed.css'

// const LIMIT = 5;
// const MIN_SPINNER_MS = 2000; // spinner kitni der dikhe (ms)

// export default function Feed() {
//    const [posts, setPosts] = useState([]);
//    const [hasMore, setHasMore] = useState(true);
//    const offsetRef = useRef(0);
//    const socketRef = useSocket();

//    // Fetch posts initially
//    useEffect(() => {
//       fetchMore();
//    }, []);

//    // Listen to socket for new posts
//    useEffect(() => {
//       const s = socketRef.current;
//       if (!s) return;

//       const onNew = (p) => addPostsUnique([p]);
//       s.on("new_post", onNew);

//       return () => s.off("new_post", onNew);
//    }, [socketRef]);

//    // Helper to add posts uniquely by _id
//    const addPostsUnique = (newPosts) => {
//       setPosts((prev) => {
//          const all = [...newPosts, ...prev]; // prepend new posts
//          const uniqueMap = {};
//          all.forEach(p => { uniqueMap[p._id] = p; });
//          return Object.values(uniqueMap);
//       });
//    };

//    const fetchMore = async () => {
//       const t0 = Date.now();

//       const res = await API.get(`/posts?limit=${LIMIT}&skip=${offsetRef.current}`);
//       const data = res.data || [];

//       // Force spinner for at least MIN_SPINNER_MS
//       const elapsed = Date.now() - t0;
//       if (elapsed < MIN_SPINNER_MS) {
//          await new Promise((r) => setTimeout(r, MIN_SPINNER_MS - elapsed));
//       }

//       addPostsUnique(data);
//       offsetRef.current += data.length;
//       if (data.length < LIMIT) setHasMore(false);
//    };

//    const onCreated = (post) => addPostsUnique([post]);



//    const onLike = async (id) => {
//       try {
//          const res = await API.post(`/posts/${id}/like`);
//          const updatedPost = res.data; // backend returns updated post

//          setPosts((prev) =>
//             prev.map((p) => (p._id === id ? updatedPost : p))
//          );
//       } catch (err) {
//          console.error("Like failed:", err);
//       }
//    };


//    return (
//       <div style={{ padding: 20 }}>
//          <div style={{ textAlign: 'center', position: "sticky", top: 55, zIndex: 10, background: "white" }}>
//             <h2 style={{ display: 'inline-block', color: "tomato" }}>
//                Your Feed
//             </h2>
//          </div>

//          <CreatePost onCreated={onCreated} />

//          <InfiniteScroll
//             dataLength={posts.length}
//             next={fetchMore}
//             hasMore={hasMore}
//             loader={
//                <div style={{ display: "grid", placeItems: "center", padding: 16 }}>
//                   <div className="spinner" />
//                </div>
//             }
//             endMessage={
//                posts.length > 0 ? (
//                   <p style={{ textAlign: "center", color: "#666", padding: 10 }}>
//                      You're all caught up 👌
//                   </p>
//                ) : null
//             }
//          >
//             {/* {posts.map((p) => (

//                <PostCard key={p._id} post={p} onLike={onLike} />
//             ))} */}
//             {posts
//                .filter((p) => p.user !== null)   // 🚀 skip posts without user
//                .map((p) => (
//                   <PostCard key={p._id} post={p} onLike={onLike} />
//                ))}

//          </InfiniteScroll>
//       </div>
//    );
// }

import { useEffect, useRef, useState } from "react";
import API from "../API/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import useSocket from "../hooks/useSocket";
import InfiniteScroll from "react-infinite-scroll-component";
import './Feed.css';

const LIMIT = 5;
const MIN_SPINNER_MS = 2000; // spinner kitni der dikhe (ms)

export default function Feed() {
   const [posts, setPosts] = useState([]);
   const [hasMore, setHasMore] = useState(true);
   const offsetRef = useRef(0);
   const socketRef = useSocket();

   // Fetch posts initially
   useEffect(() => {
      fetchMore();
   }, []);

   // Listen to socket for new posts
   useEffect(() => {
      const s = socketRef.current;
      if (!s) return;

      const onNew = (p) => addPostsUnique([p]);
      s.on("new_post", onNew);

      return () => s.off("new_post", onNew);
   }, [socketRef]);

   // Helper to add posts uniquely by _id
   const addPostsUnique = (newPosts) => {
      setPosts((prev) => {
         const all = [...newPosts, ...prev]; // prepend new posts
         const uniqueMap = {};
         all.forEach(p => {
            if (p._id) uniqueMap[p._id] = p; // ✅ only use posts with valid _id
         });
         return Object.values(uniqueMap);
      });
   };

   const fetchMore = async () => {
      const t0 = Date.now();

      const res = await API.get(`/posts?limit=${LIMIT}&skip=${offsetRef.current}`);
      const data = res.data || [];

      // Force spinner for at least MIN_SPINNER_MS
      const elapsed = Date.now() - t0;
      if (elapsed < MIN_SPINNER_MS) {
         await new Promise((r) => setTimeout(r, MIN_SPINNER_MS - elapsed));
      }

      addPostsUnique(data);
      offsetRef.current += data.length;
      if (data.length < LIMIT) setHasMore(false);
   };

   const onCreated = (post) => addPostsUnique([post]);

   const onLike = async (id) => {
      try {
         const res = await API.post(`/posts/${id}/like`);
         const updatedPost = res.data; // backend returns updated post

         setPosts((prev) =>
            prev.map((p) => (p._id === id ? updatedPost : p))
         );
      } catch (err) {
         console.error("Like failed:", err);
      }
   };

   return (
      <div style={{ padding: 20}}>
         <div style={{ textAlign: 'center', position: "sticky", top: 55, zIndex: 10, background: "white" }}>
            <h2 style={{ display: 'inline-block', color: "tomato" }}>
               Your Feed
            </h2>
         </div>

         <CreatePost onCreated={onCreated} />

         <InfiniteScroll
                     style={{border:'1px solid red' }}
            dataLength={posts.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={
               <div style={{ display: "grid", placeItems: "center", padding: 16 }}>
                  <div className="spinner" />
               </div>
            }
            endMessage={
               posts.length > 0 ? (
                  <p style={{ textAlign: "center", color: "#666", padding: 10 }}>
                     You're all caught up 👌
                  </p>
               ) : null
            }
         >
            {posts
               .filter((p) => p.user !== null && p._id) // ✅ skip posts without user or _id
               .map((p) => (
                     
                  <div style={{border:'4px solid red' }}  >

                  <PostCard
                     key={p._id} // ✅ always unique key
                     post={p}
                     onLike={onLike}
                  />
                  </div>
               ))}
         </InfiniteScroll>
      </div>
   );
}
