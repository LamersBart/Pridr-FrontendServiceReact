import { createRoot } from "react-dom/client";
import App from './App.jsx'
import './index.css'
import KeycloakService from "./services/Keycloak.js";

// App
const renderApp = () => createRoot(document.getElementById("app")).render(<App/>);
KeycloakService.initKeycloak(renderApp);