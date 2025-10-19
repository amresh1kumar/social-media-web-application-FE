

import { useAuth } from "../Context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const firstLetter = user?.username ? user.username[0].toUpperCase() : "";

  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>
      {user ? (
        <>
          {user.avatar ? (
            // agar avatar hai
            <img
              src={`http://localhost:5000${user.avatar}`}
              alt="avatar"
              width={100}
              style={{ borderRadius: "50%", marginBottom: 10 }}
            />
          ) : (
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "#4caf50", // green circle
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                color: "white",
                marginBottom: 10,
              }}
            >
              {firstLetter}
            </div>
          )}

          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No profile loaded</p>
      )}
    </div>
  );
}
