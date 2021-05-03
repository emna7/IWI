import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ListIcon from '@material-ui/icons/List';




const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
    backgroundColor: theme.palette.secondary.main,
  },

  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4)
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  FormLabel: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },

}));

const cards = [1, 2, 3, 4];

export default function GigsList() {
  const classes = useStyles();
  

  return (
    <Container className={classes.cardGrid} component="main" maxWidth="xs">
          <Container align="center" >
        <Avatar align="center" className={classes.avatar}>
          <ListIcon />
        </Avatar>
        </Container>
        <Box textAlign="center" className={classes.FormLabel}>
        <Typography  component="h1" variant="h5" >
          Gigs List
        </Typography>
        </Box>
          <Box container spacing={2}>
            {cards.map((card) => (
              <Box item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src='https://source.unsplash.com/random' />
        }
        
        title="What is Lorem Ipsum?"
      />
                  
                  <CardContent className={classes.cardContent}>
                    
                    <Typography>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has........................
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
  );
            }
