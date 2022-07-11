import React from 'react';
// import Table from './tables/AlbumsTable'

export default function Tablecard({ title }) {
  return (
    <div className="container-fluid">
        <div className="card shadow">
            <div className="card-header py-3">
            <p className="text-primary m-0 fw-bold">{title}</p>
            </div>
            <div className="card-body">
            <div className="row">
                <div className="col-md-6 text-nowrap">
                <div id="dataTable_length" className="dataTables_length d-none" aria-controls="dataTable"><label className="form-label">Show&nbsp;<select className="d-inline-block form-select form-select-sm">
                        <option value={10} selected>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>&nbsp;</label></div>
                </div>
                <div className="col-md-6">
                <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" /></label></div>
                </div>
            </div>
            <div className="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                <table className="table my-0" id="dataTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Airi Satou</td>
                        <td>satou@gmail.com</td>
                        <td>52145738163</td>
                        <td>$100</td>
                        <td>2008/11/28</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-md-6 align-self-center">
                <p id="dataTable_info" className="dataTables_info d-none" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
                </div>
                <div className="col-md-6 text-end"><button className="btn btn-success border rounded-0 btn-brand" type="button">Load more</button></div>
            </div>
            </div>
        </div>
    </div>

  )
}
