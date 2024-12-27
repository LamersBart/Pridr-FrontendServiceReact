import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import KeycloakService from "../services/Keycloak.js";

// Simuleer API-oproep voor gebruikersprofielen
const fetchProfiles = async () => {
    // Hier zou je een API-oproep maken naar de backend
    return [
        { id: "1e90c0e1-16d0-459a-8406-7f80c4772eca", name: "Alice", bio: "Loves coding!" },
        { id: "6d2177d0-5a1e-4c16-bb5f-37653d889742", name: "Bob", bio: "Hiking enthusiast!" },
    ];
};

const Home = () => {
    const [profiles, setProfiles] = useState([]);
    const [userId, setUserId] = useState([]); // Verzender ID
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfiles = async () => {
            const data = await fetchProfiles();
            setProfiles(data);
        };
        loadProfiles();
        const fetchUserId = async () => {
            try {
                const userID = KeycloakService.getKeycloakId();
                setUserId(userID); // Set the token to the state
                console.log(userID);
            } catch (error) {
                console.error('Failed to fetch Keycloak userId:', error);
            }
        };
        fetchUserId();
    }, []);

    const handleProfileClick = (profileId) => {
        navigate(`/profile/${profileId}`);
    };

    return (
        <>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
                {
                    profiles
                        .filter((profile) => profile.id !== userId)
                        .map((profile) => (
                    <Grid size={3} key={profile.id}>
                        <Card onClick={() => handleProfileClick(profile.id)} style={{ cursor: "pointer" }}>
                            <CardContent>
                                <Typography variant="h5">{profile.name}</Typography>
                                <Typography variant="body2">{profile.bio}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    ))
                }
            </Grid>
        </>
    );
};

export default Home;
