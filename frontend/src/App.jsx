import { useAuth } from "@clerk/clerk-react";

function App() {
  const { isSignedIn, getToken } = useAuth();

  const callBackend = async () => {
    const token = await getToken();

    const response = await fetch("http://localhost:3000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Home Page</h1>

      {isSignedIn && (
        <button onClick={callBackend}>
          Call Backend
        </button>
      )}
    </div>
  );
}

export default App;