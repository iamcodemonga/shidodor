import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoDetails from '../components/VideoDetails';
import RecommendedVideos from '../components/OtherVideos';
import '../resources/css/video.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function Video() {

    const { REACT_APP_API_ROOT } = process.env;
    const { uid } = useParams();
    const [ paid, setPaid ] = useState(false);
    const [ videoDetails, setVideoDetails ] = useState('');
    const [ relatedVideos, setRelatedVideos ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const navigate = useNavigate();
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const ref = queryParams.get('ref');

    useEffect(() => {
        const fetchData = async () => {
            try{

                const response = await axios.get(`${REACT_APP_API_ROOT}/video/${uid}?ref=${ref}`);
                if (response.data.status) {
                    setPaid(response.data.paid);
                    console.log(response.data)
                    setVideoDetails(response.data.videoDetails);
                    setRelatedVideos(response.data.relatedVideos);
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
                    <VideoDetails videoDetails={videoDetails} paid={paid} />
                    <RecommendedVideos videos={relatedVideos} />
                    <Footer />
                </>
            }
        </>
    )
}
