import React, { useState, useEffect } from "react";
import { accessToken, logout, getCurrentUser } from "./spotify";
import { catchErrors } from "./utils";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GlobalStyle } from "./styles";
import { Login, Profile, TopArtists, TopTracks, Playlists, Playlist, What2Play } from "./pages";
import styled from 'styled-components/macro';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

function App() {
  const [token, setToken] = useState(null); //token that is imported from the spotify.js
  const [profile, setProfile] = useState(null);

  //use effect to get token and display user profile data
  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUser(); //axios returns response as {data}and we set it to the state profile.
      setProfile(data);
      console.log(data);
    };

    catchErrors(fetchData()); //imported function helps us catch errors as we await a promise.
  }, []);

  // Scroll to top of page when changing routes
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <StyledLogoutButton onClick={logout}>Log Out </StyledLogoutButton>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/top-artists" element={<TopArtists/>}/>

                <Route path="/top-tracks" element={<TopTracks/>} />

                <Route path="/playlists/:id" element={<Playlist/>} />

                <Route path="/playlists" element={<Playlists/>} />

                <Route path="/what2play" element={<What2Play/>}/>

                <Route
                  path="/"
                  element={
                    <React.Fragment>
                      <div>
                        {profile && <Profile />}
                      </div>
                    </React.Fragment>
                  }
                ></Route>
              </Routes>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
