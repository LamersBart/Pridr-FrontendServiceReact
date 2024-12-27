import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Homepage";
import Landing from "./pages/Landingpage";
import Chat from "./pages/Chatpage";
import RenderOnAnonymous from "./components/RenderOnAnonymous.jsx";
import RenderOnAuthenticated from "./components/RenderOnAuthenticated.jsx";
import Layout from "./components/Layout.jsx";
import {CssBaseline} from "@mui/material";
import AppTheme from "./shared-theme/AppTheme.jsx";
import KeycloakService from "./services/Keycloak.js";
import './App.css'

const App = () => (
    <AppTheme>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Root Route */}
                    <Route path="/" element={
                        KeycloakService.isLoggedIn() ? (
                            <RenderOnAuthenticated>
                                <Home />
                            </RenderOnAuthenticated>
                        ) : (
                            <RenderOnAnonymous>
                                <Landing />
                            </RenderOnAnonymous>
                        )
                    }/>
                    <Route path="/chat" element={
                        KeycloakService.isLoggedIn() ? (
                            <RenderOnAuthenticated>
                                <Chat />
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    {/* Fallback route */}
                    <Route path="*" element={<h1>404 - Not Found</h1>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </AppTheme>
);

export default App