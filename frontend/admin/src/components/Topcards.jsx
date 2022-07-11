import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function Topcards() {

    const { REACT_APP_API_ROOT } = process.env;
    const [ albums, setAlbums ] = useState(null);
    const [ songs, setSongs ] = useState(null);
    const [ videos, setVideos ] = useState(null);
    const [ donations, setDonations ] = useState('');
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {

        setLoading(true)
        axios.get(`${REACT_APP_API_ROOT}/data/analytics`)
            .then(response => {

                setAlbums(response.data.albums)
                setSongs(response.data.songs)
                setVideos(response.data.videos)
                setDonations(response.data.donations)

                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })

    }, [REACT_APP_API_ROOT])

    return (
        <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Dashboard</h3>
            </div>
            <div className="row">
                <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-start-primary py-2">
                    <div className="card-body">
                    <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                        <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>Songs</span></div>
                        <div className="text-dark fw-bold h5 mb-0">
                            {loading && <span>__</span>}
                            <span>{songs}</span>
                        </div>
                        </div>
                        <div className="col-auto"><i className="fas fa-music fa-2x text-gray-300" /></div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-start-success py-2">
                    <div className="card-body">
                    <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                        <div className="text-uppercase text-success fw-bold text-xs mb-1"><span>Music videos</span></div>
                        <div className="text-dark fw-bold h5 mb-0">
                            {loading && <span>__</span>}
                            <span>{videos}</span>
                        </div>
                        </div>
                        <div className="col-auto"><i className="fas fa-play fa-2x text-gray-300" /></div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-start-success py-2">
                    <div className="card-body">
                    <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                        <div className="text-uppercase text-success fw-bold text-xs mb-1"><span>Albums</span></div>
                        <div className="text-dark fw-bold h5 mb-0">
                            {loading && <span>__</span>}
                            <span>{albums}</span>
                        </div>
                        </div>
                        <div className="col-auto"><i className="fas fa-list fa-2x text-gray-300" /></div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-start-warning py-2">
                    <div className="card-body">
                    <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                        <div className="text-uppercase text-warning fw-bold text-xs mb-1"><span>donations</span></div>
                        <div className="text-dark fw-bold h5 mb-0">
                            {loading && <span>__</span>}
                            <span>{donations && 'NGN'+donations}</span>
                        </div>
                        </div>
                        <div className="col-auto"><i className="fas fa-money-check-alt fa-2x text-gray-300" /></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    )
}
