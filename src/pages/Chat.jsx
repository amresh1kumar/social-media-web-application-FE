// import { useEffect, useState } from "react";
// import API from "../API/api";
// import useSocket from "../hooks/useSocket";
// import { useAuth } from "../Context/AuthContext";

// export default function Chat() {
//    const [convs, setConvs] = useState([]);
//    const [selected, setSelected] = useState(null);
//    const [messages, setMessages] = useState([]);
//    const [text, setText] = useState("");
//    const [search, setSearch] = useState("");   // 🔹 search input
//    const [results, setResults] = useState([]); // 🔹 search results
//    const { user } = useAuth();
//    const socketRef = useSocket();

//    // Fetch conversations on mount
//    useEffect(() => {
//       const fetchConvs = async () => {
//          const res = await API.get("/conversations");
//          setConvs(res.data);
//       };
//       fetchConvs();
//    }, []);

//    // Listen for incoming messages
//    useEffect(() => {
//       const s = socketRef.current;
//       if (!s) return;

//       s.on("receive_message", (msg) => {
//          if (selected && msg.conversationId === selected._id) {
//             setMessages((prev) => [...prev, msg]);
//          }
//       });

//       return () => s.off("receive_message");
//    }, [selected]);

//    // Open conversation
//    const openConv = async (conv) => {
//       setSelected(conv);
//       const res = await API.get(`/conversations/${conv._id}/messages`);
//       setMessages(res.data);
//    };

//    // Send message
//    const sendMessage = async () => {
//       if (!selected || !text.trim()) return;

//       const messageData = {
//          toConversationId: selected._id,
//          text,
//          senderId: user._id,
//       };

//       socketRef.current.emit("send_message", messageData);

//       setMessages((prev) => [
//          ...prev,
//          { sender: user, text, createdAt: new Date(), conversationId: selected._id },
//       ]);
//       setText("");
//    };

//    // 🔹 Search user
//    const searchForUser = async () => {
//       if (!search.trim()) return;
//       try {
//          const res = await API.get(`/users/search?username=${search}`);
//          setResults(res.data);
//       } catch (err) {
//          console.error("Search error:", err);
//       }
//    };

//    // 🔹 Start new chat
//    const startNewChat = async (userId) => {
//       try {
//          const res = await API.post("/conversations", { participantIds: [userId] });
//          setConvs((prev) => [...prev, res.data]);
//          setSelected(res.data);
//          setResults([]);
//          setSearch("");
//       } catch (err) {
//          console.error("New chat error:", err);
//       }
//    };

//    return (
//       <div style={{ display: "flex", padding: 20, gap: 12 }}>
//          <div style={{ width: 250, border: "1px solid #eee", padding: 8 }}>
//             <h4>Conversations</h4>

//             {/* 🔹 Search bar */}
//             <input
//                value={search}
//                onChange={(e) => setSearch(e.target.value)}
//                placeholder="Search user..."
//                style={{ width: "100%", marginBottom: 8 }}
//             />
//             <button onClick={searchForUser}>Search</button>

//             {/* 🔹 Search results */}
//             {results.length > 0 && (
//                <div style={{ marginTop: 8 }}>
//                   <h5>Results:</h5>
//                   {results.map((u) => (
//                      <div
//                         key={u._id}
//                         style={{ padding: 6, cursor: "pointer", background: "#f5f5f5", margin: "4px 0" }}
//                         onClick={() => startNewChat(u._id)}
//                      >
//                         {u.username}
//                      </div>
//                   ))}
//                </div>
//             )}

//             {/* 🔹 Old conversations */}
//             {convs.map((c) => (
//                <div
//                   key={c._id}
//                   style={{ padding: 8, cursor: "pointer" }}
//                   onClick={() => openConv(c)}
//                >
//                   {c.participants.filter((p) => p._id !== user._id)[0]?.username}
//                </div>
//             ))}
//          </div>

//          <div style={{ flex: 1, border: "1px solid #eee", padding: 8 }}>
//             {selected ? (
//                <>
//                   <div style={{ height: 300, overflowY: "auto" }}>
//                      {messages.map((m, i) => (
//                         <div key={i}>
//                            <b>{m.sender?.username || "User"}:</b> {m.text}
//                         </div>
//                      ))}
//                   </div>
//                   <div style={{ marginTop: 8 }}>
//                      <input
//                         value={text}
//                         onChange={(e) => setText(e.target.value)}
//                         placeholder="Type a message"
//                         style={{ width: "80%" }}
//                      />
//                      <button onClick={sendMessage}>Send</button>
//                   </div>
//                </>
//             ) : (
//                <p>Select a conversation or start new chat</p>
//             )}
//          </div>
//       </div>
//    );
// }


import { useEffect, useState, useRef } from "react";
import API from "../API/api";
import useSocket from "../hooks/useSocket";
import { useAuth } from "../Context/AuthContext";
import "./Chat.css";

