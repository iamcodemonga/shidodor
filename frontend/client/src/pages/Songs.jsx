import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SongList from '../components/grid/SongList';
import '../resources/css/songs.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer'
import PageLoader from '../components/PageLoader';

export default function Songs() {

    const [ songs, setSongs ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ pageLoading, setPageLoading ] = useState(true);

    const { REACT_APP_API_ROOT } = process.env;

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${REACT_APP_API_ROOT}/songs`)
                const totalSongs = response.data.total;
                const allsongs = response.data.songs;

                setTotal(totalSongs);
                setSongs(allsongs);
                setPageLoading(false);

            } catch (error) {
                console.log(error.message)
                setPageLoading(false);
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
                <Header title="ALL SONGS" inActiveLink="Songs"/>
                <SongList songs={songs} total={total} />
                <Footer />
            </>
        }
        </>
    )
}
