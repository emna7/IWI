import React from 'react';
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

const Login=()=>{

	const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
	const avatarStyle={backgroundColor:'#1bbd7e'}
	const btnstyle={margin:'8px 0'}
	return(
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align='center'>
					<Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
					<h2>Sign In</h2>
				</Grid>
				<TextField label='Username' placeholder='Enter username' fullWidth required/>
				<TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
				<FormControlLabel
					control={
					<Checkbox
						name="checkedB"
						color="primary"
					/>
					}
					label="Remember me"
				/>
				<Button type='submit' color='primary' variant="Contained" style={btnstyle} fullWidth>sign in</Button>
				<Typography> 
					<Link href="#" >
    				Forgot Password?
  					</Link>
  				</Typography>
  				<Typography> Do you have an account?
					<Link href="#" >
    				Sign Up
  					</Link>
  				</Typography>
			</Paper>
		</Grid>
	)
}

export default Login;
