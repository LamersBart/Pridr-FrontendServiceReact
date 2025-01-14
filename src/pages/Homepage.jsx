import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid2';
import {userApi} from "../services/api.js";
import UserProfileCard from "../components/UserProfileCard.jsx";

const Home = ({ profile }) => {
    const [profiles, setProfiles] = useState([]);

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
    }, []);

    return (
        <>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
                <Grid container size={8} justifyContent="center" alignItems="center">
                    {
                        profiles.map((profileFromList) => (
                            profileFromList.id === profile.id ? null :
                                profileFromList.userName === null || profileFromList.userName === "null" ? null :
                                <Grid size={[12, 6, 3]} key={profileFromList.id}>
                                    <UserProfileCard profile={profileFromList}/>
                                </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
