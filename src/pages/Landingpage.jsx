import pridrLogo from '/pridr-E.png'
import KeycloakService from "../services/Keycloak.js";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import * as React from "react";

const Landing = () => {
    return (
        <>
            <h1>Welcome to</h1>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid xs={2} md={2}>
                        <h1>P</h1>
                    </Grid>
                    <Grid xs={2} md={2}>
                        <h1>R</h1>
                    </Grid>
                    <Grid xs={2} md={2}>
                        <h1>I</h1>
                    </Grid>
                    <Grid xs={2} md={2}>
                        <h1>D</h1>
                    </Grid>
                    <Grid xs={2} md={2}>
                        <img style={{marginLeft: -25, marginRight: -25, marginTop: 8, padding: -8, maxHeight: '6em'}} src={pridrLogo} className="logo Pridr" alt="Pridr logo"/>
                    </Grid>
                    <Grid xs={2} md={2}>
                        <h1>R</h1>
                    </Grid>
                </Grid>
            <Button style={{ marginTop: 80}} color="primary" variant="contained" size="small" onClick={() => { KeycloakService.doLogin() }}>
                <h3>Sign in / Sign up</h3>
            </Button>
        </>
    );
};

export default Landing;