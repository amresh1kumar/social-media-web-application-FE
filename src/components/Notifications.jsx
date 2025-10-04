// import { useEffect, useState } from "react";
// import useSocket from "../hooks/useSocket";
// import API from "../API/api";

// export default function Notifications() {
//    const socketRef = useSocket();
//    const [notifs, setNotifs] = useState([]);

//    useEffect(() => {
//       const fetchNotifs = async () => {
//          const res = await API.get("/notifications");
//          setNotifs(res.data);
//       };
//       fetchNotifs();
//    }, []);

//    useEffect(() => {
//       const s = socketRef.current;
//       if (!s) return;

//       s.on("receiveNotification", (notif) => {
//          setNotifs((prev) => [notif, ...prev]);
//       });

//       return () => s.off("receiveNotification");
//    }, [socketRef]);

//    const markRead = async (id) => {
//       await API.put(`/notifications/${id}/read`);
//       setNotifs((prev) => prev.map(n => n._id === id ? { ...n, readAt: new Date() } : n));
//    };

//    return (
//       <div style={{ position: "relative" }}>
//          <h4>Notifications</h4>
//          {notifs.map((n) => (
//             <div key={n._id} style={{ background: n.readAt ? "#eee" : "#fff", marginBottom: 5, padding: 5 }}>
//                {n.message} <button onClick={() => markRead(n._id)}>Read</button>
//             </div>
//          ))}
//       </div>
//    );
// }

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import API from "../API/api";

export default function Notifications() {
   const socketRef = useSocket();
   const [notifs, setNotifs] = useState([]);

   // Fetch notifications safely
   useEffect(() => {
      const fetchNotifs = async () => {
         try {
            const res = await API.get("/notifications");
            // Ensure array
            const data = Array.isArray(res.data) ? res.data : res.data.notifications || [];
            setNotifs(data);
         } catch (err) {
            console.error("Failed to fetch notifications:", err);
         }
      };
      fetchNotifs();
   }, []);

   // Socket listener
   useEffect(() => {
      const s = socketRef.current;
      if (!s) return;

      const handleNotif = (notif) => {
         setNotifs((prev) => [notif, ...prev]);
      };

      s.on("receiveNotification", handleNotif);

      return () => s.off("receiveNotification", handleNotif); // proper cleanup
   }, [socketRef]);

   const markRead = async (id) => {
      try {
         await API.put(`/notifications/${id}/read`);
         setNotifs((prev) =>
            prev.map((n) =>
               n._id === id ? { ...n, readAt: new Date() } : n
            )
         );
      } catch (err) {
         console.error("Failed to mark notification read:", err);
      }
   };

   return (
      <div style={{ position: "relative" }}>
         <h4>Notifications</h4>
         {Array.isArray(notifs) && notifs.length > 0 ? (
            notifs.map((n) => (
               <div
                  key={n._id}
                  style={{
                     background: n.readAt ? "#eee" : "#fff",
                     marginBottom: 5,
                     padding: 5,
                  }}
               >
                  {n.message}{" "}
                  <button onClick={() => markRead(n._id)}>Read</button>
               </div>
            ))
         ) : (
            <div>No notifications</div>
         )}
      </div>
   );
}

