import axios from 'axios';
import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Alert } from 'react-bootstrap'
import '../App.css';

export default function Login() {

    // document.body.style.backgroundColor  = 'blue';
    document.body.classList.add('bg-gradient-primary');

    const { REACT_APP_API_ROOT } = process.env;

    const { dispatch } = useAuthContext();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false)

    const handleAuth = (e) => {
        e.preventDefault();

        setLoading(true)
        axios.post(`${REACT_APP_API_ROOT}/auth/login`, { email, password }, { withCredentials: true })
            .then(response => {
                const res = response.data[0];
                if (res.auth.status === 'failed') {
                    setError(res.auth.message)
                    setLoading(false);
                    return;
                }
                // dispatch({ type: 'LOGIN', payload: res.user })
                dispatch({ type: 'LOGIN', payload: res.user })
                setLoading(false);
                console.log(res.user);
            })
            .catch(error => {
                console.log(error.message);
                setLoading(false)
                // setError(error.message)
            })
        
    }

  return (
    <div className="container vh-100">
        <div className="row justify-content-center h-100">
            <div className="col-md-9 col-lg-12 col-xl-10 align-self-center">
            <div className="card shadow-lg o-hidden border-0 my-5 login-card">
                <div className="card-body p-0">
                <div className="row">
                    <div className="col-lg-6 d-none d-lg-flex">
                    <div className="flex-grow-1 bg-login-image" style={{backgroundImage: 'url("https://images.pexels.com/photos/6389804/pexels-photo-6389804.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load")'}} />
                    </div>
                    <div className="col-lg-6 align-self-center">
                    <div className="p-5">
                        <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome!</h4>
                        </div>
                        <form className="user" onSubmit={handleAuth}>
                        <div className="mb-3"><input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                        <div className="mb-3"><input className="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password" autoComplete="" value={password} onChange={(e) => setPassword(e.target.value)} /></div>

                        { loading ? <button className="btn btn-primary d-block btn-user w-100 mb-3" type="submit" disabled>loading...</button> : <button className="btn btn-primary d-block btn-user w-100 mb-3" type="submit">Login</button> }
                        { error && <Alert variant='danger'> {error}</Alert>}

                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>

  )
}
