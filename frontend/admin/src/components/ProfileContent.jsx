import axios from 'axios';
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuthContext  } from '../hooks/useAuthContext';

export default function ProfileContent() {

    const { user, dispatch } = useAuthContext();
    const { REACT_APP_API_ROOT } = process.env;

    const [ showOld, setShowOld ] = useState(false);
    const [ showNew, setShowNew ] = useState(false);
    const [ showConfirmed, setShowConfirmed ] = useState(false);

    // profile edit state
    const [ name, setName ] = useState(user.fullname);
    const [ email, setEmail ] = useState(user.email);

    //change password useState
    const [ old, setOld ] = useState("");
    const [ newPass, setNewPass ] = useState("");
    const [ confirm, setConfirm ] = useState("");

    const [ loadingEdit, setLoadingEdit ] = useState(false);
    const [ loadingPass, setLoadingPass ] = useState(false);

    const [ editSuccess, setEditSuccess ] = useState(false);
    const [ editError, setEditError ] = useState(false);
    const [ editMessage, setEditMessage ] = useState("");

    const [ passSuccess, setPassSuccess ] = useState(false);
    const [ passError, setPassError ] = useState(false);
    const [ passMessage, setPassMessage ] = useState("");

    const handleShowOld = () => {
        setShowOld((prevShowOld) => !prevShowOld)
    }

    const handleShowNew = () => {
        setShowNew((prevShowNew) => !prevShowNew)
    }

    const handleShowConfirmed = () => {
        setShowConfirmed((prevShowConfirmed) => !prevShowConfirmed)
    }

    const handlePassword = (e) => {

        e.preventDefault();

        const data = { oldPassword: old, newPassword: newPass, confirmPassword: confirm };

        setLoadingPass(true);
        axios.put(`${REACT_APP_API_ROOT}/auth/password/1`, data)
            .then(response => {

                setLoadingPass(false)
                if (response.data[0].status === 'failed') {
                    setPassError(true);
                    setTimeout(() => {
                        setPassError(false);
                    }, 5000)
                    setPassMessage(response.data[0].message);
                    return;
                }

                setPassError(false);
                setPassSuccess(true);
                setOld("");
                setNewPass("");
                setConfirm("");

                setTimeout(() => {
                    setPassSuccess(false)
                }, 2000);
                
            })
            .catch(error => {
                console.log(error.message)
                setLoadingPass(false)
            })

    }

    const handleEdit = (e) => {

        e.preventDefault();

        const data = { name: name, email: email };

        setLoadingEdit(true);
        axios.put(`${REACT_APP_API_ROOT}/auth/ep/1`, data)
            .then(response => {

                setLoadingEdit(false)
                if (response.data[0].status === 'failed') {
                    setEditError(true);
                    setTimeout(() => {
                        setEditError(false);
                    }, 5000)
                    setEditMessage(response.data[0].message);
                    return;
                }

                dispatch({ type: 'EDIT_PROFILE', payload: response.data[0].user })
                setEditError(false);
                setEditSuccess(true);
                // setOld("");
                // setNewPass("");
                // setConfirm("");

                setTimeout(() => {
                    setEditSuccess(false)
                }, 2000);
                
            })
            .catch(error => {
                console.log(error.message)
                setLoadingEdit(false)
            })

    }

    // useEffect(() => {

    //     setName(user.name)
    //     setEmail(user.email)

    // }, [user])

    return (
        <div className="container-fluid">
            <h3 className="text-dark mb-4">Profile</h3>
            <div className="row mb-3">
                <div className="col-lg-4">
                <div className="card shadow mb-3">
                    <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">User Settings</p>
                    </div>
                    <div className="card-body">
                    <form onSubmit={handleEdit}>
                        <div className="row">
                        <div className="col-12">
                            <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Name</strong><br /></label><input className="form-control" type="text" id="username" placeholder="input name" name="name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                        </div>
                        <div className="col-12">
                            <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Email Address</strong></label><input className="form-control" type="email" id="email" placeholder="user@example.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                        </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-success btn-brand" type="submit">{loadingEdit ? 'processing...' : 'submit'}</button>
                        </div>
                        { editError && <Alert variant='danger'> {editMessage}</Alert>}
                        { editSuccess && <Alert variant='success'> Profile updated successfully!!</Alert>}
                    </form>
                    </div>
                </div>
                </div>
                <div className="col-lg-8">
                <div className="row">
                    <div className="col">
                    <div className="card shadow">
                        <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Change Password</p>
                        </div>
                        <div className="card-body">
                        <form onSubmit={handlePassword}>
                            <div className="mb-3"><label className="form-label" htmlFor="address"><strong>Old Password</strong><br /></label>
                            <div className="input-group"><input className="form-control" type={showOld ? 'text' : 'password'} placeholder="xxxxxxxxx" name="oldpassword" autoComplete="off" value={old} onChange={(e) => setOld(e.target.value)} /><span className="input-group-text" onClick={handleShowOld}>{showOld ? 'hide' : 'show'}</span></div>
                            </div>
                            <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                <div className="mb-3"><label className="form-label" htmlFor="city"><strong>New Password</strong><br /></label>
                                <div className="input-group"><input className="form-control" type={showNew ? 'text' : 'password'} placeholder="xxxxxxxxx" name="newpassword" autoComplete="off" value={newPass} onChange={(e) => setNewPass(e.target.value)} /><span className="input-group-text" onClick={handleShowNew}>{showNew ? 'hide' : 'show'}</span></div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                <div className="mb-3"><label className="form-label" htmlFor="country"><strong>Confirm Password</strong></label>
                                <div className="input-group"><input className="form-control" type={showConfirmed ? 'text' : 'password'} placeholder="xxxxxxxxx" name="confirmpassword" autoComplete="off" value={confirm} onChange={(e) => setConfirm(e.target.value)} /><span className="input-group-text" onClick={handleShowConfirmed}>{showConfirmed ? 'hide' : 'show'}</span></div>
                                </div>
                            </div>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-success btn-brand" type="submit">{loadingPass ? 'processing...' : 'submit'}</button>
                            </div>
                            { passError && <Alert variant='danger'> {passMessage}</Alert>}
                            { passSuccess && <Alert variant='success'> Password changed successfully!!</Alert>}
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
