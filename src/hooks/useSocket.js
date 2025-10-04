// import { useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import { useAuth } from "../Context/AuthContext";

// export default function useSocket() {

//    const { user } = useAuth();
//    const socketRef = useRef(null);

//    useEffect(() => {
//       if (!user) return;

//       const url = process.env.REACT_APP_WS_URL || "http://localhost:5000";
//       console.log("Connecting to socket:", url);

//       const socket = io(url, { transports: ["websocket"] });
//       socketRef.current = socket;

//       socket.on("connect", () => console.log("Socket connected:", socket.id));
//       socket.on("connect_error", (err) => console.log("Socket connection error:", err));

//       socket.emit("join", { userId: user._id });

//       return () => socket.disconnect();
//    }, [user]);


//    useEffect(() => {
//       if (!user) return;

//       // Use process.env in CRA
//       const url = process.env.REACT_APP_WS_URL || "http://localhost:5000";
//       socketRef.current = io(url, { transports: ["websocket"] });

//       socketRef.current.emit("join", { userId: user._id });

//       return () => socketRef.current?.disconnect();
//    }, [user]);

//    return socketRef;
// }


import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../Context/AuthContext";

export default function useSocket() {
   const { user } = useAuth();
   const socketRef = useRef(null);

   useEffect(() => {
      if (!user) return;

      const url = process.env.REACT_APP_WS_URL || "http://localhost:5000";

      socketRef.current = io(url, {
         transports: ["websocket", "polling"], // ✅ polling fallback
         secure: true,                        // ✅ wss
         reconnection: true,
         forceNew: true
      });

      socketRef.current.on("connect", () => console.log("Socket connected:", socketRef.current.id));
      socketRef.current.on("connect_error", (err) => console.log("Socket error:", err));

      socketRef.current.emit("join", { userId: user._id });

      return () => socketRef.current?.disconnect();
   }, [user]);

   return socketRef;
}