export default function Chat() {
   const [convs, setConvs] = useState([]);
   const [selected, setSelected] = useState(null);
   const [messages, setMessages] = useState([]);
   const [text, setText] = useState("");
   const [search, setSearch] = useState("");
   const [results, setResults] = useState([]);
   const { user } = useAuth();
   const socketRef = useSocket();
   const chatEndRef = useRef(null);

   // Fetch conversations on mount
   useEffect(() => {
      const fetchConvs = async () => {
         const res = await API.get("/conversations");
         setConvs(res.data);
      };
      fetchConvs();
   }, []);

   // Listen for incoming messages
   useEffect(() => {
      const s = socketRef.current;
      if (!s) return;

      s.on("receive_message", (msg) => {
         if (selected && msg.conversationId === selected._id) {
            setMessages((prev) => [...prev, msg]);
         }
      });

      return () => s.off("receive_message");
   }, [selected]);

   // Scroll to bottom on new messages
   useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   // Open conversation
   const openConv = async (conv) => {
      setSelected(conv);
      const res = await API.get(`/conversations/${conv._id}/messages`);
      setMessages(res.data);
   };

   // Send message
   const sendMessage = async () => {
      if (!selected || !text.trim()) return;

      const messageData = {
         toConversationId: selected._id,
         text,
         senderId: user._id,
      };

      socketRef.current.emit("send_message", messageData);

      setMessages((prev) => [
         ...prev,
         { sender: user, text, createdAt: new Date(), conversationId: selected._id },
      ]);
      setText("");
   };

   // 🔹 Search user
   const searchForUser = async () => {
      if (!search.trim()) return;
      try {
         const res = await API.get(`/users/search?username=${search}`);
         setResults(res.data);
      } catch (err) {
         console.error("Search error:", err);
      }
   };

   // 🔹 Start new chat
   const startNewChat = async (userId) => {
      try {
         const res = await API.post("/conversations", { participantIds: [userId] });
         setConvs((prev) => [...prev, res.data]);
         setSelected(res.data);
         setResults([]);
         setSearch("");
      } catch (err) {
         console.error("New chat error:", err);
      }
   };


   const textareaRef = useRef(null);

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = "auto"; // reset
         textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // grow
      }
   }, [text]);

   return (
      <div className="chat-container">
         {/* Sidebar */}
         <div className="chat-sidebar">

            {/* Search */}
            <input
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search user..."
               className="sidebar-search"
            />
            <button onClick={searchForUser} className="sidebar-search-btn">Search User</button>

            {results.length > 0 && (

               <div className="sidebar-results">
                  <p style={{ marginBottom: '5px', color: 'yellowgreen' }}> &nbsp;Search Results ...</p>
                  {results.map((u) => (
                     <div
                        key={u._id}
                        className="sidebar-user"
                        onClick={() => startNewChat(u._id)}
                     >

                        {u.username}
                     </div>
                  ))}
                  <p style={{ marginTop: '5px', color: 'tomato' }}> &nbsp;Search Results End ...</p>

               </div>
            )}

            {/* Conversations */}
            <h3 className="sidebar-title">Chat List </h3>

            <div className="sidebar-convs">
               {convs.map((c) => (
                  <div
                     key={c._id}
                     className={`sidebar-conv ${selected?._id === c._id ? "active" : ""}`}
                     onClick={() => openConv(c)}
                  >
                     {c.participants.filter((p) => p._id !== user._id)[0]?.username}
                  </div>
               ))}
            </div>
         </div>

         {/* Chat Window */}
         {/* <div className="chat-window">
            {selected ? (
               <>
                  <div className="chat-header">
                     <span>
                        {selected.participants.filter((p) => p._id !== user._id)[0]?.username}
                     </span>
                     <button className="chat-info-btn">ℹ️</button>
                  </div>

                  
                  <div className="chat-messages">
                     {messages.map((m, i) => (
                        <div
                           key={i}
                           className={`chat-message ${m.sender?._id === user._id ? "me" : "other"}`}
                        >
                           <span>{m.text}</span>
                        </div>
                     ))}
                     <div ref={chatEndRef} />
                  </div>

                  <div className="chat-input" style={{ display: "flex", gap: "8px" }}>
                     <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type Message..."
                        rows={1}
                        style={{
                           resize: "none",
                           overflow: "hidden",
                           flex: 1,
                           padding: "8px",
                           borderRadius: "8px",
                           outline:"none",
                           fontSize:'15px'
                        }}
                     />
                     <button onClick={() => sendMessage(text)} disabled={!text.trim()}>
                        Send
                     </button>
                  </div>

               </>
            ) : (
               <div className="chat-empty">Select a conversation or start new chat.💬🗣️💌</div>
            )}
         </div> */}

         <div className="chat-window">
            {selected ? (
               <>
                  {/* Top bar */}
                  <div className="chat-header">
                     <span>
                        {selected.participants.filter((p) => p._id !== user._id)[0]?.username}
                     </span>
                     {/* <button className="chat-info-btn">ℹ️</button> */}
                  </div>

                  {/* Messages */}
                  <div className="chat-messages">
                     {messages.map((m, i) => {
                        const date = new Date(m.createdAt);
                        const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const dateString = date.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });

                        return (
                           <div
                              key={i}
                              className={`chat-message ${m.sender?._id === user._id ? "me" : "other"}`}
                           >
                              <span>{m.text}</span>
                              {/* Added time & date */}
                              <div style={{ fontSize: '11px', color: 'grey', marginTop: '2px' }}>
                                 {timeString} | {dateString}
                              </div>
                           </div>
                        );
                     })}
                     <div ref={chatEndRef} />
                  </div>

                  {/* Input */}
                  <div className="chat-input" style={{ display: "flex", gap: "8px" }}>
                     <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type Message..."
                        rows={1}
                        style={{
                           resize: "none",
                           overflow: "hidden",
                           flex: 1,
                           padding: "8px",
                           borderRadius: "8px",
                           outline: "none",
                           fontSize: '15px'
                        }}
                     />
                     <button onClick={() => sendMessage(text)} disabled={!text.trim()}>
                        Send
                     </button>
                  </div>

               </>
            ) : (
               <div className="chat-empty">Select a conversation or start new chat.💬🗣️💌</div>
            )}
         </div>

      </div>
   );
}
