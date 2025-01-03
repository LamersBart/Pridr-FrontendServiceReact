import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Homepage";
import Landing from "./pages/Landingpage";
import Chat from "./pages/Chatpage";
import RenderOnAnonymous from "./components/RenderOnAnonymous.jsx";
import RenderOnAuthenticated from "./components/RenderOnAuthenticated.jsx";
import Layout from "./components/Layout.jsx";
import {CircularProgress, CssBaseline} from "@mui/material";
import AppTheme from "./shared-theme/AppTheme.jsx";
import KeycloakService from "./services/Keycloak.js";
import './App.css'
import ProfileView from "./pages/ProfileView.jsx";
import ChatList from "./pages/ChatList.jsx";
import EventList from "./pages/EventList.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import {useEffect, useState} from "react";
import ProfileSetup from "./pages/ProfileSetup.jsx";
import {userApi} from "./services/api.js";
import LoadingPage from "./components/LoadingPage.jsx";

const App = () => {
    const [profile, setProfile] = useState(null);
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginAndProfile = async () => {
            try {
                // Controleer of gebruiker is ingelogd
                const loggedIn = KeycloakService.isLoggedIn();
                setIsLoggedIn(loggedIn);

                if (loggedIn) {
                    // Haal profielgegevens op
                    const response = await userApi.get("/profiles/me");
                    const profileData = response.data;
                    setProfile(profileData);

                    // Controleer of profiel compleet is
                    const isComplete = profileData.userName !== "" &&
                        profileData.age &&
                        profileData.sexuality !== 0;

                    setIsProfileComplete(isComplete);
                }
            } catch (error) {
                console.error("Fout bij controle:", error);
            } finally {
                setLoading(false); // Zet loading op false zodra alles is verwerkt
            }
        };
        checkLoginAndProfile();
    }, []);

    // Laadscherm tijdens controle
    if (loading) {
        return(
            <AppTheme>
                <CssBaseline enableColorScheme />
                <LoadingPage />
            </AppTheme>
        );
    }

    return (
        <AppTheme>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
            <Layout profile={profile} isLoggedIn={isLoggedIn} >
                <Routes>
                    {/* Root Route */}
                    <Route path="/" element={
                        isLoggedIn ? (
                            <RenderOnAuthenticated>
                                { isProfileComplete ? <Home profile={profile} /> : <Navigate to="/profile-setup" /> }
                            </RenderOnAuthenticated>
                        ) : (
                            <RenderOnAnonymous>
                                <Landing />
                            </RenderOnAnonymous>
                        )
                    }/>
                    {/* Profiel Setup Route */}
                    <Route
                        path="/profile-setup"
                        element={
                            isLoggedIn ? (
                                <RenderOnAuthenticated>
                                    <ProfileSetup keycloakId={profile.keyCloakId} />
                                </RenderOnAuthenticated>
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route path="/chat" element={
                        isLoggedIn ? (
                            <RenderOnAuthenticated>
                                { isProfileComplete ? <ChatList profile={profile} /> : <Navigate to="/profile-setup" /> }
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/chat/:targetUserId" element={
                        isLoggedIn ? (
                            <RenderOnAuthenticated>
                                <Chat profile={profile} />
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/profile" element={
                        isLoggedIn ? (
                            <RenderOnAuthenticated>
                                { isProfileComplete ? <ProfileView profile={profile} /> : <Navigate to="/profile-setup" /> }
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/events" element={
                        isLoggedIn ? (
                            <RenderOnAuthenticated>
                                { isProfileComplete ? <EventList /> : <Navigate to="/profile-setup" /> }
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/event/new" element={
                        isLoggedIn ? (
                            <RenderOnAuthenticated>
                                <EventDetail />
                            </RenderOnAuthenticated>
                        ) : (
                            <Navigate to="/" />
                        )
                    }/>
                    <Route path="/event/:id" element={
                        isLoggedIn ? (
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
};

export default App