import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField, MenuItem, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { userApi } from "../services/api.js";
import KeycloakService from "../services/Keycloak.js";

const ProfileSetup = ({keycloakId, onProfileComplete}) => {
    const [profileId, setProfileId] = useState(keycloakId);
    useEffect(() => {
        setProfileId(keycloakId);
    }, [keycloakId]);

    // State voor profielinformatie
    const [profile, setProfile] = useState({
        userName: "",
        age: "",
        weight: "",
        height: "",
        sexuality: 0,
        lookingFor: 0,
        relationStatus: 0,
    });

    // State voor foutmeldingen
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    // Handle input wijzigingen
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Validatiefunctie
    const validate = () => {
        const newErrors = {};
        if (!profile.userName.trim()) newErrors.userName = "Gebruikersnaam is verplicht";
        if (!profile.age || profile.age <= 0) newErrors.age = "Leeftijd moet een positief getal zijn";
        if (!profile.weight || profile.weight <= 0) newErrors.weight = "Gewicht moet een positief getal zijn";
        if (!profile.height || profile.height <= 0) newErrors.height = "Lengte moet een positief getal zijn";
        if (profile.sexuality === 0) newErrors.sexuality = "Selecteer je seksualiteit";
        if (profile.relationStatus === 0) newErrors.relationStatus = "Selecteer je relatiestatus";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // True als er geen fouten zijn
    };

    // Opslaan profiel
    const handleSave = async () => {
        if (!validate()) {
            alert("Vul alle verplichte velden correct in.");
            return;
        }

        setLoading(true);
        try {
            await userApi.patch(`/profiles/${profileId}`, profile);
            alert("Profiel succesvol bijgewerkt!");
            onProfileComplete();
            navigate("/");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Er is iets misgegaan bij het opslaan van je profiel.");
        }
    };

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid size={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Welkom! Stel je profiel in:</Typography>
                        <Grid container spacing={2} marginTop={2}>
                            {/* Gebruikersnaam */}
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Gebruikersnaam"
                                    name="userName"
                                    value={profile.userName}
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
                                    value={profile.age}
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
                                    value={profile.weight}
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
                                    value={profile.height}
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
                                    value={profile.sexuality}
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
                                    value={profile.lookingFor}
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
                                    value={profile.relationStatus}
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

export default ProfileSetup;
