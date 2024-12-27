import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

const fetchProfileDetails = async (id) => {
    // Simuleer een API-call om profielgegevens op te halen
    if (id === "1e90c0e1-16d0-459a-8406-7f80c4772eca") {
        return { id, name: "Alice", bio: "Loves coding!" }
    } else {
        return { id, name: "Bob", bio: "Hiking enthusiast!" }
    }
};

const ProfileView = () => {
    const { id } = useParams(); // Haal profiel-ID uit URL
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            const data = await fetchProfileDetails(id);
            setProfile(data);
        };
        loadProfile();
    }, [id]);

    const handleChatClick = () => {
        // Navigeer naar de chat met dit profiel
        navigate(`/chat/${id}`);
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid size={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h4">{profile.name}</Typography>
                        <Typography variant="body1">{profile.bio}</Typography>
                        <Button variant="contained" color="primary" onClick={handleChatClick}>
                            Start Chat
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ProfileView;
