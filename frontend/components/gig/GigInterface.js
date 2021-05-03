import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import IconAvatars from '../iconAvatar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,
  },

  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  FormLabel: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
   
  },
}));

export default function GigInterface() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container className={classes.root} component="main" maxWidth="sm">
    <CssBaseline />
    <div className={classes.paper}>
      <Container align="center" >
      <IconAvatars alignItems='center' />
      </Container>
      <Box textAlign="center">
      <Typography  component="h1" variant="h5">
        Gigs Interface
      </Typography>
      </Box>
      <Accordion defaultExpanded mb={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
          <Avatar alt="" src='https://source.unsplash.com/random' />
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Gig Name</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>

          <Typography className={clsx(classes.column, classes.heading)}>Name of Poster</Typography>

        </AccordionDetails>

        <Typography>
          Description Lorem Ipsum is simply dummy text of the printing and typesetting ind>
        </Typography>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Start date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            variant="inline"
            disableToolbar
            margin="normal"
            id="date-picker-dialog"
            label="End date"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
        </MuiPickersUtilsProvider>

        <FormLabel className={classes.FormLabel} component="legend">Location:</FormLabel>

        <Divider />

        <AccordionActions>
          <Button size="small" color="primary" mb={4}>
            APPLY
          </Button>
        </AccordionActions>
      </Accordion>
      </div>
    </Container>
  );
};
