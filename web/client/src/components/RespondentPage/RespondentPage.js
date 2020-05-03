import React, { useState } from "react";
import {
    //Allows us to connect to <Hashrouter/> from a child component
    withRouter
} from "react-router-dom";
import { GoogleSignIn } from "../GoogleSignIn/GoogleSignIn.js";
import CarouselRender from './Carousel.js';
import cardCoverImg from "./icons/coverImg.jpg";

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
    //Temporary store for details card generated on clicking Survey Card-s
    const [detailsCard, setDetailsCard] = useState([])

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
    const renderDetailsCard = (surveyId) => {
        let detailsOverlay = document.getElementById(`detailsOverlay`);
        let targetIndex = surveys.findIndex(item => item.surveyId === surveyId);
        console.log(`Array position containing target book details: ${targetIndex}`);
        
        let newDetailsCardArray = [
            /**First element is the overview card*/
            <Card key='survey details card' classes={{root: classes.detailsCard}}>
                <div className={classes.detailsCardInfoBox}>
                    <CardMedia
                        component='img'
                        alt={`survey image`}
                        src={surveys[targetIndex].coverImg}
                        classes= {{media: classes.detailsCardImage}}
                    />
                    <div className={classes.detailsCardDetails}>
                        <CardHeader
                            title = {surveys[targetIndex].title}
                            subheader = {
                                <React.Fragment>
                                    {`By: ${surveys[targetIndex].issuer}`} <br/> 
                                    {`Date created: ${surveys[targetIndex].dateIssued}`}
                                </React.Fragment>
                            }
                            classes = {{root: classes.surveyCard, title: classes.detailsCardTitle, subheader: classes.detailsCardSubheader}}
                        />
                        <CardActions classes={{root: classes.detailsCardActions}}>
                            <Button size="small" color="primary" onClick={() => {hideDetailsCard();}}>
                                Close
                            </Button>
                        </CardActions>
                    </div>
                </div>
                <CardContent>
                    <Typography variant="h6" component="div" noWrap={true}>
                        <u>Description</u>
                    </Typography><br/>
                    <Typography variant="body1" component="div" noWrap={false}>
                        {surveys[targetIndex].description}
                    </Typography><br/>
                    <Typography variant="h6" component="div" noWrap={true}>
                        <u>Disclosures</u>
                    </Typography><br/>
                    <Typography variant="body1" component="div" noWrap={false}>
                        {surveys[targetIndex].disclosures}
                    </Typography><br/>
                </CardContent>
            </Card>
            ,
            /**2nd element is the disclaimer card*/
            <Card key='survey disclaimer card' classes={{root: classes.detailsCard}}>
                <div className={classes.detailsCardDetails}>
                    <CardHeader
                        title = {surveys[targetIndex].title}
                        classes = {{root: classes.surveyCard, title: classes.detailsCardTitle, subheader: classes.detailsCardSubheader}}
                    />
                    <CardActions classes={{root: classes.detailsCardActions}}>
                        <Button size="small" color="primary" onClick={() => {hideDetailsCard();}}>
                            Close
                        </Button>
                    </CardActions>
                </div>    
                <CardContent>
                    <Container>
                        <Typography variant="h6" component="div" noWrap={true}>
                            PLEASE REVIEW THE TERMS OF YOUR PARTICIPATION BEFORE CONTINUING
                        </Typography>
                        <Typography variant="body1" component="div" noWrap={false}>
                            By clicking "I ACCEPT", you consent to SAVE.ai's collection and processing of your responses
                            for 3rd parties, including those specified in the disclosure.<br/>
                            You also confirm your account details are valid. SAVE.ai reserves the right to
                            forfeit rewards for accounts deemed fraudulent<br/>
                            Your participation in this survey will be kept anonymous.<br/>
                        </Typography>
                        <Button>I ACCEPT</Button> <Button>I DECLINE</Button>
                    </Container>
                </CardContent>
            </Card>
        ]

        let oldDetailsCard = detailsCard;
        let newDetailsCard = oldDetailsCard.splice(0, oldDetailsCard.length);
        setDetailsCard([...newDetailsCard, ...newDetailsCardArray]);
        detailsOverlay.style.display= 'block'; 
    }
    const hideDetailsCard = () => {
        //Need to do this mutably. Otherwise, buttons will be stuck on last state
        setDetailsCard([]);
                
        //Should keep appended Details card. That way, there is no load time if 'Details' is clicked again
        document.getElementById(`detailsOverlay`).style.display = 'none';
    }

   
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
                <div id='detailsOverlay' className={classes.detailsOverlay}>
                    {detailsCard[0]} {/**Must use state here: When state updates, the update is pushed to all calls of that state*/}
                </div>
                <Grid container direction="column" justify="space-between" classes={{root: classes.body}}>
                    <Grid item>
                        <Typography variant="h4" align="left">Your rewards</Typography>
                        <Typography variant="body1" align="left">Cash earned: </Typography>
                        <Typography variant="body1" align="left">Vouchers received: </Typography>
                    </Grid>
                    <Grid item> 
                        <Typography variant="h4" align="left">Available surveys</Typography>  
                        <CarouselRender renderData={surveys} renderDetailsCard={renderDetailsCard}/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" align="left">Completed surveys</Typography>
                        <List>
                            <ListItem key='title'>
                                <ListItemText primary='Menu' />
                            </ListItem>
                            <ListItem button key='homepage'>
                                <ListItemIcon><Home/></ListItemIcon>
                                <ListItemText primary='Homepage' />
                            </ListItem>
                            <ListItem button key='accountSettings'>
                                <ListItemIcon><Settings/></ListItemIcon>
                                <ListItemText primary='Account Settings'/>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default withRouter(RespondentPage);
