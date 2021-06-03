import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import userPageWallpaper from './../../../assets/userpageWallpaper.jpg';
import userAvatar from './../../../assets/userAvatar.jpg';
import { useSelector } from 'react-redux';
import EventCard from './../event/EventCard';
import axios from 'axios';
import { getFromStorage, } from './../../utils/storage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(-2),
    backgroundImage: {userPageWallpaper},
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
    visibility: 'hidden'
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    // marginTop: theme.spacing(0)
  },
}));

const UserPage = (props) => {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [userCreatedEvents, setUserCreatedEvents] = React.useState([]);
  
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const currentUser = useSelector((state) => state.currentUser);
  console.log(currentUser);

  return (
    <React.Fragment>
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${userPageWallpaper})` }}>
      {<img style={{ display: 'none' }} src="https://source.unsplash.com/random" alt='testing' />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              this is title
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              this is description
            </Typography>
            <Link variant="subtitle1" href="#">
              link text
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
    <Box m='auto' align='center'>
      <Avatar alt="Travis Howard" src={userAvatar} className={classes.large}/>
    </Box>
    <Typography align='center' variant="h6" color="inherit" paragraph>
      
    </Typography>
    <Paper className={classes.root}>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Clubs" {...a11yProps(1)} />
          <Tab label="Events" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* TAB 0 */}
        <TabPanel variant='h3' display='column' value={value} index={0} >
          <Typography style={{ fontWeight: 600 }}align='center' variant="p6" color="inherit" paragraph>
            <div>Username</div>
            <Typography variant="body2" color="textSecondary" component="p">
              {currentUser.username}
            </Typography>
            <div>FirstName</div>
            <Typography variant="body2" color="textSecondary" component="p">
              {currentUser.firstName}
            </Typography>
            <div>LastName</div>
            <Typography variant="body2" color="textSecondary" component="p">
              {currentUser.lastName}
            </Typography>
            <div>Birthday</div>
            <Typography variant="body2" color="textSecondary" component="p">
              {currentUser.birthday}
            </Typography>
            <div>Gender</div>
            <Typography variant="body2" color="textSecondary" component="p">
              {currentUser.sex}
            </Typography>
            <div>Biography</div>
            <Typography variant="body2" color="textSecondary" component="p">
              {currentUser.biography}
            </Typography>
          </Typography>
        </TabPanel>

        {/* TAB 1 */}
        <TabPanel variant='h3' display='column' value={value} index={1} >
          <Typography style={{ fontWeight: 600 }}align='center' variant="p6" color="inherit" paragraph>
            Created clubs
          </Typography>
          {
            currentUser.userClubs &&
            currentUser.userClubs.createdClubs.length > 0 ?
            currentUser.userClubs.createdClubs.map((club, i) => {
              return (<div key={i}><ClubCard club/></div>);
            }) :
            <Typography style={{ fontWeight: 300 }} align='center' variant="p6" color="error" paragraph>
              this user has not created any clubs yet.
            </Typography>
          }
          <Typography style={{ fontWeight: 600 }}align='center' variant="p6" color="inherit" paragraph>
            Joined clubs
          </Typography>
          {
            currentUser.userClubs &&
            currentUser.userClubs.joinedClubs.length > 0 ?
            currentUser.userClubs.joinedClubs.map((club, i) => {
              return (<div key={i}><ClubCard club/></div>);
            }) :
            <Typography style={{ fontWeight: 300 }} align='center' variant="p6" color="error" paragraph>
              this user has not joined any clubs yet.
            </Typography>
          }
        </TabPanel>
        
          {/* TAB 2 */}
          <TabPanel variant='h3' display='column' value={value} index={2} >
          <Typography style={{ fontWeight: 600 }} align='center' variant="p6" color="inherit" paragraph>
            Created events
          </Typography>
          {
            currentUser.userEvents &&
            currentUser.userEvents.createdEvents.length > 0 ?
            currentUser.userEvents.createdEvents.map((eventId, i) => {
              let result;
              const getEventCard = async () => {
                const eventsData = await axios
                .get(
                  `${process.env.REACT_APP_API_URL}/events/${eventId}`,
                  {},
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
                  return (<div key={i}><EventCard event /></div>);
                }
              };
              getEventCard();
            }) :
            <Typography style={{ fontWeight: 300 }} align='center' variant="p6" color="error" paragraph>
              this user has not created any events yet.
            </Typography>
          }
          <Typography style={{ fontWeight: 600 }}align='center' variant="p6" color="inherit" paragraph>
            Partipated-in events
          </Typography>
          {
            currentUser.userEvents &&
            currentUser.userEvents.participantInEvents.length > 0 ?
            currentUser.userEvents.participantInEvents.map((event, i) => {
              return (<div key={i}><EventCard event={event} /></div>);
            }) :
            <Typography style={{ fontWeight: 300 }} align='center' variant="p6" color="error" paragraph>
              this user has not participated in any events yet.
            </Typography>
          }
        </TabPanel>
        
      </SwipeableViews>
    </div>
    </Paper>
    </React.Fragment>
  );
}

UserPage.propTypes = {
  post: PropTypes.object,
};

export default UserPage;
