import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { useSelector, useDispatch, } from 'react-redux';
import { login, } from '../../redux/actions/userActions';
import { getFromStorage, setInStorage, } from '../../utils/storage';

const Login = () => {
	
	// CSS
	const paperStyle={
		padding :20,
		height:'70vh',
		width:280,
		margin:"20px auto",
	};

	const avatarStyle={
		backgroundColor:'#1bbd7e'
	};

	const btnstyle={
		margin:'8px 0',
		backgroundColor:'#1bbd7e',
		color:'white'
	};

	// JS
	const dispatch = useDispatch();
	const [currentState, setState] = useState({
		isLoading: false,
		loginMsg: '',
		email: '',
		password: '',
		rememberMe: false,
	});

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setState({
			...currentState,
			[name]: value,
		});
	};

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setState({
			...currentState,
			[name]: checked,
		});
	};

	const onLogin = async () => {
		const { email, password, } = currentState;

		let result; // contains the api call result

		setState({
			...currentState,
			isLoading: true,
		});

		const token = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/users/login`,
			{
				email: email,
				password: password,
			},
		)
		.then((res) => {
			const { data, } = res;
			// console.log(data);
			result = data;
		})
		.catch((err) => {
			console.log(err);
		});

		if (result.status === 'error') {
			setState({
				...currentState,
				isLoading: false,
				loginMsg: result.message,
			});
		} else {
			setInStorage('iwiToken', result.token);
			dispatch(login(result.user));
			setState({
				email: '',
				password: '',
				isLoading: false,
				loginMsg: '',
			});
		}
	};

	return(
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align='center'>
					<Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
					<h2>Login</h2>
				</Grid>
				<TextField
					label='Email'
					placeholder='Enter Email'
					name='email'
					fullWidth
					required
					onChange={(e) => handleInputChange(e)}
				/>
				<TextField
					label='Password'
					placeholder='Enter password'
					type='password'
					name='password'
					fullWidth
					required
					onChange={(e) => handleInputChange(e)}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="rememberMe"
							color="primary"
							onChange={(e) => handleCheckboxChange(e)}
						/>
					}
					label="Remember me"
				/>
				<Button
					onClick={(e) => onLogin()}
					type='submit'
					color='primary'
					variant="Contained"
					style={btnstyle}
					fullWidth
				>
					Sign In
				</Button>
				<Typography> 
					<Link to="/" >
    				Forgot Password?
  				</Link>
  				</Typography>
  				<Typography> Don't have an account ?
					<Link to='/signup' >
    				Sign Up
  				</Link>
  				</Typography>
			</Paper>
		</Grid>
	)
}

export default Login;
