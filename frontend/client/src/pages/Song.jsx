import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongDetails from '../components/SongDetails';
import RecommendedSongs from '../components/OtherSongs';
import '../resources/css/song.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function Song() {

    const { REACT_APP_API_ROOT } = process.env;
    const { uid } = useParams();
    const [ paid, setPaid ] = useState(false);
    const [ songDetails, setSongDetails ] = useState('');
    const [ relatedSongs, setRelatedSongs ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const navigate = useNavigate();
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const ref = queryParams.get('ref');

    useEffect(() => {
        const fetchData = async () => {
            try{

                const response = await axios.get(`${REACT_APP_API_ROOT}/song/${uid}?ref=${ref}`);
                if (response.data.status) {
                    setPaid(response.data.paid);
                    setSongDetails(response.data.songDetails);
                    setRelatedSongs(response.data.relatedSongs);
                    setLoading(false);
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
                    <SongDetails songDetails={songDetails} paid={paid} />
                    <RecommendedSongs songs={relatedSongs} />
                    <Footer />
                </>
            }
        </>
    )
}
