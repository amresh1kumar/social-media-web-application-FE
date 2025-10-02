import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import API from "../API/api";

export default function Notifications() {
   const socketRef = useSocket();
   const [notifs, setNotifs] = useState([]);

   useEffect(() => {
      const fetchNotifs = async () => {
         const res = await API.get("/notifications");
         setNotifs(res.data);
      };
      fetchNotifs();
   }, []);

   useEffect(() => {
      const s = socketRef.current;
      if (!s) return;

      s.on("receiveNotification", (notif) => {
         setNotifs((prev) => [notif, ...prev]);
      });

      return () => s.off("receiveNotification");
   }, [socketRef]);

   const markRead = async (id) => {
      await API.put(`/notifications/${id}/read`);
      setNotifs((prev) => prev.map(n => n._id === id ? { ...n, readAt: new Date() } : n));
   };

   return (
      <div style={{ position: "relative" }}>
         <h4>Notifications</h4>
         {notifs.map((n) => (
            <div key={n._id} style={{ background: n.readAt ? "#eee" : "#fff", marginBottom: 5, padding: 5 }}>
               {n.message} <button onClick={() => markRead(n._id)}>Read</button>
            </div>
         ))}
      </div>
   );
}
