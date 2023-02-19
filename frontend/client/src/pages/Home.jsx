import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/HomeBanner';
import LatestSongs from '../components/LatestSongs';
// import TopAlbums from '../components/TopAlbums';
import PreBanner from '../components/Prebanner';
import MusicVideos from '../components/TopVideos';
import About from '../components/HomeBio';
import '../resources/css/home.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';

export default function Home() {

    const [ pageLoading, setPageLoading ] = useState(true);

    const [ latestSongs, setLatestSongs ] = useState([]);
    // const [ topAlbums, setTopAlbums ] = useState([]);
    const [ trendingVideos, setTrendingVideos ] = useState([]);


    const { REACT_APP_API_ROOT } = process.env;

    useEffect(() => {

        // setPageLoading(true)

        const fetchData = async () => {

            try {
                
                const response = await axios.get(`${REACT_APP_API_ROOT}`);

                const songs = response.data.latestSongs;
                // const albums = response.data.topAlbums;
                const videos = response.data.trendingVideos;

                setLatestSongs(songs);
                // setTopAlbums(albums);
                setTrendingVideos(videos);
                setPageLoading(false)

            } catch (error) {
                console.log(error.message);
                setPageLoading(false)
            }
        
        }

        fetchData();
        
    }, [REACT_APP_API_ROOT])

    return (
        <>
            {pageLoading ?
            <PageLoader /> :
                <>
                    <Topbar />
                    <Banner />
                    <LatestSongs songs={latestSongs} />
                    {/* <TopAlbums albums={topAlbums} /> */}
                    <PreBanner />
                    <MusicVideos videos={trendingVideos} />
                    <About />
                    <Footer />
                </>
            }
        </>
        
    )
}
