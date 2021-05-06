import React from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ListIcon from '@material-ui/icons/List';
import SearchEvents from './SearchEvents';
import EventCard from './EventCard';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },

  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4)
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  FormLabel: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },

}));

export default function EventsList() {
  const classes = useStyles();
  const events = useSelector((state) => state.events);
  console.log('events');
  console.log(events);
  return (
    <Container className={classes.cardGrid} component="main" maxWidth="lg">
      <CssBaseline />
      <SearchEvents />
      <Container align="center" >
      <Avatar align="center" className={classes.avatar}>
        <ListIcon />
      </Avatar>
      </Container>
      <Box textAlign="center" className={classes.FormLabel}>
      <Typography  component="h1" variant="h5" >
        Events List
      </Typography>
      </Box>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {
          events.length === 0 ?
          <div>
            Make a search with the filters above.
          </div> :
          events.map((oneEvent, i) => <EventCard key={i} event={oneEvent} />)
        }
      </Grid>
    </Container>
  );
};
