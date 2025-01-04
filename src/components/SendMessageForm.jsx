// import {useState} from "react";
// import {FormControl, FormGroup} from "@mui/material";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid2";
//
// const SendMessageForm = ({sendMessage}) => {
//     const[message, setMessage] = useState('');
//     return <form onSubmit={e => {
//         e.preventDefault();
//         if (!message.trim()) return;
//         sendMessage(message);
//         setMessage('');
//     }}>
//         <FormGroup>
//             <FormControl>
//                 <Grid container spacing={2}>
//                     <Grid size={8}>
//                         <TextField
//                             placeholder="Typ a Message"
//                             variant="outlined"
//                             fullWidth
//                             value={message} // Controlled component
//                             onChange={(e) => setMessage(e.target.value)} // Update state
//                         />
//                     </Grid>
//                     <Grid size={4}>
//                         <Button color="secondary" variant="contained" type="submit" disabled={!message.trim()}>Send</Button>
//                     </Grid>
//                 </Grid>
//             </FormControl>
//         </FormGroup>
//     </form>
// }
//
// export default SendMessageForm;