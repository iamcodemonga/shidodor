import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import AlbumList from '../components/grid/AlbumList';
import '../resources/css/albums.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';

export default function Albums() {

    const { REACT_APP_API_ROOT } = process.env;

    const [ pageLoading, setPageLoading ] = useState(true);
    const [ albums, setAlbums ] = useState([]);
    const [ total, setTotal ] = useState(0);

    useEffect(() => {

        const fetchData = async () => {

            try{

                const response = await axios.get(`${REACT_APP_API_ROOT}/albums`);
                const totalAlbums = response.data.total;
                const allAlbums = response.data.albums;
                setTotal(totalAlbums);
                setAlbums(allAlbums)
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
                    <Header title="ALBUMS" inActiveLink="Albums"/>
                    <AlbumList albums={albums} total={total} />
                    <Footer />
                </>
            }
        </>
        
    )
}
