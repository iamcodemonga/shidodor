import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';
import PaystackPop from '@paystack/inline-js';

export default function DonateSection() {

    const [ firstname, setFirstName ] = useState('')
    const [ lastname, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ amount, setAmount ] = useState(10000);
    const [ loading, setLoading ] = useState(true);
    const { REACT_APP_API_ROOT } = process.env;
    

    const navigate = useNavigate();
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const mediaType = queryParams.get('type');
    const uid = queryParams.get('uid');

    const payWithPaystack = (e) => {
        e.preventDefault();

        const metadata = { uid, mediaType };

        if(firstname && lastname && email && amount) {
            const paystack = new PaystackPop();
            paystack.newTransaction({
                key: 'pk_test_8abfe4c759803140c25a6cc4186db85fab290775',
                amount: amount * 100,
                email,
                firstname,
                lastname,
                metadata,
                // mediaType,
                // uid,
                onSuccess(transaction){
                    // let message =`Payment completed! Reference: ${transaction.reference}`;
                    setLoading(true);
                    axios.get(`${REACT_APP_API_ROOT}/verifyPayment?reference=${transaction.reference}`)
                        .then((response) => {
                            console.log(response.data);
                            if (response.data.status === 'ok') {
                                setFirstName('');
                                setLastName('');
                                setEmail('');
                                setLoading(false);
                                navigate('/thanks');
                            } else {
                                alert(response.data.message);
                                setLoading(false);
                            }
                            
                        })
                        .catch((error) => {
                            console.log(error)
                            setLoading(false);
                        })
                },
                onCancel(){
                    alert('You cancelled this transaction')
                }
            })
        } else {
            alert('Please, fill in all fields');
        }
    }

    useEffect(() => {

        const fetchData = () => {
            axios.get(`${REACT_APP_API_ROOT}/donate?type=${mediaType}&&uid=${uid}`)
                .then((response) =>{
                    if (response.data.status === 'ok') {
                        setLoading(false)
                    } else {
                        navigate('/notfound')
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error.message)
                })
        }
        fetchData();

    },[ REACT_APP_API_ROOT, uid, mediaType, navigate])
    

    return (
        <>
            {loading ? <PageLoader /> :
            <section className="vh-100 w-100 d-flex justify-content-center align-items-center">
                <div className="px-3" style={{maxWidth: 700}}>
                    <h3 style={{color: 'var(--Accent)'}}>SUPPORT CHIDODO MUSIC&nbsp;</h3>
                    <p className="mb-4">This website is currently under production/development, it will open when its complete.</p>
                    <form onSubmit={payWithPaystack}>
                        <div>
                            <label className="form-label">Firstname</label>
                            <input className="form-control" type="text" name="name" placeholder="e.g John smith" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="my-4">
                            <label className="form-label">Lastname</label>
                            <input className="form-control" type="text" name="name" placeholder="e.g John smith" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="my-4">
                            <label className="form-label">Email</label>
                            <input className="form-control" type="email" name="email" placeholder="e.g Johnsmith@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="form-label">Amount</label>
                            <select className="form-select form-control" value={amount} onChange={(e) => setAmount(e.target.value)}>
                                <optgroup label="Donation amount">
                                    <option value={10000}>NGN 10,000</option>
                                    <option value={5000}>NGN 5000</option>
                                    <option value={2000}>NGN 2000</option>
                                    <option value={1000}>NGN 1000</option>
                                </optgroup>
                            </select>
                        </div>
                        <button className="btn btn-success btn-lg mt-5 w-100" type="submit">Donate</button>
                    </form>
                </div>
            </section>
            }
        </>
    )
}
