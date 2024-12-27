import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown.jsx';
import {useEffect, useState} from "react";
import KeycloakService from "../services/Keycloak.js";
import pridrLogo from '/pridr-E.png'
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export default function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token when the component mounts
        const fetchLoggedInStatus = async () => {
            try {
                const isLoggedIn = KeycloakService.isLoggedIn();
                setIsLoggedIn(isLoggedIn); // Set the token to the state
            } catch (error) {
                console.error('Failed to fetch Keycloak token:', error);
            }
        };
        fetchLoggedInStatus();
    }, []); // Empty dependency array ensures this effect runs once on mount
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const handleLogoClick = () => {
        // Navigeer naar de chat met dit profiel
        navigate("/");
    };

    const handleNavigate = (path) => {
        // Navigeer naar de chat met dit profiel
        navigate(path);
    };
    if(isLoggedIn){
        return (
            <AppBar
                position="fixed"
                enableColorOnDark
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 'calc(var(--template-frame-height, 0px) + 28px)',
                }}
            >
                <Container maxWidth="lg">
                    <StyledToolbar variant="dense" disableGutters>
                        <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', px: 0}}>
                                <img style={{height: '2.8em', marginTop: 5}} src={pridrLogo} className="logo Pridr"
                                     alt="Pridr logo"  onClick={() => handleNavigate("/")}/>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <Button onClick={() => handleNavigate("/")} variant="text" color="info" size="small">
                                    Profiles
                                </Button>
                                <Button variant="text" color="info" size="small">
                                    Events
                                </Button>
                                <Button onClick={() => handleNavigate("/chat")} variant="text" color="info" size="small">
                                    Chat
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 1,
                                alignItems: 'center',
                            }}
                        >
                            <Button onClick={() => { KeycloakService.doLogout() }} color="primary" variant="contained" size="small">
                                Logout
                            </Button>
                            <ColorModeIconDropdown />
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                            <ColorModeIconDropdown size="medium" />
                            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="top"
                                open={open}
                                onClose={toggleDrawer(false)}
                                PaperProps={{
                                    sx: {
                                        top: 'var(--template-frame-height, 0px)',
                                    },
                                }}
                            >
                                <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <IconButton onClick={toggleDrawer(false)}>
                                            <CloseRoundedIcon />
                                        </IconButton>
                                    </Box>

                                    <MenuItem>Profiles</MenuItem>
                                    <MenuItem>Events</MenuItem>
                                    <MenuItem>Chat</MenuItem>
                                    <Divider sx={{ my: 3 }} />
                                    <MenuItem>
                                        <Button onClick={() => { KeycloakService.doLogout() }} color="primary" variant="contained" fullWidth>
                                            Logout
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                    </StyledToolbar>
                </Container>
            </AppBar>
        );
    } else {
        return (
            <AppBar
                position="fixed"
                enableColorOnDark
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 'calc(var(--template-frame-height, 0px) + 28px)',
                }}
            >
                <Container maxWidth="md">
                    <StyledToolbar variant="dense" disableGutters>
                        <Box sx={{flexGrow: 0, display: 'fixed', alignItems: 'center', px: 0}}>
                            <img style={{height: '2.8em', marginTop: 5}} src={pridrLogo} className="logo Pridr" alt="Pridr logo" onClick={() => handleNavigate("/")}/>
                        </Box>
                        <Box
                            sx={{
                                display: {xs: 'flex' },
                                gap: 1,
                                alignItems: 'center',
                            }}
                        >
                            <ColorModeIconDropdown />
                        </Box>
                    </StyledToolbar>
                </Container>
            </AppBar>
        );
    }
}