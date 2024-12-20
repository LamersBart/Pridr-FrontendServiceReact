import KeycloakService from "./services/Keycloak.js";

const RenderOnAuthenticated = ({ children }) => (KeycloakService.isLoggedIn()) ? children : null;

export default RenderOnAuthenticated