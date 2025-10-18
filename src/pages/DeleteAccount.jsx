import React from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export default function DeleteAccount() {
   const { user, logout } = useAuth();
   const API_URL = "http://localhost:5000/api";

   const handleDeleteAccount = async () => {
      if (!user) return alert("You must be logged in!");
      if (!window.confirm("Are you sure you want to delete your account permanently?")) return;

      try {
         const token = localStorage.getItem("token");
         const response = await axios.delete(`${API_URL}/users/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
         });

         alert(response.data.message);
         logout(); // clear localStorage + context
         window.location.href = "/"; // redirect to home or login
      } catch (error) {
         console.error("Delete user error:", error);
         alert("❌ Failed to delete account");
      }
   };

   return (
      <button
         onClick={handleDeleteAccount}
         style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
         }}
      >
         Delete My Account
      </button>
   );
}
