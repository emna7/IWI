import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import categories from './../../utils/categories';
import { useSelector, useDispatch, } from 'react-redux';
import { searchClubs,} from '../../redux/actions/clubActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { getFromStorage } from '../../utils/storage';
import { useHistory } from 'react-router';
import { TextField } from '@material-ui/core';

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

const createClub = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [currentState, setState] = React.useState({
    clubSubmitMsg: '',
    title: '',
    description: '',
    category: '',
  });

  const handleInputChange = (e) => {
		const {name, value} = e.target;
		setState({
			...currentState,
			[name]: value,
		});
	};

  const submitClub = async () => {
    const {
      title,
      description,
      category,
    } = currentState;

    let result;
    let reqParams = {};
    
    for (const [k, v] of Object.entries(currentState)) {
      // console.log(`${k} = ${v}`);
      if (v != null && v != undefined) {
        reqParams[k] = v;
      }
    }

    console.log(reqParams);

    const eventsData = await axios
    .post(
      `${process.env.REACT_APP_API_URL}/clubs`,
      {
        params: reqParams,
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
        clubSubmitMsg: result,
      });
      setTimeout(() => {
        setState({
          clubSubmitMsg: '',
          title: '',
          description: '',
          category: '',
        });
        if (result.status === 'success') {
          history.push('/clubs');
        }
      }, 3000);
    }
  };

  const {
    clubSubmitMsg,
    title,
    description,
    category,
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
            Create a club
          </Typography>
        </Box>
        <Grid container justify="space-around">
          <ValidatorForm
            onSubmit={submitClub}
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
            <TextField
              id="standard-static"
              label="Description"
              name='description'
              multiline
              rows={6}
              value={description}
              onChange={(e) => handleInputChange(e)}
              required={true}
            />

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
          {
						clubSubmitMsg && clubSubmitMsg.status === 'error' &&
						<Alert severity="error" style={alertStyle}>
							{clubSubmitMsg.message}
						</Alert>
					}
					{
						clubSubmitMsg && clubSubmitMsg.status === 'success' &&
						<Alert severity="success" style={alertStyle}>
							{clubSubmitMsg.message}
						</Alert>
					}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Club
          </Button>
          </ValidatorForm>
        </Grid>
      </div>
    </Container>
  );
};

export default createClub;
