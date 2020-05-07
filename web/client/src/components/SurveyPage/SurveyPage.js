import React, { useState } from "react";
import {
    //Allows us to connect to <Hashrouter/> from a child component
    withRouter
} from "react-router-dom";
import { GoogleSignIn } from "../GoogleSignIn/GoogleSignIn.js";

import { makeStyles} from '@material-ui/core/styles';
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import { Card, CardHeader, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core/";

import logo from "../logo.png";

//The MaterialUI way of modding styles
const useStyles = makeStyles(theme => ({
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

function SurveyPage(props) {
    const classes = useStyles();
    const questions = [
        { questionType:"trueFalse", questionText:"Do you know Nestle?", response:"" },
        { questionType:"trueFalse", questionText:"Do you know KitKat?", response:"" },
        { questionType:"oneAnsMultipleChoice", questionText:"Which age group are you in?", response:"" },
        { questionType:"manyAnsMultipleChoice", questionText:"Which of the following flavours appeal to you?", userResponse:"" },
        { questionType:"rankOrder", questionText:"Rank the following", response:"" },
        { questionType:"rateScale", questionText:"Rate how appealing these flavours sound to you", response:"" },
        { questionType:"5Point", questionText:"Would you pay a bit more for a premium KitKat?", response:"" },
    ]
    const questionTemplates = {
        
    }

    const [drawerToggle, setDrawerToggle] = useState({ left: false }); //Switch to show/hide Drawer
    let detailsCard = []; //Temporary store for details card generated on clicking a Survey card

    
    const renderDetailsCard = (surveyId) => {
        const surveys = props.renderData;
        let detailsOverlay = document.getElementById(`detailsOverlay`);
        let targetIndex = surveys.findIndex(item => item.surveyId === surveyId);
        console.log(`Array position containing target book details: ${targetIndex}`);
        
        let newDetailsCardArray = [
            /**First element is the overview card*/
            <Card key='survey details card' classes={{root: classes.detailsCard}}>
                <div className={classes.detailsCardInfoBox}>
                    <CardMedia
                        component='img'
                        height="210"
                        alt={`survey image`}
                        src={surveys[targetIndex].coverImg}
                        classes= {{media: classes.detailsCardImage}}
                    />
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
                </div>
                <CardContent>
                    <Typography variant="h6" component="div" noWrap={true}>
                        <u>Description</u>
                    </Typography>
                    <Typography variant="body1" component="div" noWrap={false}>
                        {surveys[targetIndex].description}<br/>
                    </Typography>
                    <Typography variant="h6" component="div" noWrap={true}>
                        <u>Disclosures</u>
                    </Typography>
                    <Typography variant="body1" component="div" noWrap={false}>
                        {surveys[targetIndex].disclosures}<br/><br/>
                    </Typography>
                    <Button variant="contained" size="small" color="primary" >
                        NEXT
                    </Button>
                    <Button variant="contained" size="small" color="primary" >
                        Close
                    </Button>
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
                </div>    
                <CardContent>
                    <Container>
                        <Typography variant="h6" component="div" noWrap={false}>
                            PLEASE REVIEW THE TERMS OF YOUR PARTICIPATION BEFORE CONTINUING
                        </Typography>
                        <Typography variant="body1" component="div" noWrap={false}>
                            By clicking "I ACCEPT", you consent to SAVE.ai's collection and processing of your responses
                            for 3rd parties, including those specified in the disclosure.<br/><br/>
                            You also confirm your account details are valid. SAVE.ai reserves the right to
                            forfeit rewards for accounts deemed fraudulent<br/><br/>
                            Your participation in this survey will be kept anonymous.<br/><br/>
                        </Typography>
                        <Button variant="contained">I ACCEPT</Button> <Button variant="contained">I DECLINE</Button><br/><br/>
                    </Container>
                    <Button variant="contained" size="small" color="secondary">
                        PREVIOUS
                    </Button>
                    <Button variant="contained" size="small" color="primary">
                        Close
                    </Button>
                </CardContent>
            </Card>
        ]

        detailsCard.splice(0, detailsCard.length);
        detailsCard = [ ...detailsCard, ...newDetailsCardArray ]

        changeDetailsCard(newDetailsCardArray[0]) //Set first details card that appears on detailsOverlay render
        detailsOverlay.style.display= 'flex'; 
    }
    const changeDetailsCard = (card) => {
        setActiveDetailsCard( [card] );
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
                <Typography variant="h3" align="left">Welcome back survey</Typography>
                <Typography variant="h3" align="left">Progress: </Typography>
            </Container>
            <Container classes={{root: classes.bodyBox}}>
                {activeSurveyCard[0]} {/**Must use state here: When state updates, the update is pushed to all calls of that state*/}
            </Container>
        </div>
    );
}

export default withRouter(SurveyPage);
