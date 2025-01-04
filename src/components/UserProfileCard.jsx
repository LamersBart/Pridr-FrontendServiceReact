import React from 'react';
import {Card, CardContent, Popover, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const UserProfileCard = ({ profile }) => {
    const navigate = useNavigate();

    const handleChatClick = () => {
        navigate(`/chat/${profile.keyCloakId}`);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [cardSize, setCardSize] = React.useState({ width: 0, height: 0 });
    const cardRef = React.useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if (cardRef.current) {
            setCardSize({
                width: cardRef.current.offsetWidth,
                height: cardRef.current.offsetHeight,
            });
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Lijst met opties voor dropdowns
    const sexualityOptions = [
        { value: 0, label: "Onbekend" },
        { value: 1, label: "Gay" },
        { value: 2, label: "Lesbian" },
        { value: 3, label: "Bisexual" },
        { value: 4, label: "Trans" },
    ];

    const lookingForOptions = [
        { value: 0, label: "Friendship" },
        { value: 1, label: "Relation" },
        { value: 2, label: "Fun" },
    ];

    const relationStatusOptions = [
        { value: 0, label: "Onbekend" },
        { value: 1, label: "Single" },
        { value: 2, label: "Committed" },
        { value: 3, label: "Open relation" },
        { value: 4, label: "Engaged" },
        { value: 5, label: "Married" },
    ];

    // Functie om label te vinden op basis van de waarde
    const getLabel = (options, value) => {
        const option = options.find((option) => option.value === value);
        return option ? option.label : "Onbekend";
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
          <>
              <Card ref={cardRef} onClick={handleClick} style={{ cursor: "pointer" }}>
                  <CardContent>
                      <Typography variant="h5">{profile.userName || "Geen naam"}</Typography>
                      <Typography variant="body2"><strong>Op zoek naar:</strong> {getLabel(lookingForOptions, profile.lookingFor)}</Typography>
                      <Typography variant="body2"><strong>Relatiestatus:</strong> {getLabel(relationStatusOptions, profile.relationStatus)}</Typography>
                      <Typography variant="body2"><strong>Leeftijd:</strong> {profile.age || 'Onbekend'}</Typography>
                      <Typography variant="body2"><strong>Gewicht:</strong> {profile.weight || 'Onbekend'} kg</Typography>
                      <Typography variant="body2"><strong>Lengte:</strong> {profile.height || 'Onbekend'} cm</Typography>
                  </CardContent>
              </Card>
              <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'center',
                  }}
                  transformOrigin={{
                      vertical: 'center',
                      horizontal: 'center',
                  }}
                  PaperProps={{
                      style: {
                          width: cardSize.width,
                          height: cardSize.height
                      },
                  }}
              >
                  <Card>
                      <CardContent style={{ height: cardSize.height, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <Button variant="contained" color="primary" onClick={handleChatClick}>
                              Start Chat
                          </Button>
                      </CardContent>
                  </Card>
              </Popover>
          </>
    );
};

export default UserProfileCard;