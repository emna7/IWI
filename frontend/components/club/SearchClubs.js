import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  FormLabel: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  formControl: {
    marginTop: theme.spacing(1),
    width: "50%",
    marginBottom: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SearchClubs() {
  const [privacy, setPrivacy] = React.useState();

  const handleChangePrivacy = (event) => {
    setPrivacy(event.target.privacy);
  };
  const [category, setCategory] = React.useState('');

  const handleChangeCategory = (event) => {
    setCategory(event.target.category);
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Container align="center" >
        <Avatar align="center" className={classes.avatar}>
          <SearchIcon />
        </Avatar>
        </Container>
        <Box textAlign="center">
        <Typography  component="h1" variant="h5">
          Clubs Search
        </Typography>
        </Box>
        <FormLabel className={classes.FormLabel} component="legend">Name:</FormLabel>

        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" variant="outlined" />
        </form>
          <FormControl className={classes.FormLabel} component="fieldset">
            <FormLabel component="legend">Privacy:</FormLabel>
            <RadioGroup row aria-label="clubs" name="clubs1" value={privacy} onChange={handleChangePrivacy}>
              <FormControlLabel value="public" control={<Radio />} label="Public" />
              <FormControlLabel value="private" control={<Radio />} label="Private" />
            </RadioGroup>
          </FormControl>

          <FormLabel component="legend">Category:</FormLabel>
          <FormControl variant="filled" className={classes.FormLabel, classes.formControl}>
            
            
            <InputLabel id="demo-simple-select-filled-label">Ex: Sport</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={category}
              onChange={handleChangeCategory}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Search
          </Button>
          
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}