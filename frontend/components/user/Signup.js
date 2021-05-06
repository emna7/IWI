import React, { useState, } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, } from 'react-redux';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import locations from './../../utils/locations';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Signup = () => {

	// CSS
	const paperStyle={padding: 20, width: 340, margin:"50px auto"}
	const headerStyle={margin:0}
	const avatarStyle={backgroundColor:'#1bbd7e'}
	const marginTop={marginTop:20}
	const btnstyle={backgroundColor:'#1bbd7e', color:'white', marginTop: 20};
	const alertStyle = {
		marginTop: 20,
	};

	// JS
	// const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();

	const [currentState, setState] = useState({
		isLoading: false,
		signUpMsg: '',
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		sex: '',
		phone: '',
		country: '',
		state: '',
		city: '',
		password: '',
		confirmPassword: '',
	});

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setState({
			...currentState,
			[name]: value,
		});
	};

	const submitSignUp = async () => {
		const {
			username,
			firstName,
			lastName,
			email,
			sex,
			phone,
			country,
			state,
			city,
			password,
			confirmPassword,
		} = currentState;

		let result;

		if (password !== confirmPassword) {
			setState({
				...currentState,
				signUpMsg: {
					status: 'error',
					message: 'Passwords do not match',
				},
			});
			return;
		}

		const userData = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/users/signup`,
			{
				username: username,
				firstName: firstName,
				lastName: lastName,
				email: email,
				sex: sex,
				phone: phone,
				password: password,
			},
		)
		.then((res) => {
			const { data, } = res;
			result = data;
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});

		if (result.status === 'error') {
			setState({
				...currentState,
				isLoading: false,
				signUpMsg: result,
			})
		} else if (result.status === 'success') {
			setState({
				...currentState,
				isLoading: false,
				signUpMsg: result,
			});

			setTimeout(() => {
				history.push('/login');
			}, 3000);

		} else {
			setState({
				isLoading: false,
				signUpMsg: '',
				username: '',
				firstName: '',
				lastName: '',
				email: '',
				sex: '',
				phone: '',
				country: '',
				state: '',
				city: '',
				password: '',
			});
		}
	};

	const {
		isLoading,
		signUpMsg,
		username,
		firstName,
		lastName,
		email,
		sex,
		phone,
		country,
		state,
		city,
		password,
		confirmPassword,
	} = currentState;

	return (
		<Grid>
			<Paper elevation={20} style={paperStyle}>
				<Grid align='center'>
					<Avatar style={avatarStyle}>
						<AddCircleOutlineOutlinedIcon/>
					</Avatar>
					<h2 style={headerStyle}>Sign Up</h2>
					<Typography variant='caption' gutterBottom>Create an account!</Typography>
				</Grid>
				<ValidatorForm
					onSubmit={submitSignUp}
				>
					<TextValidator
						fullWidth
						label='username'
						name='username'
						value={username}
						placeholder="Enter your username"
						validators={['required']}
						errorMessages={['this field is required']}
						onChange={(e) => handleInputChange(e)}
					/>
					<TextValidator
						fullWidth
						label='First Name'
						name='firstName'
						value={firstName}
						placeholder="Enter your first name"
						validators={['required']}
						errorMessages={['this field is required']}
						onChange={(e) => handleInputChange(e)}
					/>
					<TextValidator
						fullWidth
						label='Last Name'
						name='lastName'
						value={lastName}
						placeholder="Enter your last name"
						validators={['required']}
						errorMessages={['this field is required']}
						onChange={(e) => handleInputChange(e)}
					/>
					<TextValidator
						fullWidth
						label='Email'
						name='email'
						value={email}
						placeholder="Enter your email"
						validators={['required', 'isEmail']}
						errorMessages={['this field is required', 'Email is not valid']}
						onChange={(e) => handleInputChange(e)}
					/>
					<FormControl component="fieldset" style={marginTop}>
						<FormLabel component="legend">Gender</FormLabel>
							<RadioGroup aria-label="sex" name="sex" style={{display: 'initial'}}>
								<FormControlLabel value="female" control={<Radio />} label="Female" />
								<FormControlLabel value="male" control={<Radio />} label="Male" />
								<FormControlLabel value="other" control={<Radio />} label="Other" />
							</RadioGroup>
					</FormControl>
					<TextValidator
						fullWidth
						type='tel'
						label='Phone Number'
						name='phone'
						placeholder="Enter you phone number"
					/>
					<TextValidator
						fullWidth
						type='password'
						label='password'
						name='password'
						value={password}
						placeholder="Enter your password"
						validators={['required']}
						errorMessages={['this field is required']}
						onChange={(e) => handleInputChange(e)}
					/>
					<TextValidator
						fullWidth
						type='password'
						label='confirmPassword'
						name='confirmPassword'
						value={confirmPassword}
						placeholder="Confirm your password"
						validators={['required']}
						errorMessages={['this field is required']}
						onChange={(e) => handleInputChange(e)}
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

					{
						signUpMsg && signUpMsg.status === 'error' &&
						<Alert severity="error" style={alertStyle}>
							{signUpMsg.message}
						</Alert>
					}
					{
						signUpMsg && signUpMsg.status === 'success' &&
						<Alert severity="success" style={alertStyle}>
							{signUpMsg.message}
						</Alert>
					}
					<Button
						type='submit'
						color='#1bbd7e'
						variant="Contained"
						style={btnstyle}
						fullWidth
					>
						Sign Up
					</Button>
				</ValidatorForm>
			</Paper>
		</Grid>
	);
};

export default Signup;
