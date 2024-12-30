import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { userApi } from "../services/api";

const EventForm = () => {
    const { eventId } = useParams(); // Gebruik voor bewerken
    const navigate = useNavigate();

    const [event, setEvent] = useState({
        name: "",
        date: "",
        profileIds: [],
    });

    useEffect(() => {
        if (eventId) {
            const fetchEvent = async () => {
                try {
                    const response = await userApi.get(`/event/${eventId}`);
                    setEvent(response.data);
                } catch (error) {
                    console.error("Error loading event:", error);
                }
            };
            fetchEvent();
        }
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (eventId) {
                await userApi.patch(`/event/${eventId}`, event); // Bewerk event
            } else {
                await userApi.post("/event", event); // Nieuw event
            }
            navigate("/events");
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">{eventId ? "Event Bewerken" : "Nieuw Event"}</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Naam"
                    name="name"
                    value={event.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Datum"
                    name="date"
                    type="datetime-local"
                    value={event.date}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Opslaan
                </Button>
            </form>
        </Container>
    );
};

export default EventForm;
