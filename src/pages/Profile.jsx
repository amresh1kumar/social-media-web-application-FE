import { useAuth } from "../Context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No profile loaded</p>
      )}
    </div>
  );
}