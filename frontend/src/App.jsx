import { useAuth } from "@clerk/clerk-react";

function App() {
  const { isSignedIn, getToken } = useAuth();

  const callBackend = async () => {
    const token = await getToken();

    const response = await fetch("http://localhost:3000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("STATUS:", response.status);

    const text = await response.text();
    console.log(text);
  };

  return (
    <div>
      <h1>Home Page</h1>

      {isSignedIn && <button onClick={callBackend}>Call Backend</button>}
    </div>
  );
}

export default App;
