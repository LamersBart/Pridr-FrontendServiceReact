import KeycloakService from "../services/Keycloak.js";

const RenderOnAnonymous = ({ children }) => (!KeycloakService.isLoggedIn()) ? children : null;

export default RenderOnAnonymous