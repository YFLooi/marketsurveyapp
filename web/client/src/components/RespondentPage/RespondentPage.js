import React, { useState } from "react";
import {
  //Allows us to connect to <Hashrouter/> from a child component
  withRouter
} from "react-router-dom";
import { GoogleSignIn } from "../GoogleSignIn/GoogleSignIn.js";
import CarouselRender from './Carousel.js';
import cardCoverImg from "./icons/coverImg.jpg";
import EnhancedTable from "./MaterialTable.js"

import { makeStyles} from '@material-ui/core/styles';
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import { Card, CardHeader, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core/";

//Material UI icon imports
import { Menu, Home, Settings, AccountBox, ShoppingCart, Explore, FavoriteOutlined } from '@material-ui/icons';

import logo from "../logo.png";

//The MaterialUI way of modding styles
const useStyles = makeStyles(theme => ({
    menuBar: {
        width: "100%",    
        maxHeight: 65,
        background: "linear-gradient(to left, #00b7ff, #87d7f7)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 10px"
    },
    menuBarLogo: {
        width:90,
        cursor:"pointer"
    },
    /*left and right leaves extra space*/
    menuBarLeft: {
        minWidth: "50%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20
    },
    menuList: {  //For Drawer
        minWidth: 250,
        zIndex: 2,
    },
    drawerButton: {
        width: 48,
        height: 48,

    },
    menuBarRight: {
        minWidth: "30%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 20
    },
    header: {
        minHeight: 70
    },
    bodyBox: {
        minHeight: "40vh",
        display: "flex",
    },
    body: {
        flex: "2 2 auto",
    }
}));

function RespondentPage(props) {
    const classes = useStyles();
    const surveys = [
        { surveyId:"1", coverImg: cardCoverImg, title:"survey1", issuer:"issuer1", dateIssued:"21 Jan 2020", description: "description1", disclosures:"disclosure1"},
        { surveyId:"2", coverImg: cardCoverImg, title:"survey2", issuer:"issuer2", dateIssued:"22 Jan 2020", description: "description2", disclosures:"disclosure2"},
        { surveyId:"3", coverImg: cardCoverImg, title:"survey3", issuer:"issuer3", dateIssued:"23 Jan 2020", description: "description3", disclosures:"disclosure3"},
        { surveyId:"4", coverImg: cardCoverImg, title:"survey4", issuer:"issuer4", dateIssued:"24 Jan 2020", description: "description4", disclosures:"disclosure4"},
        { surveyId:"5", coverImg: cardCoverImg, title:"survey5", issuer:"issuer5", dateIssued:"25 Jan 2020", description: "description5", disclosures:"disclosure5"},
        { surveyId:"6", coverImg: cardCoverImg, title:"survey6", issuer:"issuer6", dateIssued:"26 Jan 2020", description: "description6", disclosures:"disclosure6"},
        { surveyId:"7", coverImg: cardCoverImg, title:"survey7", issuer:"issuer7", dateIssued:"27 Jan 2020", description: "description7", disclosures:"disclosure7"},
        { surveyId:"8", coverImg: cardCoverImg, title:"survey8", issuer:"issuer8", dateIssued:"28 Jan 2020", description: "description8", disclosures:"disclosure8"},
        { surveyId:"9", coverImg: cardCoverImg, title:"survey9", issuer:"issuer9", dateIssued:"29 Jan 2020", description: "description9", disclosures:"disclosure9"},
        { surveyId:"10", coverImg: cardCoverImg, title:"survey10", issuer:"issuer10", dateIssued:"30 Jan 2020", description: "description10", disclosures:"disclosure10"},
    ]

    //Code for Drawer
    const [drawerToggle, setDrawerToggle] = useState({ left: false });

    //The on/off switch that opens and closes <Drawer/>
    //Takes in 2 values: A string (side: left/right/etc) and a boolean (open)
    const toggleDrawer = (side, open) => event => {
        //Check that prevents drawer from opening
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setDrawerToggle({ ...drawerToggle, [side]: open });
    };
    //Triggered by <Drawer/>, possibly with a listener, when state.left === true
    const sideList = side => (
        <div
            className={classes.menuList}
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
                <ListItem button key='homepage' onClick={() => {props.history.push('/')}}>
                    <ListItemIcon><Home/></ListItemIcon>
                    <ListItemText primary='Homepage' />
                </ListItem>
                <ListItem button key='accountSettings' onClick={() => {props.history.push('/RespondentAccount')}}>
                    <ListItemIcon><Settings/></ListItemIcon>
                    <ListItemText primary='Account Settings'/>
                </ListItem>
            </List>
        </div>
    );   
    return (
        <div className={classes.RespondentPage}>
            <div className={classes.menuBar}>
                <div className={classes.menuBarLeft}>
                    <IconButton edge="start" className={classes.drawerButton} color="inherit" aria-label="Drawer" onClick={toggleDrawer('left', true)}>
                        <Menu/>
                    </IconButton>
                    <img src={logo} className={classes.menuBarLogo} alt="logo" onClick={() => {props.history.push('/')}}/>
                </div>
                <div className={classes.menuBarRight}>
                    <GoogleSignIn/>
                </div>
                {/**Drawer contains side-hidden menu */}
                <Drawer open={drawerToggle.left} onClose={toggleDrawer('left', false)}>
                    {sideList('left')}
                </Drawer>
            </div>
           
            <Container classes={{root: classes.header}}>
                <Typography variant="h3" align="left">Welcome back user.id</Typography>
            </Container>
            <Container classes={{root: classes.bodyBox}}>
                <Grid container direction="column" justify="space-between" classes={{root: classes.body}}>
                    <Grid item>
                        <Typography variant="h4" align="left">Your rewards</Typography>
                        <Typography variant="body1" align="left">Cash earned: </Typography>
                        <Typography variant="body1" align="left">Vouchers received: </Typography>
                    </Grid>
                    <Grid item> 
                        <Typography variant="h4" align="left">Available surveys</Typography>  
                        <CarouselRender renderData={surveys}/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" align="left">Completed surveys</Typography>
                        <EnhancedTable renderData={surveys}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default withRouter(RespondentPage);
