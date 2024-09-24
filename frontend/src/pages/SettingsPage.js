// SettingsPage.js

import React, { useEffect } from 'react';

function SettingsPage() {
    useEffect(() => {
        console.log('SettingsPage rendered');
    }, []);

    return (
        <div>
            <h1>Settings</h1> {/* This will display 'Settings' on the page */}
        </div>
    );
}

export default SettingsPage;
