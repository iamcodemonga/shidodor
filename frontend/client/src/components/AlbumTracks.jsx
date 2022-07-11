import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fileDownload from 'js-file-download';
// import Player from '../components/Player';
// import { Link } from 'react-router-dom';

export default function AlbumTracks({ tracks,  paid }) {

    const { REACT_APP_API_ROOT } = process.env;
    // const [ loading, setLoading ] = useState(false)
    // const [ isPlaying, setIsPlaying ] = useState(false);
    // const [ currentSong, setCurrentSong ] = useState(tracks[0]);
    // const [ duration, setDuration ] = useState(0);
    // const audioElem = useRef();

    // useEffect(()=>{

    //     if (isPlaying) {
    //         audioElem.current.play();
    //     } else {
    //         audioElem.current.pause();
    //     }

    // },[isPlaying]);

    // const onPlaying = () => {
    //     const durate = audioElem.current.duration;
    //     setDuration(durate)
    //     const currentTime = audioElem.current.currentTime;
        
    //     setCurrentSong({...currentSong, progress: currentTime / duration * 100, duration})
    //     // setSeekValue(currentSong.progress);
    // }

    // const calculateTime = (secs) => {
    //     const minutes = Math.floor(secs/60);
    //     const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    //     const seconds = Math.floor(secs % 60);
    //     const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    //     return `${returnedMinutes}:${returnedSeconds}`;
    // }
    const handleDownload = (file) => {
        // setLoading(true);
        axios({
            url: `${REACT_APP_API_ROOT}/download/${file}`,
            method: 'get',
            responseType: 'blob'
        })
        .then((response) => {
            fileDownload(response.data, file)
            // setLoading(false);
        })
        .catch((error) => {
            console.log(error.message)
            // setLoading(true);
        })
    }


    return (
        <>
            <section className="music-section px-4">
                <div className="container">
                    <h5 className="mt-0 mb-4">Album Tracks</h5>
                    <div className="row gx-5 gy-2 pb-4">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 d-none">
                            <div className="musicCard d-flex align-items-center active">
                                <div className="d-flex align-items-center">
                                    <div className="h-100 d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="active-icon">
                                            {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM224 191.1v128C224 337.7 209.7 352 192 352S160 337.7 160 320V191.1C160 174.3 174.3 160 191.1 160S224 174.3 224 191.1zM352 191.1v128C352 337.7 337.7 352 320 352S288 337.7 288 320V191.1C288 174.3 302.3 160 319.1 160S352 174.3 352 191.1z" />
                                        </svg>
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mt-3 mb-1">Song Title Goes right hear</h6>
                                        <p className="text_small">2 : 30 min
                                            <a className="ms-2" href='/' download>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" style={{fontSize: 12, marginRight: 2, color: 'rgb(13,110,253)'}}>
                                                    {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                                                    <path d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
                                                </svg>Download
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {tracks && tracks.map(track => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={track.id}>
                            <div className="musicCard d-flex align-items-center">
                                <div className="h-100 d-flex align-items-center">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor">
                                        <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z" />
                                    </svg> */}
                                    <img src={`${REACT_APP_API_ROOT}/${track.art}`} alt="" width="50px" height="50px" style={{ borderRadius: "10px", backgroundColor: "var(--primary)" }} />
                                </div>
                                <div className="ms-3">
                                    <h6 className="mt-3 mb-1"><Link to={`/song/${track.uid}`}>{track.title}</Link></h6>
                                    <p className="text_small">{track.length}
                                    {paid && <a className="ms-2" href={`${REACT_APP_API_ROOT}/encrypted/${track.songfile}`} onClick={(e) => { e.preventDefault(); handleDownload(track.songfile)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" style={{fontSize: 12, marginRight: 2}}>
                                                <path d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
                                            </svg>Download
                                        </a>}
                                    </p>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </section>
            {/* <Player songs={tracks} setSongs={setTracks} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioElem={audioElem} seekValue={seekValue} setSeekValue={setSeekValue} duration={duration} calculateTime={calculateTime} /> */}
        </>
    )
}
