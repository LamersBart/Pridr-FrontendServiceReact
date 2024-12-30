// import {useRef, useState} from "react";
// import Grid from "@mui/material/Grid2";
// import Button from "@mui/material/Button";
// import {FormControl, FormGroup} from "@mui/material";
// import TextField from "@mui/material/TextField";
//
// const WaitingRoom = ({joinChatRoom}) => {
//     const [userId, setUserId] = useState("");
//     const [chatRoom, setChatRoom] = useState("");
//     return <form onSubmit={ e => {
//         e.preventDefault();
//         // Pass the values to joinChatRoom
//         joinChatRoom(userId, chatRoom);
//     }}>
//         <Grid container spacing={2}>
//             <Grid size={4}/>
//             <Grid size={4}>
//                 <FormGroup>
//                     <FormControl>
//                         <TextField
//                             placeholder="Username"
//                             variant="outlined"
//                             fullWidth
//                             value={userId} // Controlled component
//                             onChange={e => setUserId(e.target.value)} // Update state
//                         />
//                     </FormControl>
//                     <br />
//                     <FormControl>
//                         <TextField
//                             placeholder="Chatroom"
//                             variant="outlined"
//                             fullWidth
//                             value={chatRoom} // Controlled component
//                             onChange={e => setChatRoom(e.target.value)} // Update state
//                         />
//                     </FormControl>
//                 </FormGroup>
//             </Grid>
//             <Grid size={4}/>
//             <Grid size={4}/>
//             <Grid size={4}>
//                 <Button color="primary" variant="contained" type="submit">Join</Button>
//             </Grid>
//             <Grid size={4}/>
//         </Grid>
//     </form>
// }
//
// export default WaitingRoom;