import {useState, useEffect} from "react"
import { catchErrors } from "../utils";
import { getTopArtists } from "../spotify";
import { SectionWrapper, ArtistsGrid, TimeRangeButtons} from '../components';



const TopArtists = ()=>{
    const [topArtists, setTopArtists] = useState(null)
    const [activeRange, setActiveRange] = useState(null)

    useEffect (()=>{

        const FetchData= async () =>{

            const userTopArtists = await getTopArtists(`${activeRange}_term`);//gets top artists
            setTopArtists(userTopArtists.data)
        };

        catchErrors(FetchData());

    }, [activeRange]);

    console.log(topArtists);

    return (
      <main>
        
        {topArtists && (
          <SectionWrapper title="Top artists" breadcrumb="true">
            <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange}/>
            <ArtistsGrid artists={topArtists.items} />
          </SectionWrapper>
        )}
      </main>
    );

}

export default TopArtists;
