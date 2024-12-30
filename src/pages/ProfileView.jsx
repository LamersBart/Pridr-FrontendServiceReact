import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField, MenuItem, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { userApi } from "../services/api.js";

const ProfileView = () => {
    const { id } = useParams(); // KeyCloak ID uit de URL
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Lijst met opties voor dropdowns
    const sexualityOptions = [
        { value: 0, label: "Onbekend" },
        { value: 1, label: "Gay" },
        { value: 2, label: "Lesbian" },
        { value: 3, label: "Bisexual" },
        { value: 4, label: "Trans" },
    ];

    const lookingForOptions = [
        { value: 0, label: "Friendship" },
        { value: 1, label: "Relation" },
        { value: 2, label: "Fun" },
    ];

    const relationStatusOptions = [
        { value: 0, label: "Onbekend" },
        { value: 1, label: "Single" },
        { value: 2, label: "Committed" },
        { value: 3, label: "Open relation" },
        { value: 4, label: "Engaged" },
        { value: 5, label: "Married" },
    ];

    // Laad huidige profielgegevens
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await userApi.get(`/profiles/${id}`);
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profiles:", error);
                setLoading(false);
            }
        };
        loadProfile();
    }, [id]);

    // Update veld in de state bij wijzigingen
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Verstuur bewerkte gegevens met PATCH
    const handleSave = async () => {
        try {
            await userApi.patch(`/profiles/${id}`, profile);
            alert("Profiel succesvol bijgewerkt!");
            navigate(`/profile/${id}`); // Terug naar home of een andere pagina
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Er is iets misgegaan bij het opslaan van je profiel.");
        }
    };

    if (loading || !profile) return <div>Loading...</div>;

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid size={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Profiel Bewerken</Typography>
                        <Grid container spacing={2} marginTop={2}>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Gebruikersnaam"
                                    name="userName"
                                    value={profile.userName || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Leeftijd"
                                    name="age"
                                    value={profile.age || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Gewicht (kg)"
                                    name="weight"
                                    value={profile.weight || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Lengte (cm)"
                                    name="height"
                                    value={profile.height || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Sexualiteit"
                                    name="sexuality"
                                    value={profile.sexuality || 0}
                                    onChange={handleChange}
                                >
                                    {sexualityOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Op zoek naar"
                                    name="lookingFor"
                                    value={profile.lookingFor || 0}
                                    onChange={handleChange}
                                >
                                    {lookingForOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Relatiestatus"
                                    name="relationStatus"
                                    value={profile.relationStatus || 0}
                                    onChange={handleChange}
                                >
                                    {relationStatusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Partner ID"
                                    name="partnerUserId"
                                    value={profile.partnerUserId || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="flex-end" marginTop={2}>
                            <Grid>
                                <Button variant="contained" color="primary" onClick={handleSave}>
                                    Opslaan
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ProfileView;

