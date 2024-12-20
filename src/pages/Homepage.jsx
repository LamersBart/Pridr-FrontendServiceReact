import React from 'react';
import KeycloakService from "../services/Keycloak.js";
import Grid from '@mui/material/Grid2';

const Home = () => {
    const token = React.useState(KeycloakService.getToken());
    return (
        <div id="keycloak">
            <h1>My Awesome React App</h1>
            <h1>Secured with Keycloak</h1>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <p style={{wordWrap: 'break-word'}}>{token}</p>
                </Grid>
            </Grid>
            <button onClick={() => {
                KeycloakService.doLogout()
            }} className='m-1'>
                Logout
            </button>
        </div>
    );
};

export default Home;
