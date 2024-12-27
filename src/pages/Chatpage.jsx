// import React, {useState} from 'react';
// import Grid from '@mui/material/Grid2';
// import WaitingRoom from "../components/waitingroom.jsx";
// import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
// import ChatRoom from "../components/ChatRoom.jsx";
// import keycloakService from "../services/Keycloak.js"

// const Chat = () => {
//     const [conn, setConnection] = useState();
//     const [messages, setMessages] = useState([]);
//     const joinChatRoom = async (userId, chatroom) => {
//         try {
//             // initiate connection
//             const conn = new HubConnectionBuilder()
//                 .withUrl(import.meta.env.VITE_CHAT_SERVICE_URL)
//                 .configureLogging(LogLevel.Information)
//                 .build();
//
//             // set up handlers
//             conn.on("JoinSpecificChatRoom", (userId, msg) => {
//                 console.log("msg: ", msg);
//                 setMessages(messages => [...messages, { userId, msg }]);
//             })
//
//             conn.on("ReceiveSpecificMessage", (userId, msg) => {
//                 setMessages(messages => [...messages, { userId, msg }]);
//             })
//
//             await conn.start();
//             await conn.invoke("JoinSpecificChatRoom", { UserId: userId, ChatRoom: chatroom })
//             setConnection(conn);
//         } catch (e) {
//             console.log(e);
//         }
//     }
//
//     const sendMessage = async (message) => {
//         try {
//             if (!conn) {
//                 console.error("No connection to the chat server.");
//                 return;
//             }
//
//             // Send message with correct payload
//             await conn.invoke("ReceiveSpecificMessage", message);
//
//         } catch (e) {
//             console.error("Error sending message:", e);
//         }
//     };
//     return (
//         <>
//             <Grid container spacing={2} justifyContent="center" alignItems="center">
//                 <Grid size={2}/>
//                 <Grid size={8}>
//                     <h1>Welcome to Pridr Chat</h1>
//                 </Grid>
//                 <Grid size={2}/>
//             </Grid>
//             {
//                 !conn && messages.length === 0
//                 ? <WaitingRoom joinChatRoom={joinChatRoom}/>
//                 : <ChatRoom messages={messages} sendMessage={sendMessage}/>
//             }
//         </>
//     );
// };

import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import KeycloakService  from "../services/Keycloak";

const Chat = () => {
    const [conn, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [targetUserId, setTargetUserId] = useState("");
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState([]); // Verzender ID

    useEffect(() => {
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

        const connect = async () => {
            const token = KeycloakService.getToken();
            console.log("Access Token: ", token);

            const connection = new HubConnectionBuilder()
                .withUrl(import.meta.env.VITE_CHAT_SERVICE_URL, {
                    accessTokenFactory: () => token, // Voeg Bearer Token toe
                })
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveDirectMessage", (userId, msg, timestamp) => {
                console.log(`Message from ${userId}: ${msg}`);
                setMessages(prev => [...prev, { userId: userId, msg: msg, timestamp: timestamp }]);
            });

            connection.on("MessageDelivered", (targetUserId, msg) => {
                console.log(`Message delivered to ${targetUserId}: ${msg}`);
            });

            connection.on("UserNotFound", (targetUserId) => {
                alert(`User ${targetUserId} is not online.`);
            });

            connection.onclose(error => {
                console.log("Connection closed: ", error);
            });

            await connection.start().then(() => {
                console.log("Verbonden met SignalR-hub!");
            }).catch(err => console.error("Kan geen verbinding maken: ", err));
            setConnection(connection);
            console.log("Connected!");
        };

        connect();
    }, []);

    const loadFullMessageHistory = async () => {
        if (conn && targetUserId) {
            try {
                console.log("Fetching message history...");
                await conn.invoke("LoadFullMessageHistory", targetUserId);
            } catch (err) {
                console.error("Error loading message history: ", err);
            }
        }
    };

    useEffect(() => {
        if (targetUserId) {
            setMessages([]);
            loadFullMessageHistory(); // Haal geschiedenis op zodra een doelgebruiker is geselecteerd
        }
    }, [targetUserId]);

    const sendMessage = async () => {
        if (conn && targetUserId && message) {
            await conn.invoke("SendDirectMessage", targetUserId, message);
            setMessages(prev => [...prev, { userId: userId, msg: message, timestamp: null }]);
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

    return (
        <div>
            <h2>Direct Messaging | UserId: {userId}</h2>
            <div>
                <h3>Messages:</h3>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <b>{
                            KeycloakService.getKeycloakId() === msg.userId
                                ? (msg.timestamp === null) ? "You" : formatDate(msg.timestamp) + " You"
                                : formatDate(msg.timestamp) + " " + msg.userId}:
                        </b> {msg.msg}
                    </div>
                ))}
            </div>
            <br/>
            <div>
                <input
                    placeholder="Target User ID"
                    value={targetUserId}
                    onChange={(e) => setTargetUserId(e.target.value)}
                />
            </div>
            <div>
                <input
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;