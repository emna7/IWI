import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Favorite from '@material-ui/icons/Favorite';
import Headset from '@material-ui/icons/Headset';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Router>
        <Link color="inherit" to="https://material-ui.com/">
          iwi.com
        </Link>
      </Router>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        The IWI web platform
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        made with <Favorite color='secondary' /> and <Headset/> in Tunisia and USA.
      </Typography>
      <Copyright />
    </footer>
  );
};

export default Footer;
