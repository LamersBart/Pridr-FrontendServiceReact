import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField, MenuItem, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { userApi } from "../services/api.js";
import KeycloakService from "../services/Keycloak.js";

const ProfileView = ({ profile }) => {
    const [profileUpdate, setProfileUpdate] = useState(profile);
    const [errors, setErrors] = useState({}); // Foutmeldingen
    const [loading, setLoading] = useState(false); // Laadstatus
    const navigate = useNavigate();

    // Bijwerken van profielinformatie wanneer het profiel verandert
    useEffect(() => {
        setProfileUpdate(profile);
    }, [profile]);

    // Dropdown opties
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

    // Velden bijwerken
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileUpdate({ ...profileUpdate, [name]: value });
    };

    // Validatie
    const validate = () => {
        const newErrors = {};
        if (!profileUpdate.userName?.trim()) newErrors.userName = "Gebruikersnaam is verplicht";
        if (!profileUpdate.age || profileUpdate.age <= 0) newErrors.age = "Leeftijd moet een positief getal zijn";
        if (!profileUpdate.weight || profileUpdate.weight <= 0) newErrors.weight = "Gewicht moet een positief getal zijn";
        if (!profileUpdate.height || profileUpdate.height <= 0) newErrors.height = "Lengte moet een positief getal zijn";
        if (profileUpdate.sexuality === 0) newErrors.sexuality = "Selecteer je seksualiteit";
        if (profileUpdate.relationStatus === 0) newErrors.relationStatus = "Selecteer je relatiestatus";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // True als er geen fouten zijn
    };

    // Profiel opslaan
    const handleSave = async () => {
        if (!validate()) {
            alert("Vul alle verplichte velden correct in.");
            return; // Stop als validatie faalt
        }

        setLoading(true);
        try {
            await userApi.patch(`/profiles/${profile.keyCloakId}`, profileUpdate);
            alert("Profiel succesvol bijgewerkt!");
            navigate(0); // Pagina opnieuw laden
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Er is iets misgegaan bij het opslaan van je profiel.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid size={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Profiel Bewerken</Typography>
                        <Grid container spacing={2} marginTop={2}>
                            {/* Gebruikersnaam */}
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Gebruikersnaam"
                                    name="userName"
                                    value={profileUpdate.userName || ""}
                                    onChange={handleChange}
                                    error={!!errors.userName}
                                    helperText={errors.userName}
                                />
                            </Grid>

                            {/* Leeftijd */}
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Leeftijd"
                                    name="age"
                                    value={profileUpdate.age || ""}
                                    onChange={handleChange}
                                    error={!!errors.age}
                                    helperText={errors.age}
                                />
                            </Grid>

                            {/* Gewicht */}
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Gewicht (kg)"
                                    name="weight"
                                    value={profileUpdate.weight || ""}
                                    onChange={handleChange}
                                    error={!!errors.weight}
                                    helperText={errors.weight}
                                />
                            </Grid>

                            {/* Lengte */}
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Lengte (cm)"
                                    name="height"
                                    value={profileUpdate.height || ""}
                                    onChange={handleChange}
                                    error={!!errors.height}
                                    helperText={errors.height}
                                />
                            </Grid>

                            {/* Sexualiteit */}
                            <Grid size={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Sexualiteit"
                                    name="sexuality"
                                    value={profileUpdate.sexuality || 0}
                                    onChange={handleChange}
                                    error={!!errors.sexuality}
                                    helperText={errors.sexuality}
                                >
                                    {sexualityOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Op zoek naar */}
                            <Grid size={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Op zoek naar"
                                    name="lookingFor"
                                    value={profileUpdate.lookingFor}
                                    onChange={handleChange}
                                    error={!!errors.lookingFor}
                                    helperText={errors.lookingFor}
                                >
                                    {lookingForOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Relatiestatus */}
                            <Grid size={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Relatiestatus"
                                    name="relationStatus"
                                    value={profileUpdate.relationStatus || 0}
                                    onChange={handleChange}
                                    error={!!errors.relationStatus}
                                    helperText={errors.relationStatus}
                                >
                                    {relationStatusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid size={6}>
                                <Grid container spacing={2} justifyContent="flex-end" marginTop={2}>
                                    <Grid>
                                        <Button variant="contained" color="primary" onClick={handleSave}>
                                            Opslaan
                                        </Button>
                                    </Grid>
                                    <Grid>
                                        <Button variant="contained" color="secondary" onClick={() => { KeycloakService.doManagement() }}>
                                            Account management
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ProfileView;