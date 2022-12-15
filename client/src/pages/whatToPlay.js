import "../styles/play.css";
import sad from "../images/sadstory.png";
import booster from "../images/booster.png";
import tired from "../images/tired.png";
import mellow from "../images/mellow.png";
import { CardMood, Loader, SectionWrapper } from "../components";
import { StyledDropdown, StyledHeader } from "../styles";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import Alert from '@mui/material/Alert';
import { getCurrentUser,getUserPlaylists,getTopTracksAll,getAudioFeaturesForTracks,createNewPlaylist,addItemsToPlaylist,} from "../spotify";

const playlistsArray = [
  {
    icon: sad,
    playListName: "what2playHappy",
  },
  {
    icon: booster,
    playListName: "what2playSad",
  },
  {
    icon: tired,
    playListName: "what2playRelaxed",
  },
  {
    icon: mellow,
    playListName: "what2playTired",
  },
];

function What2Play() {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [TracksData, setTracksData] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState(null);

  //initial useffect
  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUser(); //gets user profile
      setProfile(userProfile.data);
      setUserId(userProfile.data.id);

      const userPlaylists = await getUserPlaylists(); // gets user playlists
      setPlaylists(userPlaylists.data);

      console.log("all tracks");
      const userTopTracksAll = await getTopTracksAll(); // get all time liked songs
      setTracksData(userTopTracksAll.data);
      // const newPlaylists = await createNewPlaylist(userId)

      console.log(userTopTracksAll.data);
    };
    catchErrors(fetchData());
  }, []);

  // then update the state variable
  useEffect(() => {
    if (!TracksData) {
      return;
    }
    setTracks(TracksData.items);

    getFeatures();
  }, [TracksData]);

  //use effect to check tracks and get audio features 
  useEffect(() => {
    if (tracks && !audioFeatures) {
      getFeatures();
    }
  }, [tracks])

  //get audio features via tracksids fn 
  const getFeatures = async () => {
    console.log("getting features");
    const trackIDS = [];

    if (!tracks) {
      console.log("No tracks");
      return;
    }

    tracks.forEach((track) => {
      trackIDS.push(track.id);
    });
    
    const audioData = await getAudioFeaturesForTracks(trackIDS);

    console.log("found features!");
    setAudioFeatures(audioData.data);

    // console.log(audioData.data.valence);
  };

  // append audio features
  useEffect(() => {
    if (!audioFeatures) {
      return;
    }

    const currentTracks = [...tracks];
    const currentAudioFeatures = { ...audioFeatures };
    const danceability = [];
    const valence = [];
    const energy = [];

    audioFeatures.audio_features.forEach((audioFeature) => {
      danceability.push(audioFeature.danceability);
      valence.push(audioFeature.valence);
      energy.push(audioFeature.energy);
    });

    for (let x = 0; x < currentTracks.length; x++) {
      currentTracks[x].danceability = danceability[x];
      currentTracks[x].valence = valence[x];
      currentTracks[x].energy = energy[x];
    }
    setTracks(currentTracks);
  }, [audioFeatures]);

  //add on click to prompt this
  // useEffect(() => {

  //call playlist api again and set response to state
  // }, [profile, playlists, audioFeatures]);


  //onclick to prompt playlist creation
  const click = (playlistName) => {

    console.log("Create playlist fn :: " + playlistName);
    alert("Creating your playlist, " + playlistName);
   

    if (!profile) {
      console.log("no profile")
      return;
    }

    if (!playlists) {
      console.log("no playlists")
      return;
    }

    if (!audioFeatures) {
      console.log("no audio features")
      return;
    }
    // getFeatures();

    //prevent duplication of playlists
    const currentPlaylists = { ...playlists };
    const items = currentPlaylists.items;
    const nonExistingPlaylists = [];

    // playlistsArray.forEach((setPlaylist) => {
    //   let playListExists = false;
    //   for (let x = 0; x < currentPlaylists.items.length; x++) {
    //     // console.log(currentPlaylists.items[x])
    //     if (currentPlaylists.items[x].name === setPlaylist.playListName) {
    //       playListExists = true;
    //       return;
    //     }
    //   }

    // function determineMood(valence, danceability, energy) {
    //   if (valence >= 0.5 && danceability >= 0.5 && energy >= 0.5) {
    //     return "happy";
    //   } else if (valence < 0.5 && danceability >= 0.5 && energy >= 0.5) {
    //     return "sad";
    //   } else if (valence >= 0.5 && danceability < 0.5 && energy < 0.5) {
    //     return "relaxed";
    //   } else {
    //     return "tired";
    //   }
    // }
    


    //   if (!playListExists) {
    //     nonExistingPlaylists.push(setPlaylist.playListName);
    //   }
    // });

    //checks playlist existence
    let playListExists = false;
    
    currentPlaylists.items.forEach((playlist) => {
      if (playlist.name === playlistName) {
        playListExists = true;
        return;
        alert("")
      }
    });

    console.log("playlist exists? " + playListExists)
    alert("Does playlist exist? " + playListExists)

    if (playListExists) {
      alert("Playlist already exists. Please Check your spotify account 🤗")
      return;
    }
    
    

    //create new empty playlists
    //body of query param
    async function createAndUpdatePlaylists() {
      const playlistBody = {
        name: playlistName,
        public: true,
        description: `Playlist for a ${playlistName.toLowerCase()} mood`,
      };

      //api playlost creation
      const newPlaylist = await createNewPlaylist(profile.id, playlistBody);

      //after successful creation, grab the playlist id in the response body
      //filter songs based on criteria as you create an array of strings of the filtered tracks
      //call add items to playlist api with playlist id and array of strings

      //sort and append
      if (newPlaylist.status === 201) {
        console.log("Has been created");
        alert("Yay!🤩Your Playlist has been created! Check your spotify account via app or web!")
        console.log(newPlaylist.data.id);

        if (newPlaylist.data.name.toLowerCase().includes("happy")) {
          console.log("Is happy");
          const happyTracks = [];
          tracks.forEach((track) => {
            if (track.valence >= 0.5 && track.danceability >= 0.5 && track.energy >= 0.5) {
              happyTracks.push(track.uri);
            }
          });
          //call add items to playlist api
          const updatePlaylist = await addItemsToPlaylist(
            newPlaylist.data.id,
            happyTracks
          );
        } else if (newPlaylist.data.name.toLowerCase().includes("sad")) {
          const sadTracks = [];
          tracks.forEach((track) => {
            if (track.valence < 0.5 && track.danceability >= 0.5 && track.energy >= 0.5) {
              sadTracks.push(track.uri);
            }
          });
          //dont know if we use the same update playlist or a diff
          const updatePlaylist = await addItemsToPlaylist(
            newPlaylist.data.id,
            sadTracks
          );
        } else if (newPlaylist.data.name.toLowerCase().includes("relaxed")) {
          const relaxedTracks = [];
          tracks.forEach((track) => {
            if (track.valence >= 0.5 && track.danceability < 0.5 && track.energy < 0.5) {
              relaxedTracks.push(track.uri);
            }
          });
          const updatePlaylist = await addItemsToPlaylist(
            newPlaylist.data.id,
            relaxedTracks
          );
        } else if (newPlaylist.data.name.toLowerCase().includes("tired")) {
          const tiredTracks = [];
          tracks.forEach((track) => {
            if (track.danceability < 0.5 && track.energy > 0.5) {
              tiredTracks.push(track.uri);
            }
          });
          const updatePlaylist = await addItemsToPlaylist(
            newPlaylist.data.id,
            tiredTracks
          );
        } else {
          alert(
            "The playlist name does not include any of the above strings :("
          );
        }


        //fetch API again to update playlist array
        const playlists = await getUserPlaylists();
        setPlaylists(playlists.data);
      }
      // console.log(newPlaylist.id)
    }
    createAndUpdatePlaylists();
    // console.log(audioFeatures)
  };

  return (
    <>
      {profile ? (
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
                      {playlists.total} Playlist
                      {playlists.total !== 1 ? "s" : ""}
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
              <CardMood
                img={sad}
                title="Sad"
                createFn={() => click('what2playSad')}
                playListName="what2playSad"
              />
              <CardMood
                img={booster}
                title="Happy"
                createFn={() => click('what2playHappy')}
                playListName="what2playHappy"
              />
              <CardMood
                img={mellow}
                title="Relaxed"
                createFn={() => click('what2playRelaxed')}
                playListName="what2playRelaxed"
              />
              <CardMood
                img={tired}
                title="Tired"
                createFn={() => click('what2playTired')}
                playListName="what2playTired"
              />
            </div>
          </div>
          {/* </SectionWrapper> */}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default What2Play;
