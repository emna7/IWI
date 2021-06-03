import './EventPage.css';
import { getFromStorage, } from './../../utils/storage';
import React, { useState, } from 'react';
import { useSelector, } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import eventImage from './../../../assets/event.jpg';
import moment from 'moment';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

const alertStyle = {
  marginTop: 20,
};

const resMsg = (msg) => {
  return (
    <Alert severity={msg.status === 'success' ? 'success' : 'error'} style={alertStyle}>
      {msg.message}
    </Alert>
  );
};

const EventPage = (props) => {
  const { eventId, } = useParams();
  // const { event, } = props;
  const [ eventPageMsg, setEventPageMsg, ] = useState();

  let event = useSelector((state) => state.selectedEvent);
  // if (!event.title) {
  //   event = props.event;
  // }

  console.log(event);
  
  const currentUser = useSelector((state) => state.currentUser);
  const token = getFromStorage('iwiToken');

  const handleInteresedIn = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/events/${event._id}/interested`,
      {},
      {
        headers: {
          'auth-token': token,
        },
      }
    ).then((res) => {
      let result = res.data;
      setEventPageMsg(res);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="EventPage">
      <body className="event-section">
        <Container maxWidth="md">
          <Box component="div" display="block">
            <img
              className="cover_image"
              src={eventImage}
            />
          </Box>
          <Box className="item-title-desc" component="div" display="block">
            <Typography variant="h1" component="h1">
              {event.title}
              </Typography>
            <Chip label={event.category} variant="outlined" />
          </Box>

          <Box className="item-date" component="div" display="block">
            <Box mt={1} className="date start" component="div" display="block">
              <strong>Start date:</strong><br />
              <AccessTimeIcon /> { moment(event.takesPlace.from).format('MMMM Do YYYY') }
            </Box>
            <Box mt={1} className="date start" component="div" display="block">
              <strong>End date:</strong><br />
              <AccessTimeIcon /> { moment(event.takesPlace.to).format('MMMM Do YYYY') }
            </Box>
          </Box>

          <Box mt={1} className="item-desc" component="div" display="block">
            <Typography variant="body1" component="body1">
              {event.description}
            </Typography>
          </Box>

          <Box mt={2.5} className="nav-buttons" component="div" display="block">

            <Box mr={1} component="div" display="inline">
              <a
                className="event-link"
                href="#"
                rel="noopener noreferrer"
              >
                {
                  currentUser.userEvents.interestedInEvents.indexOf(event._id) !== -1 ?
                  <Button variant="outlined" color="primary">
                    Not Interested In
                  </Button> :
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={(e) => handleInteresedIn(e)}
                  >
                    Interested in
                  </Button>
                }
              </a>
            </Box>
            <Box component="div" display="inline">
              <a
                className="event-link"
                href="#"
                rel="noopener noreferrer"
              >
                {
                  currentUser.userEvents.participantInEvents.indexOf(event._id) !== -1 ?
                  <Button variant="contained" color="primary">
                    Cancel participation
                  </Button> :
                  <Button variant="contained" color="primary">
                    Participate
                  </Button>                
                }
              </a>
            </Box>
          </Box>
          {

          }
        </Container>
      </body>
    </div>
  );
}

export default EventPage;
