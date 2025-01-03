import React, {useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import KeycloakService from "../services/Keycloak";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import {userApi} from "../services/api.js";
import Grid from "@mui/material/Grid2";

const Chat = () => {
    const { targetUserId } = useParams();
    const [conn, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [myProfile, setMyProfile] = useState({});
    const [targetProfile, setTargetProfile] = useState({});
    const messagesEndRef = useRef(null);

    // Scroll automatisch naar het laatste bericht
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const connectToHub = async () => {
            try {
                const fetchedUserId = KeycloakService.getKeycloakId();
                const fetchedToken = KeycloakService.getToken();

                setUserId(fetchedUserId);

                // Bouw verbinding op
                const connection = new HubConnectionBuilder()
                    .withUrl(import.meta.env.VITE_CHAT_SERVICE_HUB_URL, {
                        accessTokenFactory: () => fetchedToken,
                    })
                    .configureLogging(LogLevel.Warning)
                    .build();

                // Ontvang berichten
                connection.on("ReceiveDirectMessage", (userId, msg, timestamp) => {
                    // console.log(`Message from ${userId}: ${msg}`);
                    setMessages(prev => [...prev, { userId, msg, timestamp }]);
                });

                connection.on("MessageDelivered", (targetUserId, msg) => {
                    // console.log(`Message delivered to ${targetUserId}: ${msg}`);
                });

                connection.on("UserNotFound", (targetUserId) => {
                    alert(`User ${targetUserId} is not online.`);
                });

                connection.onclose(error => {
                    console.log("Connection closed: ", error);
                });

                await connection.start();
                // console.log("Verbonden met SignalR-hub!");
                setConnection(connection);
            } catch (error) {
                console.error("Kan geen verbinding maken: ", error);
            }
        };

        connectToHub();
    }, []); // Voer deze eenmalig uit bij het laden

    useEffect(() => {
        const loadFullMessageHistory = async () => {
            if (conn && targetUserId) {
                try {
                    // console.log("Fetching message history...");
                    await conn.invoke("LoadFullMessageHistory", targetUserId);

                } catch (err) {
                    console.error("Error loading message history: ", err);
                }
            }
        };

        if (conn && targetUserId) {
            loadFullMessageHistory();
        }
    }, [conn, targetUserId]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response1 = await userApi.get(`/profiles/${userId}`);
                setMyProfile(response1.data);
                const response2 = await userApi.get(`/profiles/${targetUserId}`);
                setTargetProfile(response2.data);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };
        fetchProfiles();
    }, [conn]);


    const sendMessage = async () => {
        if (conn && targetUserId && message && myProfile) {
            const now = new Date().toISOString(); // Voeg de huidige tijd toe
            await conn.invoke("SendDirectMessage", targetUserId, message);
            setMessages(prev => [...prev, { userId: userId, msg: message, timestamp: now }]);
            setMessage(""); // Clear input
        } else {
            alert("Fill in Target User ID and Message!");
        }
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

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-container">
                {/* Header */}
                <div className="chat-header">
                    <Typography variant="h6">
                        Chat met {targetProfile.userName || "Onbekend"}
                    </Typography>
                </div>

                {/* Scrollbare berichtencontainer */}
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent={msg.userId === userId ? "flex-end" : "flex-start"}
                            mb={1}
                        >
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 1.5,
                                    borderRadius: 2,
                                    maxWidth: "60%",
                                    bgcolor: msg.userId === userId ? "primary.main" : "grey.300",
                                    color: msg.userId === userId ? "white" : "black",
                                }}
                            >
                                <Typography variant="body2">{msg.msg}</Typography>
                                <Typography variant="caption" display="block" align="right">
                                    {formatDate(msg.timestamp)}
                                </Typography>
                            </Paper>
                        </Box>
                    ))}
                    {/* Scroll-anchor */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Vast invoerveld onderaan */}
                <div className="chat-input">
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Typ een bericht..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendMessage}
                    >
                        Verstuur
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
