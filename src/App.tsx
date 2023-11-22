import { useEffect, useState } from "react";
import "./App.css";
import { Activities } from "./components";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const authUrl = `http://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173/exchange_token&approval_prompt=force&scope=read,activity:read_all`;

  const searchParams = new URLSearchParams(window.location.search);
  const userUrl = `https://www.strava.com/oauth/token?client_id=${
    process.env.STRAVA_CLIENT_ID
  }&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${searchParams.get(
    "code"
  )}&grant_type=authorization_code`;

  const nextURL = "http://localhost:5173/";
  const nextTitle = "Strava Test App";

  useEffect(() => {
    if (!loggedIn && searchParams.has("code") && !token) {
      fetch(userUrl, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          setToken(data.access_token);
        });
    } else if (token) {
      const nextState = { additionalInformation: "Updated URL" };
      window.history.replaceState(nextState, nextTitle, nextURL);
      setLoggedIn(true);
    }
  }, [searchParams, userUrl, loggedIn, token, setToken]);

  return (
    <>
      {!loggedIn ? (
        <div>
          <h1>WELCOME TO A TEST APP</h1>
          <p>To access the app, first log in to your Strava account through the button below.<br/>Please accept all permissions, they are needed for proper behavior of the app.</p>
          <button>
            <a href={authUrl}><h2>Log In!</h2></a>
          </button>
        </div>
      ) : (
        <Activities token={token} />
      )}
      {/* <button>
        <a href={authUrl}>Log Here!</a>
      </button> */}
    </>
  );
}

export default App;
