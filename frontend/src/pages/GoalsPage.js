// GoalsPage.js

import React, { useEffect } from 'react';

function GoalsPage() {
    useEffect(() => {
        console.log('GoalsPage rendered');
    }, []);

    return (
        <div>
            <h1>Goals Page</h1>
        </div>
    );
}

export default GoalsPage;