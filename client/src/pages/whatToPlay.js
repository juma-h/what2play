import "../styles/play.css";
import chill from "../images/chill.png";
import booster from "../images/booster.png";
import dance from "../images/dance.png";
import mellow from "../images/mellow.png";
import { CardMood } from "../components";
import { StyledDropdown, StyledHeader } from "../styles";
import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import {getCurrentUser,getUserPlaylists,getTopTracks,} from "../spotify";
import { Loader, SectionWrapper} from "../components";

function What2Play() {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUser(); //gets user profile
      setProfile(userProfile.data);

      const userPlaylists = await getUserPlaylists(); // gets user playlists
      setPlaylists(userPlaylists.data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <>

   {profile ?
    <div>
      <StyledHeader type="user">
        <div className="header__inner">
          {profile.images.length && profile.images[0].url && (
            <img
              className="header__img"
              src={profile.images[0].url}
              alt="Avatar"
            />
          )}
          <div>
            <div className="header__overline">Profile</div>
            <h1 className="header__name">{profile.display_name}</h1>
            <p className="header__meta">
              {playlists && (
                <span>
                  {playlists.total} Playlist{playlists.total !== 1 ? "s" : ""}
                </span>
              )}
              <span>
                {profile.followers.total} Follower
                {profile.followers.total !== 1 ? "s" : ""}
              </span>
            </p>
          </div>
        </div>
      </StyledHeader>
      {/* <SectionWrapper title="what2play" breadcrumb={true}> */}
      <div className="card-wrapper">
        <h1 style={{ color: "grey" }}>what2play </h1>
        <h4>Choose your mood and we will try fetch something for you :)</h4>
        <div className="card-comp">
          <CardMood img={chill} title="Chill" />
          <CardMood img={booster} title="Mood Booster" />
          <CardMood img={mellow} title="Mellow" />
          <CardMood img={dance} title="Dance" />
        </div>
      </div>
      {/* </SectionWrapper> */}
    </div> : <Loader/>}
    </>
  );
}

export default What2Play;
