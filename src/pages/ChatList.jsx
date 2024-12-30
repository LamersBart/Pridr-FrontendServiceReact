import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeycloakService from "../services/Keycloak.js";
import Grid from "@mui/material/Grid2";
import {chatApi, userApi} from "../services/api.js";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

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
        if (!userId) return;
        const fetchChats = async () => {
            try {
                const response = await chatApi.get("/chatoverview");
                setChats(response.data);
            } catch (error) {
                // console.error("Error fetching profiles:", error);
            }
        };
        fetchChats();
    }, [userId]);

    const handleChatClick = (id) => {
        navigate(`/chat/${id}`);
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate); // Converteer ISO naar Date object
        const now = new Date(); // Huidige tijd

        // Controleer of de datum vandaag is
        const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        if (isToday) {
            // Geef alleen de tijd weer
            return date.toLocaleTimeString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
            });
        } else {
            // Geef de datum weer
            return date.toLocaleDateString('nl-NL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        }
    };

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid size={[10, 6]}>
                <List>
                    {
                        chats.length === 0 ? (
                            <ListItem>
                                <Grid container justifyContent="center" alignItems="center" style={{ width: "100%" }}>
                                    <Grid size={[5, 2]}>
                                        <ListItemText primary="Geen chats gevonden.." />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ) : (
                            chats.map((chat) => (
                                <React.Fragment key={chat.senderId}>
                                    <ListItem onClick={() => handleChatClick(chat.senderId)}>
                                        <Grid container alignItems="center" style={{ width: "100%" }}>
                                            <Grid size={4}>
                                                <ListItemText primary={chat.senderUserName} />
                                            </Grid>
                                            <Grid size={6}>
                                                <ListItemText secondary={chat.lastMessage} />
                                            </Grid>
                                            <Grid size={2} style={{ textAlign: "right" }}>
                                                <ListItemText secondary={formatDate(chat.lastMessageTimestamp)} />
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <Divider/>
                                </React.Fragment>
                            ))
                        )
                    }
                </List>
            </Grid>
        </Grid>
    );
};

export default ChatList;
