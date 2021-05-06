import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import defaultEventImage from '../../../assets/event.jpg';
import Chip from '@material-ui/core/Chip';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    minWidth: 400,
    marginTop: 20,
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  link: {
    textDecoration: 'none',
  }
}));

const EventCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { event, } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={event.image ? event.image : defaultEventImage}
        title="event image"
      />
      <CardContent style={{ paddingTop: 4, paddingBottom: 4, }}>
        <div style={{ width: '100%' }}>
          <Box display="flex" justifyContent='space-between' p={1}>
            <div>
              <Typography>
                <Box fontWeight="fontWeightBold">
                  {event.title && event.title}
                </Box>
              </Typography>
              {
                event.location &&
                <Typography>
                  <span style={{ fontWeight: 500, }} >{event.location.country && event.location.country}</span>
                  <span style={{ fontWeight: 400, }} >{event.location.state && `, ${event.location.state}`}</span>
                  <span style={{ fontWeight: 300, }} >{event.location.city && `, ${event.location.city}`}</span>
                </Typography>
              }
            </div>
            {
              event.category &&
              <Chip label={event.category} variant="outlined" />
            }
          </Box>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Link className={classes.link} to={`/events/${event.id}`}>
          <Button size="small" color="primary">
            View
          </Button>
        </Link>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {event.description && event.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default EventCard;
