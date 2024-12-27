import Grid from "@mui/material/Grid2";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm.jsx";

const ChatRoom = ({ messages, sendMessage }) => {
    return <div>
        <Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid size={4}/>
                <Grid size={4}>
                    <h2>ChatRoom</h2>
                </Grid>
                <Grid size={4}/>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid size={4}/>
                <Grid size={4}>
                    <MessageContainer messages={messages}/>
                </Grid>
                <Grid size={4}/>
                <Grid size={4}/>
                <Grid size={4}>
                    <SendMessageForm sendMessage={sendMessage}/>
                </Grid>
                <Grid size={4}/>
            </Grid>
        </Grid>
    </div>
}

export default ChatRoom