import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import VideoList from '../components/grid/VideoList';
import '../resources/css/videos.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';

export default function Videos() {

    const { REACT_APP_API_ROOT } = process.env;

    const [ pageLoading, setPageLoading ] = useState(true);
    const [ videos, setVideos ] = useState([]);
    const [ total, setTotal ] = useState(0);

    useEffect(() => {

        const fetchData = async () => {

            try{

                const response = await axios.get(`${REACT_APP_API_ROOT}/videos`);
                const totalVideos = response.data.total;
                const allVideos = response.data.videos;
                setTotal(totalVideos);
                setVideos(allVideos)
                setPageLoading(false)

            } catch(error) {
                console.log(error);
                setPageLoading(false)
            }

        }

        fetchData()
    }, [REACT_APP_API_ROOT])

    return (
        <>
            {pageLoading ? 
                <PageLoader /> :
                <>
                    <Topbar />
                    <Header title="MUSIC VIDEOS" inActiveLink="Videos"/>
                    <VideoList videos={videos} total={total} />
                    <Footer />
                </>
            }
        </>
    )
}
