import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { useState } from 'react';

export default function UploadContent() {

    const { REACT_APP_API_ROOT } = process.env;
    // album input details state
    const [ albumcover, setAlbumCover ] = useState("");
    const [ albumTitle, setAlbumTitle ] = useState("");
    const [ albumDate, setAlbumDate ] = useState("");
    const [ albumLoading, setAlbumLoading ] = useState(false);

     // song input details state
     const [ songFile, setSongFile ] = useState("");
     const [ songTrailer, setSongTrailer ] = useState("");
     const [ songCover, setSongCover ] = useState("");
     const [ songTitle, setSongTitle ] = useState("");
     const [ songDuration, setSongDuration ] = useState("");
     const [ songAlbum, setSongAlbum ] = useState("none");
     const [ songLoading, setSongLoading ] = useState(false);

     // video input details state
     const [ videoFile, setVideoFile ] = useState("");
     const [ videoTrailer, setVideoTrailer ] = useState("");
     const [ videoCover, setVideoCover ] = useState("");
     const [ videoTitle, setVideoTitle ] = useState("");
     const [ videoDuration, setVideoDuration ] = useState("");
     const [ videoAlbum, setVideoAlbum ] = useState("none");
     const [ videoLoading, setVideoLoading ] = useState(false);

     const [ albumSongs, setAlbumSongs ] = useState([]);
     const [ albumVideos, setAlbumVideos ] = useState([]);

     const handleAlbumSubmit = (e) => {
        e.preventDefault();
        setAlbumLoading(true);

        const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']; 

        if (!albumcover || !allowedTypes.includes(albumcover.type)) {
            alert('Image type not supported!');
            setAlbumLoading(false);
           return;
        }

        const formData = new FormData();
        formData.append('albumcover', albumcover);
        formData.append('albumtitle', albumTitle);
        formData.append('albumdate', albumDate);

        axios.post(`${REACT_APP_API_ROOT}/upload/album`, formData)
            .then(response => {
                if (response.data[0] === 'ok') {
                    alert(response.data[0].message);
                    setAlbumLoading(false);
                } else {
                    alert(response.data[0].message)
                    setAlbumLoading(false);
                }
            })
            .catch(error => {
                console.log(error.message);
                setAlbumLoading(false);
            })
     }

     const handleSongSubmit = (e) => {
        e.preventDefault();
        setSongLoading(true);

        const coverTypes = ['image/jpg', 'image/jpeg', 'image/png']; 
        const songTypes = ['audio/mp3', 'audio/mpeg']; 



        if (!songCover || !coverTypes.includes(songCover.type)) {
            alert('Image type not supported!');
            setSongLoading(false);
           return;
        }

        if (!songFile || !songTypes.includes(songFile.type)) {
            alert('song type not supported!');
            setSongLoading(false);
           return;
        }

        if (!songTrailer || !songTypes.includes(songTrailer.type)) {
            alert('song trailer type not supported!');
            setSongLoading(false);
           return;
        }

        const formData = new FormData();
        formData.append('songfile', songFile);
        formData.append('songtrailer', songTrailer);
        formData.append('songcover', songCover);
        formData.append('songtitle', songTitle);
        formData.append('duration', songDuration);
        formData.append('album', songAlbum);

        axios.post(`${REACT_APP_API_ROOT}/upload/song`, formData)
            .then(response => {
                if (response.data[0] === 'ok') {
                    alert(response.data[0].message);
                    setSongLoading(false);
                } else {
                    alert(response.data[0].message);
                    setSongLoading(false);
                }
            })
            .catch(error => {
                console.log(error.message);
                setSongLoading(false);
            })
     }

     const handleVideoSubmit = (e) => {
        e.preventDefault();

        setVideoLoading(true);
        const coverTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        const videoTypes = ['video/mp4'];


        if (!videoCover || !coverTypes.includes(videoCover.type)) {
            alert('Image type not supported!');
            setVideoLoading(false);
           return;
        }

        if (!videoFile || !videoTypes.includes(videoFile.type)) {
            alert('video type not supported!');
            setVideoLoading(false);
           return;
        }

        const formData = new FormData();
        formData.append('videofile', videoFile);
        formData.append('videotrailer', videoTrailer);
        formData.append('thumbnail', videoCover);
        formData.append('videotitle', videoTitle);
        formData.append('duration', videoDuration);
        formData.append('album', videoAlbum);

        axios.post(`${REACT_APP_API_ROOT}/upload/video`, formData)
            .then(response => {
                if (response.data[0] === 'ok') {
                    alert(response.data[0].message);
                    setVideoLoading(false);
                } else {
                    alert(response.data[0].message)
                    setVideoLoading(false);
                }
            })
            .catch(error => {
                console.log(error.message);
                setVideoLoading(false);
            })
    }

    useEffect(() => {

        const fetchAlbums = async() => {

            const response = await axios.get(`${REACT_APP_API_ROOT}/pages/uploads`);

            const newAlbums = [...response.data];
            const newSongs = [...response.data];
            const sumo = { title: 'none' };

            newAlbums.unshift(sumo);
            newSongs.unshift(sumo);

            setAlbumSongs(newSongs);
            setAlbumVideos(newAlbums);

        }

        fetchAlbums();
    }, [REACT_APP_API_ROOT])

    return (
        <div className="container-fluid">
            <h3 className="text-dark mb-4">Uploads</h3>
            <div className="row mb-3">
                <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
                <div className="card shadow mb-3">
                    <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Create Album</p>
                    </div>
                    <div className="card-body">
                    <form onSubmit={handleAlbumSubmit}>
                        <div className="row">
                        <div className="col-12">
                            <div className="mb-3"><label className="form-label" htmlFor="albumcover"><strong>Album cover</strong><br /></label><input className="form-control" type="file" id="albumcover" placeholder="user.name" name="albumcover" required onChange={(e) => setAlbumCover(e.target.files[0])} /></div>
                        </div>
                        <div className="col-12">
                            <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Title</strong><br /></label><input className="form-control" type="text" id="email-2" placeholder="Album title" name="albumtitle" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} /></div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col">
                            <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Date made</strong><br /></label><input className="form-control" type="date" name="albumdate" value={albumDate} onChange={(e) => setAlbumDate(e.target.value)} /></div>
                        </div>
                        </div>
                        <div className="mb-3">
                            {albumLoading ? <button className="btn btn-success btn-brand" type="submit" disabled>Uploading...</button> : <button className="btn btn-success btn-brand" type="submit">Submit</button>}
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7">
                <div className="row">
                    <div className="col">
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Add Song</p>
                        </div>
                        <div className="card-body">
                        <form onSubmit={handleSongSubmit}>
                            <div className="row">
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="username"><strong>song file</strong><br /></label><input className="form-control" type="file" id="songfile" placeholder="user.name" name="songfile" onChange={(e) => setSongFile(e.target.files[0])} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>song trailer</strong><br /></label><input className="form-control" type="file" id="songtrailer" placeholder="user@example.com" name="songtrailer" onChange={(e) => setSongTrailer(e.target.files[0])} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>cover art</strong><br /></label><input className="form-control" type="file" id="songcover" placeholder="user@example.com" name="songcover" onChange={(e) => setSongCover(e.target.files[0])} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>title</strong><br /></label><input className="form-control" type="text" id="songtitle" placeholder="add song title" name="songtitle" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Duration</strong><br /></label><input className="form-control" type="text" id="songduration" placeholder="e.g 2:35" name="songduration" value={songDuration} onChange={(e) => setSongDuration(e.target.value)} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Album</strong><br /></label><select className="form-select form-control" value={songAlbum} onChange={(e) => setSongAlbum(e.target.value)}>
                                    <optgroup label="Choose album located">
                                        {/* <option value="none">none</option>
                                        <option value="album 1">Album 1</option>
                                        <option value="album2">Album 2</option> */}
                                        { albumSongs.map((album, index) => <option key={index} value={album.title}>{album.title}</option> )}
                                    </optgroup>
                                </select></div>
                            </div>
                            </div>
                            <div className="mb-3">
                                {songLoading ? <button className="btn btn-success btn-brand" type="submit" disabled>Uploading...</button> : <button className="btn btn-success btn-brand" type="submit">Submit</button>}
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Add Music Video</p>
                        </div>
                        <div className="card-body">
                        <form onSubmit={handleVideoSubmit}>
                            <div className="row">
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Video file</strong><br /></label><input className="form-control" type="file" id="videofile" placeholder="user.name" name="videofile" onChange={(e) => setVideoFile(e.target.files[0])} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Video poster</strong><br /></label><input className="form-control" type="file" id="videoposter" placeholder="user@example.com" name="thumbnail" onChange={(e) => setVideoCover(e.target.files[0])} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Youtube link (trailer)</strong><br /></label><input className="form-control" type="text" id="videotrailer" placeholder="add youtube link to trailer" name="videotrailer" value={videoTrailer} onChange={(e) => setVideoTrailer(e.target.value)} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Title</strong><br /></label><input className="form-control" type="text" id="videotitle" placeholder="add video title" name="videotitle" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Duration</strong><br /></label><input className="form-control" type="text" id="videoduration" placeholder="e.g 5:16" name="videoduration" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} /></div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Album</strong><br /></label>
                                    <select className="form-select form-control"  value={videoAlbum} onChange={(e) => setVideoAlbum(e.target.value)}>
                                        <optgroup label="Choose album located">
                                            {/* <option value="none">none</option>
                                            <option value="album 1">Album 1</option>
                                            <option value="album2">Album 2</option> */}
                                            { albumVideos.map((album, index) => <option key={index} value={album.title}>{album.title}</option> )}
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                            </div>
                            <div className="mb-3">
                                {videoLoading ? <button className="btn btn-success btn-brand" type="submit" disabled>Uploading...</button> : <button className="btn btn-success btn-brand" type="submit">Submit</button>}
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
