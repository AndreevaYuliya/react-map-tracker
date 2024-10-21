import React, { useState } from 'react';

import { TextField, Button } from '@mui/material';

import authStore from '../stores/AuthStore';

const Auth = () => {
    const [key, setKey] = useState('');

    const handleAuth = () => {
        if (key) {
            authStore.setKey(key);
        }
    };

    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <TextField label="Enter your key" value={key} onChange={(e) => setKey(e.target.value)} />
                
            <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleAuth}>
                Submit
            </Button>
        </div>
    );
};

export default Auth;
