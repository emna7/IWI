import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(8),
    // display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  FormLabel: {
    marginTop: theme.spacing(3)
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Gigs() {
  const [duration, setDuration] = React.useState('twohour');
  const handleChangeDuration = (event) => {
    setDuration(event.target.duration);
  };

  const [paid, setPaid] = React.useState(true);

  const handleChangePaid = (event) => {
    setPaid(event.target.paid);
  };
  const classes = useStyles();




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Container align="center" >
        <Avatar alignSelf="center" className={classes.avatar}>
          <AddIcon />
        </Avatar>
        </Container>
        <Box textAlign="center">
        <Typography  component="h1" variant="h5">
          Create Gig 
        </Typography>
        </Box>
        <FormLabel className={classes.FormLabel} component="legend">Location:</FormLabel>

        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" variant="outlined" />
        </form>
          <FormControl className={classes.FormLabel} component="fieldset">
            <FormLabel component="legend">Project duration:</FormLabel>
            <RadioGroup aria-label="gigs" name="gigs1" value={duration} onChange={handleChangeDuration}>
              <FormControlLabel value="twohour" control={<Radio />} label="1-2 hour" />
              <FormControlLabel value="halfaday" control={<Radio />} label="Half a day" />
              <FormControlLabel value="oneday" control={<Radio />} label="1 day" />
              <FormControlLabel value="morethanone" control={<Radio />} label="More than 1 day" />
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.FormLabel} component="fieldset">
            <FormLabel component="legend">Paid:</FormLabel>
            <RadioGroup row aria-label="gigs2" name="gigs3" value={paid} onChange={handleChangePaid}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {paid && <div>
       <FormLabel className={classes.FormLabel} component="legend">Budget:</FormLabel>

          <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="minPrice"
                variant="outlined"
                fullWidth
                id="minPrice"
                label="Min"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="maxPrice"
                label="Max"
                name="maxPrice"
              />
            </Grid>
          </Grid>
          </form>
        </div>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create gig
          </Button>
          <FormLabel className={classes.FormLabel} component="legend">Description:</FormLabel>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
