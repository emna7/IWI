import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import locations from './../../utils/locations';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

const SearchEvents = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');

  const [currentState, setState] = React.useState({
    country: '',
    state: '',
    city: '',
    startDate: null,
    endDate: null,
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleInputChange = (e) => {
		const {name, value} = e.target;
		setState({
			...currentState,
			[name]: value,
		});
	};

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const {
    country,
    state,
    city,
    startDate,
    endDate,
  } = currentState;

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
          Events Search
        </Typography>
        </Box>
        {/* COUNTRY */}
					<FormControl className={classes.formControl}>
        		<InputLabel id="demo-simple-select-label">Country</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={country}
							name='country'
							onChange={(e) => handleInputChange(e)}
						>
							<MenuItem value=''>None</MenuItem>
							{
								Object.keys(locations).map((l, i) => {
									return <MenuItem key={i} value={l}>{l}</MenuItem>
								})
							}
						</Select>
					</FormControl>

					{/* STATE */}
					{
						country &&
						<FormControl className={classes.formControl}>
        		<InputLabel id="demo-simple-select-label">State</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={state}
							name='state'
							onChange={(e) => handleInputChange(e)}
						>
							<MenuItem value=''>None</MenuItem>
							{
								Object.keys(locations[`${country}`]).map((l, i) => {
									return <MenuItem key={i} value={l}>{l}</MenuItem>
								})
							}
						</Select>
					</FormControl>
					}

					{/* CITY */}
					{
						country && state &&
						<FormControl className={classes.formControl}>
        		<InputLabel id="demo-simple-select-label">City</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={city}
							name='city'
							onChange={(e) => handleInputChange(e)}
						>
							<MenuItem value=''>None</MenuItem>
							{
								Object.keys(locations[`${country}`][`${state}`]).map((l, i) => {
									return <MenuItem key={i} value={l}>{l}</MenuItem>
								})
							}
						</Select>
					</FormControl>
					}
         
      <FormLabel className={classes.FormLabel} component="legend">Date/Time:</FormLabel>
  
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
      </Grid>
    </MuiPickersUtilsProvider>
  
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
    </Container>
  );
};

export default SearchEvents;
