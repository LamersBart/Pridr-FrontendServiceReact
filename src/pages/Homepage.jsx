import React, {useEffect, useState} from 'react';
import KeycloakService from "../services/Keycloak.js";
import Grid from '@mui/material/Grid2';


const Home = () => {
    const [token, setToken] = useState('');
    useEffect(() => {
        // Retrieve the token when the component mounts
        const fetchToken = async () => {
            try {
                const currentToken = KeycloakService.getToken();
                setToken(currentToken); // Set the token to the state
            } catch (error) {
                console.error('Failed to fetch Keycloak token:', error);
            }
        };
        fetchToken();
    }, []); // Empty dependency array ensures this effect runs once on mount
    return (
        <>
            <h1>My Awesome React App</h1>
            <h1>Secured with Keycloak</h1>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <p style={{wordWrap: 'break-word'}}>{token}</p>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
