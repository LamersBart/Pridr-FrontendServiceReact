// import React, { useEffect, useState } from "react";
// import {
//     Card,
//     CardContent,
//     Typography,
//     Button,
//     Grid,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
// } from "@mui/material";
// import { eventApi, userApi } from "../services/api";
// import KeycloakService from "../services/Keycloak";
//
// const EventList = () => {
//     const [events, setEvents] = useState([]);
//     const [selectedEvent, setSelectedEvent] = useState(null); // Voor popup
//     const [open, setOpen] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editEvent, setEditEvent] = useState({ name: "", date: "" }); // Voor bewerken
//     const [userProfile, setUserProfile] = useState({});
//     const [userId, setUserId] = useState(""); // Ingelogde gebruiker
//
//     useEffect(() => {
//         const loadProfile = async () => {
//             try {
//                 const loggedInUserId = KeycloakService.getKeycloakId();
//                 setUserId(loggedInUserId);
//                 const response = await userApi.get(`/profiles/${loggedInUserId}`);
//                 setUserProfile(response.data);
//             } catch (error) {
//                 console.error("Error fetching profiles:", error);
//             }
//         };
//         loadProfile();
//     }, []);
//
//     // Haal lijst van events op
//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await eventApi.get("/event");
//                 setEvents(response.data);
//             } catch (error) {
//                 console.error("Error fetching events:", error);
//             }
//         };
//         fetchEvents();
//     }, []);
//
//     // Open popup voor details of bewerken
//     const handleOpen = (event) => {
//         setSelectedEvent(event);
//         setEditEvent({ name: event.name, date: event.date }); // Laad voor bewerken
//         setOpen(true);
//     };
//
//     // Sluit popup
//     const handleClose = () => {
//         setOpen(false);
//         setSelectedEvent(null);
//         setIsEditing(false);
//     };
//
//     // Controleer aanmeldstatus
//     const isUserRegistered = (event) => {
//         return event.profileIds.includes(userProfile.id);
//     };
//
//     // Meld gebruiker aan voor een event
//     const handleSignUp = async () => {
//         try {
//             await eventApi.patch(`/event/addProfile/${selectedEvent.id}`, {
//                 profileIds: [userProfile.id],
//             });
//             alert("Aangemeld voor event!");
//             handleClose(); // Sluit popup
//         } catch (error) {
//             console.error("Error signing up:", error);
//         }
//     };
//
//     // Verwijder een event (alleen als gebruiker creator is)
//     const handleDelete = async (eventId) => {
//         try {
//             await eventApi.delete(`/event/${eventId}`);
//             setEvents(events.filter((e) => e.id !== eventId)); // Verwijder uit lijst
//             alert("Event verwijderd!");
//             handleClose();
//         } catch (error) {
//             console.error("Error deleting event:", error);
//         }
//     };
//
//     // Update (bewerk) een event
//     const handleSaveEdit = async () => {
//         try {
//             await eventApi.patch(`/event/${selectedEvent.id}`, {
//                 name: editEvent.name,
//                 date: editEvent.date,
//             });
//             alert("Event bijgewerkt!");
//             handleClose();
//         } catch (error) {
//             console.error("Error updating event:", error);
//         }
//     };
//
//     // Nieuw event aanmaken
//     const handleCreateEvent = async () => {
//         try {
//             const newEvent = {
//                 name: editEvent.name,
//                 date: editEvent.date,
//                 profileIds: [userProfile.id], // Voeg profiel-ID toe bij aanmaken
//             };
//             const response = await eventApi.post("/event", newEvent);
//             setEvents([...events, response.data]);
//             alert("Nieuw event aangemaakt!");
//             handleClose();
//         } catch (error) {
//             console.error("Error creating event:", error);
//         }
//     };
//
//     return (
//         <Grid container spacing={2} justifyContent="center" alignItems="center">
//             {/* Nieuw Event Knop */}
//             <Grid item xs={12} style={{ textAlign: "right", marginBottom: "1rem" }}>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => {
//                         setIsEditing(true);
//                         setEditEvent({ name: "", date: "" }); // Reset bij aanmaak
//                         setOpen(true);
//                     }}
//                 >
//                     Nieuw Event
//                 </Button>
//             </Grid>
//
//             {/* Event Tegels */}
//             {events.map((event) => (
//                 <Grid item key={event.id} xs={12} sm={6} md={4}>
//                     <Card>
//                         <CardContent>
//                             <Typography variant="h5">{event.name}</Typography>
//                             <Typography variant="subtitle1">
//                                 {new Date(event.date).toLocaleDateString()}
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => handleOpen(event)}
//                             >
//                                 Details
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             ))}
//
//             {/* Popup voor Details of Bewerken */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{selectedEvent?.name || "Event Details"}</DialogTitle>
//                 <DialogContent>
//                     <Typography>
//                         Datum: {selectedEvent?.date ? new Date(selectedEvent.date).toLocaleString() : "Geen datum beschikbaar"}
//                     </Typography>
//                     <Typography>
//                         Gemaakt op: {selectedEvent?.createdOn ? new Date(selectedEvent.createdOn).toLocaleString() : "Onbekend"}
//                     </Typography>
//                 </DialogContent>
//             </Dialog>
//         </Grid>
//     );
// };
//
// export default EventList;
//
// import React, { useEffect, useState } from "react";
// import {
//     Card,
//     CardContent,
//     Typography,
//     Button,
//     Grid,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField
// } from "@mui/material";
// import { eventApi, userApi } from "../services/api";
// import KeycloakService from "../services/Keycloak";
//
// const EventList = () => {
//     const [events, setEvents] = useState([]); // Eventlijst
//     const [selectedEvent, setSelectedEvent] = useState(null); // Geselecteerd event voor popup
//     const [open, setOpen] = useState(false); // Popup status
//     const [editing, setEditing] = useState(false); // Bewerkingstatus
//     const [userId, setUserId] = useState(""); // Huidige gebruiker ID
//     const [formData, setFormData] = useState({ name: "", date: "" }); // Eventformulier
//
//     // Haal de events en ingelogde gebruiker op
//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await eventApi.get("/event");
//                 setEvents(response.data);
//             } catch (error) {
//                 console.error("Error fetching events:", error);
//             }
//         };
//         fetchEvents();
//
//         // Haal huidige gebruiker ID op
//         const user = KeycloakService.getKeycloakId();
//         setUserId(user);
//     }, []);
//
//     // Open popup voor details
//     const handleOpen = (event) => {
//         setSelectedEvent(event);
//         setFormData({ name: event.name, date: event.date.split("T")[0] }); // Datum formatteren voor input
//         setOpen(true);
//         setEditing(false); // Zorg dat je niet direct in bewerkingsmodus komt
//     };
//
//     // Popup sluiten
//     const handleClose = () => {
//         setOpen(false);
//         setSelectedEvent(null);
//         setEditing(false);
//     };
//
//     // Event bewerken
//     const handleEdit = async () => {
//         try {
//             await eventApi.patch(`/event/${selectedEvent.id}`, formData); // API-call voor update
//             alert("Event bijgewerkt!");
//             handleClose();
//             window.location.reload(); // Pagina vernieuwen om wijzigingen te tonen
//         } catch (error) {
//             console.error("Error updating event:", error);
//         }
//     };
//
//     // Event verwijderen
//     const handleDelete = async () => {
//         try {
//             await eventApi.delete(`/event/${selectedEvent.id}`); // API-call voor verwijderen
//             alert("Event verwijderd!");
//             handleClose();
//             window.location.reload(); // Pagina vernieuwen
//         } catch (error) {
//             console.error("Error deleting event:", error);
//         }
//     };
//
//     // Aanmelden voor event
//     const handleJoinEvent = async () => {
//         try {
//             await eventApi.patch(`/event/addProfile/${selectedEvent.id}`, { profileIds: [userId] });
//             alert("Aangemeld voor event!");
//             handleClose();
//         } catch (error) {
//             console.error("Error joining event:", error);
//         }
//     };
//
//     // Afmelden van event
//     const handleLeaveEvent = async () => {
//         try {
//             await eventApi.patch(`/event/removeProfile/${selectedEvent.id}`, { profileIds: [userId] });
//             alert("Afgemeld voor event!");
//             handleClose();
//         } catch (error) {
//             console.error("Error leaving event:", error);
//         }
//     };
//
//     // Nieuw event maken
//     const handleCreateEvent = async () => {
//         try {
//             await eventApi.post("/event", formData); // API-call voor aanmaken
//             alert("Event aangemaakt!");
//             handleClose();
//             window.location.reload();
//         } catch (error) {
//             console.error("Error creating event:", error);
//         }
//     };
//
//     return (
//         <Grid container spacing={2} justifyContent="center" alignItems="center">
//             {/* Event tegels */}
//             {events.map((event) => (
//                 <Grid item key={event.id} xs={12} sm={6} md={4}>
//                     <Card>
//                         <CardContent>
//                             <Typography variant="h5">{event.name}</Typography>
//                             <Typography variant="subtitle1">
//                                 {new Date(event.date).toLocaleDateString()}
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => handleOpen(event)}
//                             >
//                                 Details
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             ))}
//
//             {/* Nieuw event knop */}
//             <Grid item xs={12} style={{ textAlign: "center", marginTop: 20 }}>
//                 <Button
//                     variant="contained"
//                     color="success"
//                     onClick={() => {
//                         setEditing(true); // Direct bewerken inschakelen
//                         setOpen(true); // Open de popup
//                         setSelectedEvent(null); // Geen geselecteerd event
//                         setFormData({ name: "", date: "" }); // Leeg formulier
//                     }}
//                 >
//                     Nieuw Event Aanmaken
//                 </Button>
//             </Grid>
//
//             {/* Popup voor details of bewerken */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>
//                     {editing
//                         ? "Event Bewerken"
//                         : selectedEvent
//                             ? selectedEvent.name
//                             : "Nieuw Event Aanmaken"}
//                 </DialogTitle>
//                 <DialogContent>
//                     {editing ? (
//                         <>
//                             <TextField
//                                 fullWidth
//                                 margin="normal"
//                                 label="Naam"
//                                 value={formData.name}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, name: e.target.value })
//                                 }
//                             />
//                             <TextField
//                                 fullWidth
//                                 margin="normal"
//                                 type="date"
//                                 label="Datum"
//                                 value={formData.date}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, date: e.target.value })
//                                 }
//                             />
//                         </>
//                     ) : (
//                         selectedEvent && (
//                             <>
//                                 <Typography>
//                                     Datum: {new Date(selectedEvent.date).toLocaleString()}
//                                 </Typography>
//                                 <Typography>
//                                     Gemaakt op:{" "}
//                                     {new Date(selectedEvent.createdOn).toLocaleString()}
//                                 </Typography>
//                             </>
//                         )
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     {editing ? (
//                         <Button onClick={selectedEvent ? handleEdit : handleCreateEvent} color="primary">
//                             Opslaan
//                         </Button>
//                     ) : selectedEvent && (
//                         <>
//                             <Button onClick={handleJoinEvent} color="primary">
//                                 Aanmelden
//                             </Button>
//                             <Button onClick={handleLeaveEvent} color="secondary">
//                                 Afmelden
//                             </Button>
//                             {selectedEvent.createdBy === userId && (
//                                 <>
//                                     <Button onClick={() => setEditing(true)} color="primary">
//                                         Bewerken
//                                     </Button>
//                                     <Button onClick={handleDelete} color="error">
//                                         Verwijderen
//                                     </Button>
//                                 </>
//                             )}
//                         </>
//                     )}
//                     <Button onClick={handleClose} color="secondary">
//                         Sluiten
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Grid>
//     );
// };
//
// export default EventList;

import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { eventApi } from "../services/api";
import { useNavigate } from "react-router-dom";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate(); // Navigatiehook

    // Haal alle events op
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await eventApi.get("/event");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            {
                events.map((event) => (
                    <Grid key={event.id} size={[10, 6, 4]}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{event.name}</Typography>
                                <Typography variant="subtitle1">
                                    {new Date(event.date).toLocaleDateString()}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => navigate(`/event/${event.id}`)} // Ga naar de detailpagina
                                >
                                    Meer Info
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
            <Grid size={12} style={{ textAlign: "center", marginTop: 20 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/event/new")} // Ga naar de aanmaakpagina
                >
                    Nieuw Event Aanmaken
                </Button>
            </Grid>
        </Grid>
    );
};

export default EventList;
