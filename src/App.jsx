import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Homepage";
import Landing from "./pages/Landingpage";
import RenderOnAnonymous from "./components/RenderOnAnonymous.jsx";
import RenderOnAuthenticated from "./components/RenderOnAuthenticated.jsx";
import Layout from "./components/Layout.jsx";
import './App.css'
import {CssBaseline} from "@mui/material";
import AppTheme from "./shared-theme/AppTheme.jsx";

const App = () => (
    <BrowserRouter>
        <AppTheme>
            <CssBaseline enableColorScheme />
            <Layout>
                <RenderOnAnonymous>
                    <Landing/>
                </RenderOnAnonymous>
                <RenderOnAuthenticated>
                    <Home/>
                </RenderOnAuthenticated>
            </Layout>
        </AppTheme>
    </BrowserRouter>
);

export default App