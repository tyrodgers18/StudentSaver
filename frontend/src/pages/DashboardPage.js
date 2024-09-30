// DashboardPage.js

import React from 'react';
import { useEffect } from 'react';

function DashboardPage() {
    useEffect(() => {
        console.log('DashboardPage rendered');
    }, []);

    return (
        <div>
            <h1>Dashboard Page</h1>
        </div>
    )
}

export default DashboardPage;