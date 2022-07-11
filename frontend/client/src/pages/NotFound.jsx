import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <section className="vh-100 w-100 d-flex justify-content-center align-items-center">
            <div className="px-3" style={{maxWidth: 700}}>
                <h1>404 ERROR</h1>
                <p className="mb-4">This page was not found because it does not exist in the site. Check your URL for incorrect spelling and try again.</p>
                <p>
                    <Link className="btn btn-success border rounded-0 border-0" role="button" to="/">Back to Home</Link>
                </p>
            </div>
        </section>
    )
}
