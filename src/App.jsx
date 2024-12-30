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
import ProfileView from "./pages/ProfileView.jsx";
import ChatList from "./pages/ChatList.jsx";
import EventList from "./pages/EventList.jsx";
import EventForm from "./pages/EventForm.jsx";
import EventDetail from "./pages/EventDetail.jsx";

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
                                <ChatList />
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/chat/:targetUserId" element={
                        KeycloakService.isLoggedIn() ? (
                            <RenderOnAuthenticated>
                                <Chat />
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/profile/:id" element={
                        KeycloakService.isLoggedIn() ? (
                            <RenderOnAuthenticated>
                                <ProfileView />
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/events" element={
                        KeycloakService.isLoggedIn() ? (
                            <RenderOnAuthenticated>
                                <EventList />
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/event/new" element={
                        KeycloakService.isLoggedIn() ? (
                            <RenderOnAuthenticated>
                                <EventDetail />
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/event/:id" element={
                        KeycloakService.isLoggedIn() ? (
                            <RenderOnAuthenticated>
                                <EventDetail />
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