import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import clubImage from '../assets/club.jpg';
import gigImage from '../assets/gig.jpg';
import eventImage from '../assets/event.jpg';
import { useSelector } from 'react-redux';

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
  link: {
    textDecoration: 'none',
  }
}));

const cards = [
  {
    image: gigImage,
    title: "Gigs",
    description: "People can find simple, paid or free tasks. Example: A student moving from a state to another, needs help with carrying heavy stuff.",
    pageLink: "/gigs",
  },
  {
    image: clubImage,
    title: "Clubs",
    description: "People sharing the same interests can join the same clubs.  Example: Chess club, running club.",
    pageLink: "/clubs",
  },
  {
    image: eventImage,
    title: "Events",
    description: "People can engage and participate in community-based events or activities. Example: Restoring a public park, Raising money for someone in need, Polyglot meeting, entertainment.",
    pageLink: "/events",
  }
];

const Homepage = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            IWI
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              IWI is a social platform connecting people sharing the same interests, mainly for community development.
              It allows people to find gigs, to join community clubs and to participate in events and initiatives.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Iwi means People in Maori
            </Typography>
            {
              !currentUser &&
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link className={classes.link} to='/signup'>
                      <Button variant="contained" color="primary">
                        Create an account
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                      <Link className={classes.link} to='/login'>
                        <Button variant="outlined" color="primary">
                          Login
                        </Button>
                      </Link>
                  </Grid>
                </Grid>
              </div>
            }
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link className={classes.link} to={card.pageLink}>
                      <Button size="small" color="primary">
                        View
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Homepage;
