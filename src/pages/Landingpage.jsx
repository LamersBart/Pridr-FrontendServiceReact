import pridrLogo from '/pridr-E.png'
import KeycloakService from "../services/Keycloak.js";

const Landing = () => {
    return (
        <div>
            <h1 className="text-green-800 text-4xl">Welcome to PRIDR</h1>
            <div>
                <img src={pridrLogo} className="logo Pridr" alt="Pridr logo"/>
            </div>
            <div className="card">
                <button onClick={() => { KeycloakService.doLogin() }} className='m-1'>
                    Login / Register
                </button>
            </div>
        </div>
    );
};

export default Landing;