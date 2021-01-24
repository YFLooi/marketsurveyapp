import React, { useRef } from "react";
import { makeStyles} from '@material-ui/core/styles';
import { 
    Button, Grid, Paper, Typography, Container, Box
} from "@material-ui/core";
import { styleObject } from "./MainPageStyleObject";
//For the social media icons 
import "./MainPage.css";
//For the menuBar 
import logo from "../logo.png";
import { GoogleSignIn } from "../GoogleSignIn/GoogleSignIn.js";
import chartIcon from "./icons/chart.jpg";
import checklistIcon from "./icons/checklist.jpg";
import meetingImage from "./icons/marketeerImage4.jpg";
import checklistImage from "./icons/respondantImage2.jpg";

const useStyles = makeStyles(theme => (styleObject));

export default function MainPage(props) {
  const classes = useStyles();
  const userFunnel = useRef(null);
  const contentBody = useRef(null);

  const toggleShowHide = (id) => {
    if(id == "userFunnel" && userFunnel.current.style.display == "none"){
      userFunnel.current.style.display = "flex"
    } else if(id == "userFunnel" && userFunnel.current.style.display == "flex") {
      userFunnel.current.style.display = "none"
    }
  }
  const scrollToContentBody = () => {
    contentBody.current.scrollIntoView({
      behavior: "smooth", 
      block: "start"
    });
  }
    
  return (
    <div className={classes.MainPage}>
      <div className={classes.menuBar}>
        <div className={classes.menuBarLeft} onClick={() => {props.history.push('/')}}>
          <img src={logo} className={classes.menuBarLogo} alt="logo" />
        </div>
        <div className={classes.menuBarRight}>
          <GoogleSignIn/>
        </div>
      </div>
        
      <Grid container spacing={0} justify="center" alignItems="center" classes={{root: classes.header}}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center"><b>Know your audience</b></Typography>
          <br/>
          <br/>
          <Typography variant="h4" align="center">SAVE.ai gets market data fast and at low cost</Typography>
          <br/>
          <Button variant="contained" classes={{root: classes.headerStartButton}} onClick={()=>{scrollToContentBody();}}>
            Get started
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" classes={{root: classes.headerStartButton}} onClick={()=>{toggleShowHide("userFunnel")}}>
            Already joined?
          </Button>
        </Grid>
      </Grid>
      
      <div id="userFunnel" ref={userFunnel} className={classes.userFunnel} style={{display: "none"}}>
        <div className={classes.userFunnel_background}></div>
        <div className={classes.userFunnel_closeButton} onClick={()=>{toggleShowHide("userFunnel");}}>
          Close X
        </div>
        <div className={classes.userFunnel_contentBody}>
          <div className={classes.userFunnel_contentBody_card}>
            <div className={classes.userFunnel_contentBody_cardImage} style={{backgroundImage: `url(${chartIcon})`}}/>
            <Typography variant="h5" align="center">Marketeers</Typography>
            <Typography variant="body1" align="center">Access survey feedback and campaign statistics</Typography>
            <Button variant="contained" color="primary" id="contentButtonLeft" onClick={() => {props.history.push('/MarketeerPage')}}>
              Access
            </Button>
          </div>
          <div className={classes.userFunnel_contentBody_card}>
            <div className={classes.userFunnel_contentBody_cardImage} style={{backgroundImage: `url(${checklistIcon})`}}/>
            <Typography variant="h5" align="center">Survey Respondents</Typography>
            <Typography variant="body1" align="center">Track your rewards and new surveys</Typography>
            <Button variant="contained" color="secondary" id="contentButtonLeft" onClick={() => {props.history.push('/RespondentPage')}}>
              Access
            </Button>
          </div>
        </div>
      </div>

      <div ref={contentBody}></div>
      <div className={classes.contentCard} style={{backgroundImage: `url(${meetingImage})`}}>
        <div className={classes.contentCard_body}>
          <Typography variant="h3" align="center">About our services</Typography>
          <br/>
          <Typography variant="body1" align="center">
            Gain real market insights fast from a curated panel of consumers
          </Typography>
          <br/>
          <Button variant="contained" color="primary" id="contentButtonLeft">
            More..
          </Button>
        </div>
      </div>
      <div className={classes.contentCard} style={{backgroundImage: `url(${checklistImage})`}}>
        <div className={classes.contentCard_body}>
          <Typography variant="h3" align="center" classes={{root: classes.contentCard_text}}>Participate and get paid</Typography>
          <br/>
          <Typography classes={{root: classes.contentCard_text}} variant="body1" align="center">
            Earn money and rewards for each completed survey  
          </Typography>
          <br/>
          <Button variant="contained" color="secondary" id="contentButtonRight">
            More..
          </Button>
        </div>
      </div>

      <div className={classes.mediaLinks}>
        <Typography variant="h3" align="center">
          Contact us today
        </Typography>     
        <br/>       
        <div className={classes.mediaLinks_mediaIcons}>
          <div className="fa fa-facebook"></div> 
          <div className="fa fa-linkedin"></div> 
          <div className="fa fa-envelope-o"></div>    
        </div>    
      </div>
    </div>
  );
}