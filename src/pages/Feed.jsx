// import { useEffect, useState } from "react";
// import API from "../API/api";
// import CreatePost from "../components/CreatePost";
// import PostCard from "../components/PostCard";
// import useSocket from "../hooks/useSocket";

// export default function Feed() {
//    const [posts, setPosts] = useState([]);
//    const socketRef = useSocket();

//    useEffect(() => {
//       fetchPosts();
//    }, []);

//    useEffect(() => {
//       const s = socketRef.current;
//       if (!s) return;
//       s.on("new_post", (p) => setPosts((prev) => [p, ...prev]));
//       return () => s.off("new_post");
//    }, [socketRef.current]);

//    const fetchPosts = async () => {
//       const res = await API.get("/posts?limit=20");
//       setPosts(res.data || []);
//    };

//    const onCreated = (post) => setPosts((prev) => [post, ...prev]);

//    const onLike = async (id) => {
//       await API.post(`/posts/${id}/like`);
//       fetchPosts();
//    };

//    return (
//       <div style={{ padding: 20, }}>
//          <h2 style={{textAlign:'center' ,position:'sticky',top:11 ,color:'tomato'}}>Your Feed</h2>
//          <div>
//          <CreatePost onCreated={onCreated} />
//          {posts.map((p) => (
//             <PostCard key={p._id} post={p} onLike={onLike} />
//          ))}
//          </div>
//       </div>
//    );
// }


// import { useEffect, useRef, useState } from "react";
// import API from "../API/api";
// import CreatePost from "../components/CreatePost";
// import PostCard from "../components/PostCard";
// import useSocket from "../hooks/useSocket";
// import './Feed.css'
// import InfiniteScroll from "react-infinite-scroll-component";

// const LIMIT = 8;

// export default function Feed() {
//    const [posts, setPosts] = useState([]);
//    const [hasMore, setHasMore] = useState(true);
//    const offsetRef = useRef(0); // server skip ke liye offset
//    const socketRef = useSocket();

//    // initial load
//    useEffect(() => {
//       fetchMore();
//    }, []);

//    // socket: new posts top pe
//    useEffect(() => {
//       const s = socketRef.current;
//       if (!s) return;
//       const onNew = (p) => setPosts((prev) => [p, ...prev]);
//       s.on("new_post", onNew);
//       return () => s.off("new_post", onNew);
//    }, [socketRef]);

//    const fetchMore = async () => {
//       const res = await API.get(`/posts?limit=${LIMIT}&skip=${offsetRef.current}`);
//       const data = res.data || [];
//       setPosts((prev) => [...prev, ...data]);
//       offsetRef.current += data.length;
//       if (data.length < LIMIT) setHasMore(false);
//    };

//    const onCreated = (post) => setPosts((prev) => [post, ...prev]);

//    const onLike = async (id) => {
//       await API.post(`/posts/${id}/like`);
//       // optional: UI update yahin karni ho to karo, warna itna enough hai
//    };

//    return (
//       <div style={{ padding: 20 }}>
//          <h2 style={{ textAlign: "center", position: "sticky", top: 11, color: "tomato" }}>
//             Your Feed
//          </h2>

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
//             {posts.map((p) => (
//                <PostCard key={p._id} post={p} onLike={onLike} />
//             ))}
//          </InfiniteScroll>
//       </div>
//    );
// }


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

//    useEffect(() => {
//       fetchMore();
//    }, []);

//    useEffect(() => {
//       const s = socketRef.current;
//       if (!s) return;
//       const onNew = (p) => setPosts((prev) => [p, ...prev]);
//       s.on("new_post", onNew);
//       return () => s.off("new_post", onNew);
//    }, [socketRef]);

//    const fetchMore = async () => {
//       const t0 = Date.now();

//       const res = await API.get(`/posts?limit=${LIMIT}&skip=${offsetRef.current}`);
//       const data = res.data || [];

//       // Force spinner for at least MIN_SPINNER_MS
//       const elapsed = Date.now() - t0;
//       if (elapsed < MIN_SPINNER_MS) {
//          await new Promise((r) => setTimeout(r, MIN_SPINNER_MS - elapsed));
//       }

//       setPosts((prev) => [...prev, ...data]);
//       offsetRef.current += data.length;
//       if (data.length < LIMIT) setHasMore(false);
//    };

//    const onCreated = (post) => setPosts((prev) => [post, ...prev]);

//    const onLike = async (id) => {
//       await API.post(`/posts/${id}/like`);
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
//             {posts.map((p) => (
//                <PostCard key={p._id} post={p} onLike={onLike} />
//             ))}
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
import './Feed.css'

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
         all.forEach(p => { uniqueMap[p._id] = p; });
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
      <div style={{ padding: 20 }}>
         <div style={{ textAlign: 'center', position: "sticky", top: 55, zIndex: 10, background: "white" }}>
            <h2 style={{ display: 'inline-block', color: "tomato" }}>
               Your Feed
            </h2>
         </div>

         <CreatePost onCreated={onCreated} />

         <InfiniteScroll
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
            {posts.map((p) => (
               <PostCard key={p._id} post={p} onLike={onLike} />
            ))}
         </InfiniteScroll>
      </div>
   );
}
