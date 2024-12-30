import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid2';
import KeycloakService from "../services/Keycloak.js";
import {userApi} from "../services/api.js";
import UserProfileCard from "../components/UserProfileCard.jsx";

const Home = () => {
    const [profiles, setProfiles] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userID = KeycloakService.getKeycloakId();
                setUserId(userID);
            } catch (error) {
                console.error('Failed to fetch Keycloak userId:', error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await userApi.get("/profiles");
                setProfiles(response.data);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };
        fetchProfiles();
    }, [userId]);

    return (
        <>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
                <Grid container size={8} justifyContent="center" alignItems="center">
                    {
                        profiles
                        .filter((profile) => profile.keyCloakId !== userId)
                        .map((profile) => (
                            <Grid size={[12, 6, 3]} key={profile.id}>
                                <UserProfileCard profile={profile}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
