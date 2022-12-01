import {useState, useEffect} from "react"
import { getTopTracks } from "../spotify";
import { catchErrors } from "../utils";
import { SectionWrapper, TimeRangeButtons, TrackList, Loader} from '../components';

const TopTracks = ()=>{

    const [topTracks, setTopTracks] = useState(null)
    const [activeRange, setActiveRange] = useState('short');

    useEffect(()=>{

        const FetchData = async() =>{

            const userTopTracks = await getTopTracks(`${activeRange}_term`)
            setTopTracks(userTopTracks.data)
        };
        catchErrors(FetchData())
    },[activeRange]);


    return (
      <main>
        {topTracks?(        
        <SectionWrapper title="Top Tracks" breadcrumb={true}>
          <TimeRangeButtons
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />

          {topTracks && topTracks.items && (
            <TrackList tracks={topTracks.items} />
          )}
        </SectionWrapper>):(
          <Loader/>
        )}

      </main>
    );



}


export default TopTracks;