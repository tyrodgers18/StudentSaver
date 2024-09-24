// TransactionsPage.js

import React, { useEffect } from 'react';

function TransactionsPage() {
    useEffect(() => {
        console.log('TransactionsPage rendered');
    }, []);

    return (
        <div>
            <h1>Transactions</h1> {/* This will display 'Transactions' on the page */}
        </div>
    );
}

export default TransactionsPage;
