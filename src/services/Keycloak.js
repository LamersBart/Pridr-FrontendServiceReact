import Keycloak from 'keycloak-js';

const _kc = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
});

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        checkLoginIframe: false,
        pkceMethod: 'S256',
        KeycloakResponseType: 'code'
    })
        .then((authenticated) => {
            if (!authenticated) {
                console.log("user is not authenticated..!");
            }
            _kc.onTokenExpired = () => {
                console.log('token expired')
            }
            onAuthenticatedCallback();
        })
        .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const doManagement = () => _kc.accountManagement();

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
    _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getKeycloakId = () => _kc.tokenParsed?.sub;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const KeycloakService = {
    initKeycloak,
    doLogin,
    doLogout,
    doManagement,
    isLoggedIn,
    getToken,
    getTokenParsed,
    updateToken,
    getUsername,
    getKeycloakId,
    hasRole,
};

export default KeycloakService;