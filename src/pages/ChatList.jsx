import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeycloakService from "../services/Keycloak.js";
import Grid from "@mui/material/Grid2";

// Simuleer API voor chatgeschiedenis
const fetchChatHistory = async () => {
    return [
        { id: "1e90c0e1-16d0-459a-8406-7f80c4772eca", name: "Alice", bio: "Loves coding!" },
        { id: "6d2177d0-5a1e-4c16-bb5f-37653d889742", name: "Bob", bio: "Hiking enthusiast!" },
    ];
};

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState([]); // Verzender ID
    const navigate = useNavigate();

    useEffect(() => {
        const loadChats = async () => {
            const data = await fetchChatHistory();
            setChats(data);
        };
        loadChats();
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

    const handleChatClick = (id) => {
        navigate(`/chat/${id}`);
    };

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid size={8}>
                <List>
                    {chats
                        .filter((chats) => chats.id !== userId)
                        .map((chat) => (
                            <React.Fragment key={chat.id}>
                                <ListItem button onClick={() => handleChatClick(chat.id)}>
                                    <ListItemText primary={chat.name} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                </List>
            </Grid>
        </Grid>
    );
};

export default ChatList;
