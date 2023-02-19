import React, { useState, useEffect } from 'react';
// import Modal from '../../pages/modal/editAlbum'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
// import bootstrap from 'bootstrap/dist/js/bootstrap.min'
// import React, { useState, useEffect, useCallback } from 'react';
// import { useAxios } from '../../hooks/useAxios';

export default function AlbumsTable() {

    const { REACT_APP_API_ROOT } = process.env;
    // const [albums, setAlbums ] = useState([]);
    // const [ loading, setLoading ] = useState(false);
    // const [ limit, setLimit ] = useState(5)
    // const [ url, setUrl ] = useState('http://localhost:5000/data/albums?limit='+limit);
    const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);

    const [albums, setAlbums ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ limit, setLimit ] = useState(10);
    const [ query, setQuery ] = useState('');

    const [ editId, setEditId ] = useState(0);
    const [ title, setTitle ] = useState("");
    const [ date, setDate ] = useState("");

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
        await axios.delete(`${REACT_APP_API_ROOT}/data/album/${list.id}`);
        setAlbums(albums.filter((album) => album.id !== list.id));
    }

    const handleEdit =  (list) => {

        setEditId(list.id)
        setTitle(list.title);
        setDate(list.original_date);
        setShow(true)
        
    }

    const handleSubmit =  (e) => {
        e.preventDefault();

        axios.put(`${REACT_APP_API_ROOT}/data/album/${editId}`, { title, originaldate: date })
            .then((response) => {
                if (response.data[0].status === 'ok'){

                    alert(response.data[0].message);
                    const newList = [...albums]
                    console.log('editId: '+editId);
                    const index = albums.findIndex(list => list.id === editId)
                    newList[index].title = title;
                    newList[index].original_date = date;
                    
                    setAlbums(newList);
                    
                } else { alert(response.data[0].message) }
            })
            .catch((error) => { console.log(error.message)})

    }

    useEffect(()=>{

        // const fetchAlbums = ()=>{
        //     setLoading(true);
        //     axios.get(url)
        //       .then((response)=>{
        //         // setAlbums(response.data);
        //         const albumList = [];
        //         response.data.forEach((list) => albumList.push(list));
        //         console.log(albumList);
        //         setAlbums(albumList);
        //         setLimit(limit + 5)
        //         setLoading(false);
        //       })
        //       .catch((error)=>{
        //         console.log('error: ' + error);
        //         setLoading(false);
        //       })
        // }

        const fetchAlbums = ()=>{
            setLoading(true);
            axios.get(`${REACT_APP_API_ROOT}/data/albums`)
              .then((response)=>{
                setAlbums(response.data);
                setLoading(false);
              })
              .catch((error)=>{
                console.log('error: ' + error);
                setLoading(false);
              })
        }

        fetchAlbums()
    
    }, [REACT_APP_API_ROOT])

  return (
    <>
        <div className="container-fluid">
            <h3 className="text-dark mb-4">Albums</h3>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">All albums</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 text-nowrap">
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-end dataTables_filter" id="dataTable_filter-1">
                                <label className="form-label">
                                    <input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                        <table className="table my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Title</th>
                                    <th>Songs</th>
                                    <th>Date</th>
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
                                    </tr>
                                }
                                {
                                    handleSearch(albums) && handleSearch(albums).slice(0, limit).map((album, index) => 
                                        <tr key={album.id}>
                                            <td>{index+1}</td>
                                            <td>{album.title}</td>
                                            <td>{album.songs}</td>
                                            <td>{album.original_date}</td>
                                            <td>
                                                <button className="btn btn-sm me-2" type="button" data-bs-target="#edit-album" data-bs-toggle="modal" onClick={()=> handleEdit(album)}><i className="fas fa-edit text-primary" /></button>
                                                <button className="btn btn-sm" type="button"><i className="fas fa-trash-alt text-danger" onClick={() => handleDelete(album)} /></button>
                                            </td>
                                        </tr>
                                    )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-6 align-self-center">
                        </div>
                        <div className="col-md-6 text-end">
                            {handleSearch(albums) === undefined || handleSearch(albums).length === 0 ? '' : <button className="btn btn-success border rounded-0 btn-brand" type="button" onClick={handleMore}>load albums</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit album</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">Title</label>
                            <input className="form-control" type="text" placeholder="album title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <label className="form-label">Date (optional)</label>
                            <input className="form-control" type="text" placeholder="Date of creation" value={date} onChange={(e) => setDate(e.target.value)} />
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
        {/* <Modal>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Title</label>
                    <input className="form-control" type="text" placeholder="album title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mt-3">
                    <label className="form-label">Date (optional)</label>
                    <input className="form-control" type="text" placeholder="Date of creation" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <button className="btn btn-success mt-3 btn-brand" type="submit">submit</button>
            </form>
        </Modal> */}
        {/* <div className="modal fade" role="dialog" tabIndex={-1} id="edit-album">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header border-0">
                    <h4 className="modal-title fw-bold text-success">Edit album</h4><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                    <form>
                    <div><label className="form-label">Title</label><input className="form-control" type="text" placeholder="album title" /></div>
                    <div className="mt-3"><label className="form-label">Date (optional)</label><input className="form-control" type="text" placeholder="Date of creation" /></div><button className="btn btn-success mt-3 btn-brand" type="button">submit</button>
                    </form>
                </div>
                <div className="modal-footer border-0"><button className="btn btn-light" type="button" data-bs-dismiss="modal">Close</button></div>
                </div>
            </div>
        </div> */}
    </>
  )
}
