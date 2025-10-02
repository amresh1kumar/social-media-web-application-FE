import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../Context/AuthContext";

export default function useNotifSocket() {
   const { user } = useAuth();
   const socketRef = useRef(null);

   useEffect(() => {
      if (!user) return;

      const url = process.env.REACT_APP_WS_URL || "http://localhost:5000";
      socketRef.current = io(url, { transports: ["websocket"] });

      // join notifications room
      socketRef.current.emit("joinNotifications", { userId: user._id });

      return () => socketRef.current.disconnect();
   }, [user]);

   return socketRef;
}
