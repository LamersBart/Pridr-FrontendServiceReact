import pridrLogo from '/pridr-E.png'
import KeycloakService from "../services/Keycloak.js";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import * as React from "react";

const Landing = () => {
    return (
        <>
            <h1>Welcome to</h1>
            <Grid container spacing={2}>
                <Grid size={2}>
                    <h1>P</h1><
                    /Grid>
                <Grid size={2}>
                    <h1>R</h1>
                </Grid>
                <Grid size={2}>
                    <h1>I</h1>
                </Grid>
                <Grid size={2}>
                    <h1>D</h1>
                </Grid>
                <Grid size={2}>
                    <img style={{marginLeft: -25, marginTop: 12}} src={pridrLogo} className="logo Pridr"
                         alt="Pridr logo"/>
                </Grid>
                <Grid size={2}>
                    <h1>R</h1>
                </Grid>
            </Grid>
            <Button color="primary" variant="contained" size="small" onClick={() => { KeycloakService.doLogin() }}>
                Sign in / Sign up
            </Button>
        </>
    );
};

export default Landing;