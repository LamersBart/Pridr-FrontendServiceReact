import {CircularProgress} from "@mui/material";

const LoadingPage = () => {
    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column"
        }}>
            <CircularProgress/>
            <h3>Loading...</h3>
        </div>
    );
}

export default LoadingPage;