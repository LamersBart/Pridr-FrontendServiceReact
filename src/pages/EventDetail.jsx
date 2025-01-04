import React, { useEffect, useState } from "react";
import {
    Typography,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams, useNavigate } from "react-router-dom";
import { eventApi, userApi } from "../services/api";
import KeycloakService from "../services/Keycloak";

const EventDetail = () => {
    const { id } = useParams();
    const isNewEvent = !id; // Controleer of dit een nieuw event is
    const [event, setEvent] = useState(isNewEvent ? {} : null);
    const [loading, setLoading] = useState(!isNewEvent); // Voeg loading-status toe
    const [profiles, setProfiles] = useState([]); // Deelnemers
    const [editing, setEditing] = useState(isNewEvent);
    const [formData, setFormData] = useState({ name: "", date: "" });
    const [userId, setUserId] = useState("");
    const [participants, setParticipants] = useState([]);
    const [organizer, setOrganizer] = useState("");
    const navigate = useNavigate();

    // Haal event details op
    useEffect(() => {
        const fetchEventDetails = async () => {
            const user = KeycloakService.getKeycloakId();
            setUserId(user);

            if (!isNewEvent) {
                try {
                    const response = await eventApi.get(`/event/${id}`);
                    setEvent(response.data);
                    setFormData({
                        name: response.data.name,
                        date: response.data.date.split("T")[0], // Alleen datum
                    });
                    setProfiles(response.data.profileIds);
                    // Haal naam van organisator op
                    const organizerResponse = await userApi.get(`/profiles/${response.data.createdBy}`);
                    setOrganizer(organizerResponse.data.userName); // Zet organisatortnaam

                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching event details:", error);
                }
            } else {
                setLoading(false); // Voor nieuw event is laden niet nodig
            }
        };
        fetchEventDetails();
    }, [id, isNewEvent]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                if (profiles !== []) {
                    const profileResponse = await userApi.post("/profiles/batch", profiles);
                    setParticipants(profileResponse.data);
                }
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };
        fetchProfiles();
    }, [profiles]);


    // Opslaan van event (nieuw of update)
    const handleSave = async () => {
        try {
            const formattedDate = new Date(formData.date).toISOString();
            if (isNewEvent) {
                await eventApi.post("/event", {
                    name: formData.name,
                    date: formattedDate,
                    profileIds: [],
                });
                alert("Nieuw event aangemaakt!");
            } else {
                await eventApi.patch(`/event/${id}`, {
                    name: formData.name,
                    date: formattedDate,
                });
                alert("Event bijgewerkt!");
            }
            navigate("/events");
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    // Event verwijderen
    const handleDelete = async () => {
        try {
            await eventApi.delete(`/event/${id}`);
            alert("Event verwijderd!");
            navigate("/events");
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    // Aanmelden
    const handleJoinEvent = async () => {
        try {
            await eventApi.patch(`/event/addProfile/${id}`, { profileIds: [userId] });
            setProfiles([...profiles, userId]); // Update deelnemerslijst direct
            alert("Aangemeld!");
            navigate(0);
        } catch (error) {
            console.error("Error joining event:", error);
        }
    };

    // Afmelden
    const handleLeaveEvent = async () => {
        try {
            await eventApi.patch(`/event/removeProfile/${id}`, { profileIds: [userId] });
            setProfiles(profiles.filter((id) => id !== userId)); // Update lijst direct
            alert("Afgemeld!");
            navigate(0);
        } catch (error) {
            console.error("Error leaving event:", error);
        }
    };

    if (loading) return <div>Loading...</div>; // Toon laadstatus

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid size={[10, 8]}>
                { editing ? (
                    <div>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Naam"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            type="date"
                            label="Datum"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        <Button onClick={handleSave} variant="contained" color="primary">
                            Opslaan
                        </Button>
                    </div>
                ) : (
                    <>
                        <Typography variant="h4">{event.name}</Typography>
                        <Typography variant="h6">Datum: {new Date(event.date).toLocaleDateString()}</Typography>
                        <Typography variant="subtitle1">Gemaakt door: {organizer}</Typography>
                        {event.createdBy === userId && (
                            <>
                                <Button onClick={() => setEditing(true)} variant="contained" color="primary">
                                    Bewerken
                                </Button>
                                <Button onClick={handleDelete} variant="outlined" color="error">
                                    Verwijderen
                                </Button>
                            </>
                        )}
                        {profiles.includes(userId) ? (
                            <Button onClick={handleLeaveEvent} variant="contained" color="secondary">
                                Afmelden
                            </Button>
                        ) : (
                            <Button onClick={handleJoinEvent} variant="contained" color="success">
                                Aanmelden
                            </Button>
                        )}
                    </>
                )}
            </Grid>
            <Grid size={[10, 8]}>
                <Typography variant="h6">Deelnemers: </Typography>
                <List>
                    { participants.length === 0 ? (
                        <>
                            <ListItem>
                                <ListItemText primary={"Geen deelnemers"} />
                            </ListItem>
                        </>
                    ) : (
                        participants.map((participant) => (
                        <ListItem key={participant.keyCloakId}>
                            <ListItemText primary={participant.userName} />
                        </ListItem>
                        ))
                    )
                    }
                </List>
            </Grid>
        </Grid>
    );
};

export default EventDetail;
