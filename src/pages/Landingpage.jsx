import pridrLogo from '/pridr-E.png'
import KeycloakService from "../services/Keycloak.js";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import * as React from "react";

const Landing = () => {
    return (
        <>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center" // Horizontaal centreren
                    alignItems="center"     // Verticaal centreren
                    style={{textAlign: "center" }} // Volledige schermhoogte en centrering
                >
                    {/* Titel */}
                    <Grid size={12}>
                        <h1>Welcome to</h1>
                    </Grid>

                    {/* Letters en logo onder elkaar */}
                    <Grid>
                        <Grid container spacing={1} justifyContent="center" alignItems="center">
                            <Grid>
                                <h1>P</h1>
                            </Grid>
                            <Grid>
                                <h1>R</h1>
                            </Grid>
                            <Grid>
                                <h1>I</h1>
                            </Grid>
                            <Grid>
                                <h1>D</h1>
                            </Grid>
                            <Grid>
                                <img
                                    style={{
                                        marginLeft: -10,
                                        marginRight: -10,
                                        marginTop: 8,
                                        padding: 0,
                                        maxHeight: "6em",
                                    }}
                                    src={pridrLogo}
                                    className="logo Pridr"
                                    alt="Pridr logo"
                                />
                            </Grid>
                            <Grid>
                                <h1>R</h1>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Login-knop */}
                    <Grid size={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            onClick={() => {
                                KeycloakService.doLogin();
                            }}
                            style={{ marginTop: 40 }}
                        >
                            Sign in / Sign up
                        </Button>
                    </Grid>
                </Grid>
            </>
    );
};

export default Landing;