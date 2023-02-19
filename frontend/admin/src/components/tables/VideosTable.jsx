import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function VideosTable() {

    const { REACT_APP_API_ROOT } = process.env;
    const [show, setShow] = useState(false);

    const [videos, setVideos ] = useState([]);
    const [ allAlbum, setAllAlbum ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ limit, setLimit ] = useState(10);
    const [ query, setQuery ] = useState('');

    const [ editId, setEditId ] = useState(0);
    const [ title, setTitle ] = useState("");
    const [ trailer, setTrailer ] = useState("");
    const [ album, setAlbum ] = useState("");
    const [ length, setLength ] = useState("");

    const handleClose = () => setShow(false);

    const handleMore = () => {
        setLimit(limit+10);
    }

    const handleSearch = (data) => {
        return data.filter(
            (d) => d.title.toLowerCase().includes(query)
        );
    }

    const handleDelete = async (list) => {
        await axios.delete(`${REACT_APP_API_ROOT}/data/video/${list.id}`);
        setVideos(videos.filter((video) => video.id !== list.id));
    }

    const handleEdit =  (list) => {

        setEditId(list.id)
        setTitle(list.title);
        setTrailer(list.trailer);
        setAlbum(list.album);
        setLength(list.length);
        setShow(true)
        
    }

    const handleSubmit =  (e) => {
        e.preventDefault();

        axios.put(`${REACT_APP_API_ROOT}/data/video/${editId}`, { title, trailer, album, length })
            .then((response) => {
                if (response.data[0].status === 'ok'){

                    alert(response.data[0].message);
                    const newList = [...videos];
                    const index = videos.findIndex(list => list.id === editId)
                    newList[index].title = title;
                    newList[index].trailer = trailer;
                    newList[index].album = album;
                    newList[index].length = length;
                    
                    setVideos(newList)
                    
                } else { 
                    alert(response.data[0].message);
                 }
            })
            .catch((error) => { console.log(error.message)})

    }

    useEffect(()=>{

        const fetchData = ()=>{

            setLoading(true);

            axios.all([axios.get(`${REACT_APP_API_ROOT}/data/videos`), axios.get(`${REACT_APP_API_ROOT}/pages/uploads`)])
            .then(axios.spread((songList, albumList) => {

                const sumo = { title: 'none' };
                setVideos(songList.data);
                albumList.data.unshift(sumo)
                setAllAlbum(albumList.data);
                setLoading(false);

            }))
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
            })

        }

        fetchData()
    
    }, [REACT_APP_API_ROOT])

    return (
        <>
            <div className="container-fluid">
                <h3 className="text-dark mb-4">Music Videos</h3>
                <div className="card shadow">
                    <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">All videos</p>
                    </div>
                    <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 text-nowrap">
                        </div>
                        <div className="col-md-6">
                        <div className="text-md-end dataTables_filter" id="dataTable_filter-1"><label className="form-label"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} /></label></div>
                        </div>
                    </div>
                    <div className="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                        <table className="table my-0" id="dataTable">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Title</th>
                                <th>Trailer</th>
                                <th>Album</th>
                                <th>Length</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading && 
                                <tr>
                                    <td>Loading...</td>
                                    <td>Loading..</td>
                                    <td>Loading..</td>
                                    <td>Loading..</td>
                                    <td>Loading..</td>
                                    <td>Loading..</td>
                                </tr>
                            }
                            {
                                handleSearch(videos) && handleSearch(videos).slice(0, limit).map((video, index) => 
                                            <tr key={video.id}>
                                                <td>{index+1}</td>
                                                <td>{video.title}</td>
                                                <td>{video.trailer}</td>
                                                <td>{video.album}</td>
                                                <td>{video.length}</td>
                                                <td>
                                                    <button className="btn btn-sm me-2" type="button" data-bs-target="#edit-album" data-bs-toggle="modal" onClick={()=> handleEdit(video)}><i className="fas fa-edit text-primary" /></button>
                                                    <button className="btn btn-sm" type="button"><i className="fas fa-trash-alt text-danger" onClick={() => handleDelete(video)} /></button>
                                                </td>
                                            </tr>
                                        )
                            }
                        </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-6 align-self-center">
                        <p id="dataTable_info-1" className="dataTables_info d-none" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
                        </div>
                        <div className="col-md-6 text-end">
                            {handleSearch(videos) === undefined || handleSearch(videos).length === 0 ? '' : <button className="btn btn-success border rounded-0 btn-brand" type="button" onClick={handleMore}>Load videos</button>}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label">Title</label>
                                <input className="form-control" type="text" placeholder="video title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <label className="form-label">Trailer ( youtube link )</label>
                                <input className="form-control" type="text" placeholder="add youtube link" value={trailer} onChange={(e) => setTrailer(e.target.value)} />
                            </div>
                            <div className="mt-3"><label className="form-label">Album</label>
                                <select className="form-select" value={album} onChange={(e) => setAlbum(e.target.value)}>
                                    <optgroup label="Change the album">
                                        { allAlbum.map((album, index) => <option key={index} value={album.title}>{album.title}</option> ) }
                                    </optgroup>
                                </select>
                            </div>
                            <div className="mt-3">
                                <label className="form-label">Duration</label>
                                <input className="form-control" type="text" placeholder="Duration of the video" value={length} onChange={(e) => setLength(e.target.value)} />
                            </div>
                            <button className="btn btn-success mt-3 btn-brand" type="submit">submit</button>
                        </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
            </Modal>
        </>

    )
}
