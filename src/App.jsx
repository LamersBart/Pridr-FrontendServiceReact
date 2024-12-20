import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Homepage";
import Landing from "./pages/Landingpage";
import RenderOnAnonymous from "./RenderOnAnonymous";
import RenderOnAuthenticated from "./RenderOnAuthenticated";
import './App.css'

const App = () => (
    <BrowserRouter>
        <div className="container">
            <RenderOnAnonymous>
                <Landing/>
            </RenderOnAnonymous>
            <RenderOnAuthenticated>
                <Home/>
            </RenderOnAuthenticated>
        </div>
    </BrowserRouter>
);

export default App
