import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logo from '../../../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch, } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { logout, } from './../../redux/actions/userActions';
import { getFromStorage } from '../../utils/storage';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  appBar: {
    marginBottom: 75,
  }
}));

const ITEM_HEIGHT = 48;

const menuOptions = [
  {
    label: 'Create Club',
    link: '/clubs/create',
  },
  {
    label: 'Create Event',
    link: '/events/create',
  },
  {
    label: 'Create Gig',
    link: '/gigs/create',
  }
];

const UserNavbar = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (link) => {
    setAnchorEl(null);
    history.push(link);
  };

  const handleLogout = async () => {
    let result;
    // setAnchorEl(null);
    let r = await axios
		.post(
			`${process.env.REACT_APP_API_URL}/users/logout`,
      {},
      {
        headers: {
          'auth-token': getFromStorage('iwiToken'),
        },
      },
		)
		.then((res) => {
			const { data, } = res;
			// console.log(res);
			result = res;
		})
		.catch((err) => {
			console.log(err);
		});

		if (result && result.status === 200) {
      dispatch(logout());

      history.push('/');
		}
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link className={classes.link} to='/'>
            <img src={Logo} height={44} width={75} />
          </Link>
          <Typography variant="h6" className={classes.title}>
            {' '}
          </Typography>
            <Link className={classes.link} to={`/users/${currentUser._id}`}>
              <AccountCircleIcon color='action' fontSize='large' />
            </Link>
            {/* Dropdown menu */}
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {menuOptions.map((option, i) => (
                  <MenuItem key={i} onClick={(e) => handleClose(option.link)}>
                    {option.label}
                  </MenuItem>
                ))}
                <MenuItem>
                  <Button
                    color="inherit"
                    onClick={(e) => handleLogout(e)}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </div>
            {/* Dropdown menu */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default UserNavbar;
