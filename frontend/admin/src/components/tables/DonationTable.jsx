import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useAuthContext  } from '../../hooks/useAuthContext';

export default function DonationTable() {

    const { REACT_APP_API_ROOT } = process.env;
    // const { user } = useAuthContext();
    const [donations, setDonations ] = useState([]);
    // const [analytics, setAnalytics ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ limit, setLimit ] = useState(10);
    const [ query, setQuery ] = useState('');

    const handleMore = () => {
        setLimit(limit+10);
    }

    const handleSearch = (data) => {
        return data.filter(
            (d) => d.firstname.toLowerCase().includes(query)
        );
    }

    useEffect(()=>{

        const fetchData = ()=>{

            setLoading(true);
            // console.log('user: '+ user)

            axios.get(`${REACT_APP_API_ROOT}/data/donations`)
                .then(response => {
                    setDonations(response.data)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error) ;
                    setLoading(false);
                })

        }

        fetchData()
    
    }, [REACT_APP_API_ROOT])

    return (
        <div className="container-fluid">
            <div className="card shadow">
                <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold"></p>
                </div>
                <div className="card-body">
                <div className="row">
                    <div className="col-md-6 text-nowrap">
                    </div>
                    <div className="col-md-6">
                    <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} /></label></div>
                    </div>
                </div>
                <div className="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                    <table className="table my-0" id="dataTable">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Date</th>
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
                            handleSearch(donations) && handleSearch(donations).slice(0, limit).map((donation, index) => 
                                        <tr key={donation.id}>
                                            <td>{index+1}</td>
                                            <td>{donation.firstname}</td>
                                            <td>{donation.lastname}</td>
                                            <td>{donation.email}</td>
                                            <td>NGN{donation.ammount}</td>
                                            <td>{donation.date_of}</td>
                                        </tr>
                                    )
                            }
                    </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-md-6 align-self-center">
                    <p id="dataTable_info" className="dataTables_info d-none" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
                    </div>
                    <div className="col-md-6 text-end">
                        {handleSearch(donations) === undefined || handleSearch(donations).length === 0 ? '' : <button className="btn btn-success border rounded-0 btn-brand" type="button" onClick={handleMore}>Load more</button>}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
