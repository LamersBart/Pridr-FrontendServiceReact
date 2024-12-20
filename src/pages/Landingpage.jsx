import React, {useState} from 'react';
import viteLogo from '/vite.svg'
import reactLogo from "../assets/react.svg";
import KeycloakService from "../services/Keycloak.js";

const Landing = () => {
    return (
        <div>
            <h1 className="text-green-800 text-4xl">Welcome to the Landingpage</h1>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => { KeycloakService.doLogin() }} className='m-1'>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Landing;