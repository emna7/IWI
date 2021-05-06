import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
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

const cards = [
  {
    image: gigImage,
    title: "Gigs",
    description: "People can find simple, paid or free tasks. Example: A student moving from a state to another, needs help with carrying heavy stuff.",
    pageLink: "/",
  },
  {
    image: clubImage,
    title: "Clubs",
    description: "People sharing the same interests can join the same clubs.  Example: Chess club, running club.",
    pageLink: "/",
  },
  {
    image: eventImage,
    title: "Events",
    description: "People can engage and participate in community-based events or activities. Example: Restoring a public park, Raising money for someone in need, Polyglot meeting, entertainment.",
    pageLink: "/",
  }
];

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Router>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/gigs' exact component={GigsList} />
          <Route path='/clubs' exact component={ClubsList} />
          <Route path='/events' exact component={EventsList} />
          <Route path='/events/:eventId' exact component={EventPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
