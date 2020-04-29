import React from "react";
import {
    //Allows us to connect to <Hashrouter/> from a child component
    withRouter
} from "react-router-dom";
import { makeStyles} from '@material-ui/core/styles';
import { 
  Box, 
  Button,
  Typography 
} from "@material-ui/core";
//Imports for the AppBar (menu bar)
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

//Allows side-swiping menus
import Drawer from '@material-ui/core/Drawer';

//The Material UI answer to <ul/>
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//Boxes to display Icons and Text as part of a <List/>
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TypoGraphy from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';

//Material UI icon imports
import { Menu, Home, Settings, AccountBox, ShoppingCart, Explore, FavoriteOutlined } from '@material-ui/icons'

//The MaterialUI way of modding styles
const useStyles = makeStyles(theme => ({
    AppBar: {
        backgroundColor: 'gray',
        width: '100%',
        height: 56,
        position: 'relative',
    },
    //For menu drawer
    list: {
        width: 250,
        zIndex: 2,
      },
    //For menu drawer
    fullList: {
        width: 'auto',
    },
    menuButton: {
        width: 48,
        height: 48,

        top: '5%',
        bottom: '5%',
        left: '3.5%',
        position: 'absolute',
    },
    githubLink: {
        color:'blue',
        '&:hover': { 
            color: 'purple', 
        }, 
    }
}));

function RespondentPage(props) {
    const classes = useStyles();

    //Code for Drawer
    const [state, setState] = React.useState({
        left: false,
    });
    //The on/off switch that opens and closes <Drawer/>
    //Takes in 2 values: A string (side: left/right/etc) and a boolean (open)
    const toggleDrawer = (side, open) => event => {
        //Check that prevents drawer from opening
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setState({ ...state, [side]: open });
    };
    //Triggered by <Drawer/>, possibly with a listener, when state.left === true
    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            //Closes drawer when the <Drawer/> or its overlay <div/> are clicked
            onClick={toggleDrawer(side, false)} 
            //Closes <Drawer/> when any of its buttons are clicked
            onKeyDown={toggleDrawer(side, false)} 
        >
            <List>
                <ListItem key='title'>
                    <ListItemText primary='Menu' />
                </ListItem>
                <ListItem button key='home' onClick={() => {props.history.push('/')}}>
                    <ListItemIcon><Home/></ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
                <ListItem button key='advancedSearch' onClick={() => {props.history.push('/Account')}}>
                    <ListItemIcon><Settings/></ListItemIcon>
                    <ListItemText primary='Advanced Search'/>
                </ListItem>
                <ListItem>
                    <ListItemText key='feedback' primary='Feedback? 😁' secondary={
                        <React.Fragment>
                            <TypoGraphy component='span' variant='body1' align='left'>
                                Find the author on <a className={classes.githubLink} href="https://github.com/YFLooi/libraryWebsite-React">Github</a>
                            </TypoGraphy>
                        </React.Fragment>
                    }/>
                </ListItem>
            </List>
        </div>
    );
   
    return (
        <div className="RespondentPage">
            <Box>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)}>
                    <Menu/>
                </IconButton>
            </Box>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}

export default withRouter(RespondentPage);
