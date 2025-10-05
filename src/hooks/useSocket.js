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


