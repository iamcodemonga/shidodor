import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumDetails from '../components/AlbumDetails';
import AlbumTracks from '../components/AlbumTracks';
import RecommendedAlbums from '../components/OtherAlbums';
import '../resources/css/album.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function Album() {

    const { REACT_APP_API_ROOT } = process.env;
    const { uid } = useParams();
    const [ paid, setPaid ] = useState(false);
    const [ albumDetails, setAlbumDetails ] = useState('');
    const [ relatedAlbums, setRelatedAlbums ] = useState([]);
    const [ tracks, setTracks ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const navigate = useNavigate();
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const ref = queryParams.get('ref');

    useEffect(() => {
        const fetchData =  async () => {
            
            try{

                const response = await axios.get(`${REACT_APP_API_ROOT}/album/${uid}?ref=${ref}`, { "Content-Type": "application/json", Authorization: "apiKey"});
                if (response.data.status) {
                    setPaid(response.data.paid);
                    setAlbumDetails(response.data.albumDetails);
                    setTracks(response.data.tracks);
                    setRelatedAlbums(response.data.relatedAlbums);
                    setLoading(false);
                    console.log(response)
                } else {
                    navigate('/sorry')
                }

            } catch (error) {
                console.log(error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [REACT_APP_API_ROOT, ref, uid, navigate]);

    return (
        <>
            {loading ? 
            <PageLoader /> : 
            <>
                <Topbar />
                <AlbumDetails details={albumDetails} paid={paid} />
                <AlbumTracks tracks={tracks} setTracks={setTracks} paid={paid} />
                <RecommendedAlbums albums={relatedAlbums} />
                <Footer />
            </>}
        </>
    )
}
