import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import categories from './../../utils/categories';
import { useSelector, useDispatch, } from 'react-redux';
import { searchEvents,} from '../../redux/actions/eventActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
import { getFromStorage } from '../../utils/storage';
import { useHistory } from 'react-router';
import { TextField } from '@material-ui/core';

const alertStyle = {
  marginTop: 20,
};

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
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const createEvent = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [currentState, setState] = React.useState({
    eventSubmitMsg: '',
    title: '',
    description: '',
    country: '',
    state: '',
    city: '',
    category: '',
    startDate: null,
    endDate: null,
  });

  const handleInputChange = (e) => {
		const {name, value} = e.target;
		setState({
			...currentState,
			[name]: value,
		});
	};

  const handleStartDate = (date) => {
		setState({
			...currentState,
			startDate: date,
		});
	};

  const handleEndDate = (date) => {
		setState({
			...currentState,
			endDate: date,
		});
	};

  const submitEvent = async () => {
    const {
      title,
      description,
      country,
      state,
      city,
      category,
      startDate,
      endDate,
    } = currentState;

    let result;
    let reqParams = {};
    
    for (const [k, v] of Object.entries(currentState)) {
      // console.log(`${k} = ${v}`);
      if (v != null && v != undefined) {
        reqParams[k] = v;
      }
    }

    console.log('-----------------')
    console.log(reqParams);
    
    let takesPlace = {
      from: startDate,
      to: endDate,
    };
    reqParams["takesPlace"] = takesPlace;
    delete reqParams.startDate;
    delete reqParams.endDate;

    const eventsData = await axios
    .post(
      `${process.env.REACT_APP_API_URL}/events`,
      {
        ...reqParams,
      },
      {
        headers: {
          'auth-token': getFromStorage('iwiToken'),
        },
      },
    )
    .then((res) => {
      const { data } = res;
      result = data;
      console.log(result);
      // dispatch(searchEvents(result.data));
    })
    .catch((err) => {
      console.log(err);
    });

    if (result) {
      setState({
        ...currentState,
        eventSubmitMsg: result,
      });
      setTimeout(() => {
        setState({
          eventSubmitMsg: '',
          title: '',
          description: '',
          country: '',
          state: '',
          city: '',
          category: '',
          startDate: null,
          endDate: null,
        });
        if (result.status === 'success') {
          history.push('/events');
        }
      }, 3000);
    }
  };

  const {
    eventSubmitMsg,
    title,
    description,
    country,
    state,
    city,
    category,
    startDate,
    endDate,
  } = currentState;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Container align="center" >
          <Avatar align="center" className={classes.avatar}>
            <AddCircleIcon />
          </Avatar>
        </Container>
        <Box textAlign="center">
          <Typography  component="h1" variant="h5">
            Create an event
          </Typography>
        </Box>
        <Grid container justify="space-around">
          <ValidatorForm
            onSubmit={submitEvent}
          >
            <TextValidator
              className={classes.formControl}
              id='standard-basic'
              label='Event title'
              name='title'
              value={title}
              onChange={(e) => handleInputChange(e)}
              validators={['required']}
              required={true}
						  errorMessages={['this field is required']}
            />
            <TextValidator
              id="standard-static"
              label="Description"
              name='description'
              value={description}
              onChange={(e) => handleInputChange(e)}
              validators={['required']}
              required={true}
						  errorMessages={['this field is required']}
            />

          {/* COUNTRY */}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              name='country'
              onChange={(e) => handleInputChange(e)}
              validators={['required']}
              required={true}
						  errorMessages={['this field is required']}
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
              validators={['required']}
              required={true}
						  errorMessages={['this field is required']}
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
                validators={['required']}
                required={true}
						    errorMessages={['this field is required']}
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

          {/* CATEGORY */}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              name='category'
              onChange={(e) => handleInputChange(e)}
              validators={['required']}
              required={true}
						  errorMessages={['this field is required']}
            >
              <MenuItem value=''>None</MenuItem>
              {
                categories.map((l, i) => {
                  return <MenuItem key={i} value={l}>{l}</MenuItem>
                })
              }
            </Select>
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.formControl}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start date"
              value={startDate}
              name='startDate'
              onChange={(e) => handleStartDate(e)}
              validators={['required']}
              required={true}
						  errorMessages={['this field is required']}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
            />
            <KeyboardDatePicker
              className={classes.formControl}
              variant="inline"
              disableToolbar
              margin="normal"
              id="date-picker-dialog"
              label="End date"
              format="MM/dd/yyyy"
              value={endDate}
              name='endDate'
              onChange={(e) => handleEndDate(e)}
              validators={['required']}
              required={true}
						  errorMessages={['this field is required']}
              KeyboardButtonProps={{
                'aria-label': 'change end date',
              }}
            />
          </MuiPickersUtilsProvider>

          {
						eventSubmitMsg && eventSubmitMsg.status === 'error' &&
						<Alert severity="error" style={alertStyle}>
							{eventSubmitMsg.message}
						</Alert>
					}
					{
						eventSubmitMsg && eventSubmitMsg.status === 'success' &&
						<Alert severity="success" style={alertStyle}>
							{eventSubmitMsg.message}
						</Alert>
					}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Event
          </Button>
          </ValidatorForm>
        </Grid>
      </div>
    </Container>
  );
};

export default createEvent;
