import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getCurrentUser, getUserPlaylists ,getTopArtists ,getTopTracks} from "../spotify";
import { StyledHeader } from "../styles";
import { Loader, SectionWrapper, ArtistsGrid, TrackList, PlaylistsGrid} from '../components';


const Profile = () => {
  //gets user information
  //stores in a state
  //renders to div below
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null)
  const [topTracks, setTopTracks] = useState(null);


  //use effect for all our defined API's 

  useEffect(() => {

    const fetchData = async () => {

      const userProfile = await getCurrentUser();//gets user profile 
      setProfile(userProfile.data);

      const userPlaylists = await getUserPlaylists();// gets user playlists
      setPlaylists(userPlaylists.data)

      const userTopArtists = await getTopArtists();//gets top artists
      setTopArtists(userTopArtists.data)

      const userTopTracks = await getTopTracks();//gets top tracks
      setTopTracks(userTopTracks.data)

      console.log(userTopTracks.data)

    };
    catchErrors(fetchData());
  }, []);

  return (
    <>
    
      {profile && (
        <div>
          <StyledHeader type="user">
            <div className="header__inner">
              {profile.images.length && profile.images[0].url && (
                <img className="header__img" src={profile.images[0].url} alt="Avatar"/>
              )}
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  {playlists && (
                    <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                  )}
                  <span>
                    {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>
            </div>
            </StyledHeader>

            {/* render artists , tracks and playlist */}
            <main>
            {topArtists && topTracks && playlists ? (
              <>
                <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                  <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                  <TrackList tracks={topTracks.items.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper title="Public Playlists" seeAllLink="/playlists">
                  <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
                </SectionWrapper>
              </>
            ) : (
              <Loader />
            )}
          </main>
          

        </div>
      )}
    </>
  );
};

export default Profile;
