import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/navbar/Navbar'; 
import Footer from './components/footer/Footer';
import clubImage from '../assets/club.jpg';
import gigImage from '../assets/gig.jpg';
import eventImage from '../assets/event.jpg';
import Homepage from './Homepage';
import ClubsList from './components/club/ClubsList';
import GigsList from './components/gig/GigsList';
import EventsList from './components/event/EventsList';
import Login from './components/user/Login';
import SignUp from './components/user/Signup';
import EventPage from './components/event/EventPage';
import CreateEvent from './components/event/CreateEvent';
import { useSelector } from 'react-redux';
import UserPage from './components/user/UserPage';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.currentUser);
  const selectedEvent = useSelector((state) => state.selectedEvent);

  return (
    <div className="App">
      <Router>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route path='/login' exact>
            {
              currentUser ? <Redirect to='/' /> : <Login />
            }
          </Route>
          <Route path='/signup' exact>
            {
              currentUser ? <Redirect to='/' /> : <SignUp />
            }
          </Route>
          <Route path='/gigs' exact component={GigsList} />
          <Route path='/clubs' exact component={ClubsList} />
          <Route path='/events' exact component={EventsList} />
          <Route path='/events/create' exact>
            {
              currentUser ? <CreateEvent /> : <Redirect to='/login' />
            }
          </Route>
          <Route path='/events/:eventId' exact>
            {
              currentUser ? <EventPage selectedEvent={selectedEvent} /> : <Redirect to='/login' />
            }
          </Route>
          <Route path='/users/:userId' exact>
            {
              currentUser ? <UserPage /> : <Redirect to='/login' />
            }
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
