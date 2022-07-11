import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

export default function ContactSection() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ error, setError ] = useState(null);
    const [ success, setSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const { REACT_APP_API_ROOT } = process.env;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const body = { name, email, subject, message };

        if ( name && email && subject && message ) {

            axios.post(`${REACT_APP_API_ROOT}/contact`, body)
                .then(response => {
                    if (response.data.status === 'ok') {
                        console.log('successfully sent');
                        setError(null);
                        setLoading(false);
                        setSuccess(true);
                        setTimeout(() =>{
                            setSuccess(false);
                        }, 2000);
                    } else {
                        setError(response.data.message);
                        setLoading(false);
                        setTimeout(() =>{
                            setError(null)
                        }, 2000);
                    }
                    
                })
                .catch(error => {
                    console.log(error.message)
                    setError('Network issue! try agin later!');
                    setLoading(false);
                    setTimeout(() =>{
                        setError(null)
                    }, 2000);

                })


        } else {

            setError('Please fill in all fields!');
            setLoading(false);
            setTimeout(() =>{
                setError(null)
            }, 2000);
            
        }
    }

    return (
        <section className="contact-wrapper pt-4">
            <div className="container mt-4">
                <div className="row gx-5 gy-4">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                        <img className="w-100 h-100" src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Legend_image" />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label">Name</label>
                                <input className="form-control" type="text" placeholder="e.g John smith" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <label className="form-label">Email</label>
                                <input className="form-control" type="email" name="email" placeholder="e.g john@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <label className="form-label">Subject</label>
                                <input className="form-control" type="text" name="subject" placeholder="e.g Paid performance request" value={subject} onChange={(e) => setSubject(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <label className="form-label">Message</label>
                                <textarea className="form-control" rows={5} name="message" placeholder="Your message here!" value={message} onChange={(e) => setMessage(e.target.value)} />
                            </div>
                            <div className="mt-5">
                                {loading ? <button className="btn btn-success btn-lg px-5 mb-3" type="submit" disabled>SENDING...</button> : <button className="btn btn-success btn-lg px-5 mb-3" type="submit">SEND MESSAGE</button>}
                                {error &&<Alert variant='danger'><strong>Error</strong>: {error}</Alert>}
                                {success &&<Alert variant='success'><strong>Success</strong>: Message sent successfully</Alert>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}
