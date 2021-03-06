import React, { Component, useState, useEffect } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import "./Carousel.css";
import { Grid, Container, Card, CardHeader, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from "@material-ui/core/";
import {
  //Allows us to connect to <Hashrouter/> from a child component
  withRouter
} from "react-router-dom";

import { makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    detailsOverlay:{
        position: "fixed",
        display: "none",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30, //Keep above chatbot icon
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)", /*Adds a shadow to denote the overlay area to click to exit*/
        
        /*Scolling `takes place in the overlay, NOT the <div> within the overlay*/
        overflowY:"scroll",
        webkitOverflowScrolling:"touch"
    },
    detailsCard:{
        width: '80%',
        padding: 10,
        minHeight: 210,

    },
    card: {
        margin: 5
    },
}));


//Do not attempt to style with Material UI's withStyle(). It weirds out handleOnSlideChange()
function CarouselRender (props) {    
    const classes = useStyles();

    let [renderData, setRenderData] = useState([]);
    let [galleryItems, setGalleryItems] = useState([]);
    let [slidesToShow, setSlidesToShow] = useState(1); //default to zero so that 1 slide does not suddenly become >1. Gives appearance of loading
    
    let detailsCard = []; //Temporary store for details card generated on clicking a Survey card
    let [activeDetailsCard, setActiveDetailsCard] = useState([])

    useEffect(() => {    
        //Runs on componentDidMount()
        setRenderData([...renderData, ...props.renderData]);
        
        //Identifies viewport size
        //Component is remounted each time the window is resized. That's why this works in detecting viewport size!
        window.addEventListener('resize', calcSlidesToShow);
        calcSlidesToShow();

        //Send data directly to rendering function. This skips delay from use of state for storage
        generateGalleryItems(props.renderData);
        
        return () => {      
            document.getElementsByClassName("CarouselPlaceholder")[0].style.display = "flex";  
            window.removeEventListener('resize', calcSlidesToShow);
        }; 
    }, []);
    const generateGalleryItems = (data) => {  //Every item to insert into slide
        //Array generated by this array constructor will have a length = data.length
        let itemsArray = Array(data.length).fill().map( (item, i) => 
            <Card classes={{root: classes.card}}>
                <CardActionArea>
                   
                </CardActionArea>
                <CardMedia
                    component="img"
                    alt={`survey card title`}
                    height="210"
                    src={data[i].coverImg}
                    classes= {{media: classes.cardImage}}
                />
                <CardContent>
                    <Typography variant="body1" component="h2" noWrap={false}>
                        <b>{data[i].title}</b>
                    </Typography>
                    <Typography variant="body1" component="div" noWrap={true}>
                        {data[i].issuer}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => {renderDetailsCard(data[i].surveyId);}}>
                        Details
                    </Button>
                </CardActions>
            </Card>
        )

        //For retrieval later to generate 'Details' overlay
        setGalleryItems([...itemsArray])
        console.log(itemsArray)
        document.getElementsByClassName("CarouselPlaceholder")[0].style.display = "none";
    }
    const calcSlidesToShow = () => {
        //Sets number of slides to display on carousel by screen size
        let slidesToShow = Math.round(window.innerWidth/210); //Need to round else cards partially shown
        console.log(`Slides to show: ${slidesToShow}`)
        console.log('New viewport dimensions: Width: '+window.innerWidth+' Height: '+ window.innerHeight)

        if (slidesToShow >1) {
            setSlidesToShow(slidesToShow);
            generateGalleryItems(props.renderData); //trigger Carousel re-render with new no. of slides to show
        } else {
            setSlidesToShow(1)   //Ensures at least 1 slide visible
            generateGalleryItems(props.renderData); //trigger Caorusel re-render with new no. of slides to show
        }
    }
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
                    <Button variant="contained" size="small" color="primary" onClick={() => {changeDetailsCard(detailsCard[1]);}}>
                        Start survey
                    </Button>
                    <Button variant="contained" size="small" color="primary" onClick={() => {hideDetailsCard();}}>
                        Close
                    </Button>
                    <Button onClick={() => {console.log(detailsCard)}}>chk detailsCard stored</Button>
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
                        <Button variant="contained" onClick={() => {props.history.push('/SurveyPage')}}>I ACCEPT</Button> <Button variant="contained">I DECLINE</Button><br/><br/>
                    </Container>
                    <Button variant="contained" size="small" color="secondary" onClick={() => {changeDetailsCard(detailsCard[0]);}}>
                        PREVIOUS
                    </Button>
                    <Button variant="contained" size="small" color="primary" onClick={() => {hideDetailsCard();}}>
                        Close
                    </Button>
                </CardContent>
            </Card>
        ]

        console.log(newDetailsCardArray);
        detailsCard.splice(0, detailsCard.length);
        detailsCard = [ ...detailsCard, ...newDetailsCardArray ]

        changeDetailsCard(newDetailsCardArray[0]) //Set first details card that appears on detailsOverlay render
        detailsOverlay.style.display= 'flex'; 
    }
    const changeDetailsCard = (card) => {
        setActiveDetailsCard( [card] );
    }
    const hideDetailsCard = () => {
        //Need to do this. Otherwise, buttons will be stuck on last state
        detailsCard.splice(0, detailsCard.length);
                
        //Should keep appended Details card. That way, there is no load time if 'Details' is clicked again
        document.getElementById(`detailsOverlay`).style.display = 'none';
    }
    return (
        <div className="CarouselRender"> 
            <div className="CarouselPlaceholder">
                <Typography variant="h6" align="center">Loading</Typography>
            </div>

            <div id='detailsOverlay' className={classes.detailsOverlay}>
                {activeDetailsCard[0]} {/**Must use state here: When state updates, the update is pushed to all calls of that state*/}
            </div>
            {/**Must limit dimensions of parent div to prevent Carousel from 
             * stretching to infinity
            */}
            <div className="CarouselBody">
                <Carousel 
                    slides={galleryItems}
                    arrows
                    dots
                    clickToChange={false}
                    slidesPerPage={slidesToShow}
                    centered //Shows a bit of next slide
                    infinite//Scrolling to end scrolls back to 1st slide
                    breakpoints={{ //customise response over different page size
                        400: { //Hides selection arrows when screen width <700px
                            arrows: false,
                            slidesPerPage: 2
                        },
                    }}
                />
            </div>
        </div> 
    ) 
}

export default withRouter(CarouselRender);