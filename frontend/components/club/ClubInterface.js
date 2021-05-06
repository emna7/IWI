import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import IconAvatars from './iconAvatar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,
  },

  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
   
  },
}));

export default function ClubInterface() {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="main" maxWidth="sm">
    <CssBaseline />
    <div className={classes.paper}>
      <Container align="center" >
      <IconAvatars alignItems='center' />
      </Container>
      <Box textAlign="center">
      <Typography  component="h1" variant="h5">
        Clubs Interface
      </Typography>
      </Box>
      <Accordion defaultExpanded mb={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
          <Avatar alt="" src='https://source.unsplash.com/random' />
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Club Name</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
            
          <Typography className={clsx(classes.column, classes.heading)}>Name of Poster</Typography>

          <div className={clsx(classes.column, classes.helper)}>
            
              <a href="#secondary-heading-and-columns" className={classes.link}>
                Events
              </a>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            
              <a href="#secondary-heading-and-columns" className={classes.link}>
                Members
              </a>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" color="primary" mb={4}>
            JOIN
          </Button>
        </AccordionActions>
      </Accordion>
      </div>
    </Container>
  );
};
