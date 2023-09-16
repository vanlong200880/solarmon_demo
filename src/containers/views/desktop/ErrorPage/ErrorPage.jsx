import React from 'react';


export default function ErrorPage() {
    var { t } = this.props;

    return (
        <div className="error-404">
            <h2>403 Forbidden</h2>
            <p>You don't have the permission to access the requested resource. It is either read-protected or not readable by the server.</p>
        </div>

    )
}