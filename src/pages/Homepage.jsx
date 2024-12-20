import React from 'react';
import KeycloakService from "../services/Keycloak.js";

const Home = () => {
    const [token, setToken] = React.useState(KeycloakService.getToken());
    return (
        <div id="keycloak">
            <div className='grid'>
                <div className='col-12'>
                    <h1>My Awesome React App</h1>
                </div>
                <div className='col-12'>
                    <h1 id='app-header-2'>Secured with Keycloak</h1>
                </div>
            </div>
            <div className="grid">
                <div className="col">
                    <button onClick={() => {
                        KeycloakService.doLogout()
                    }} className='m-1'>
                        Logout
                    </button>
                    <p>{token}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
