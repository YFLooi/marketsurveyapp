import React, { Component, useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "./Carousel.css";
import "react-alice-carousel/lib/alice-carousel.css";
import { Grid, Card, CardHeader, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from "@material-ui/core/";

import { makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    example: {
        display: "none"
    },
}));


/** 
<Grid item key={`survey card ${i}`} onDragStart={handleOnDragStart}>
 <Card classes={{root: classes.card}}>
     <CardActionArea>
         <CardMedia
             component="img"
             alt={`survey card title`}
             height="210"
             src={data.coverImg}
             classes= {{media: classes.cardImage}}
             onClick={() => {props.renderDetailsCard(data.surveyId);}}
         />
         <CardContent>
             <Typography variant="body1" component="h2" noWrap={false}>
                 <b>{data.title}</b>
             </Typography>
             <Typography variant="body1" component="div" noWrap={true}>
                 {data.issuer}
             </Typography>
         </CardContent>
     </CardActionArea>
     <CardActions>
         <Button size="small" color="primary" onClick={() => {props.renderDetailsCard(data.surveyId);}}>
             Details
         </Button>
     </CardActions>
 </Card>
</Grid>
*/

//Do not attempt to style with Material UI's withStyle(). It weirds out handleOnSlideChange()
class Carousel extends Component {
    constructor(props){
        super(props);

        this.state ={
            currentIndex: 0,
            itemsInSlide: 1,
            responsive: { 0: { items: 2 }}, //Number of cards shown per section
            galleryItems: [],
            targetBookId: null,
        }

        this.galleryItems = this.galleryItems.bind(this);
        this.slidePrevPage = this.slidePrevPage.bind(this);
        this.slideNextPage = this.slideNextPage.bind(this);
        this.handleOnSlideChange = this.handleOnSlideChange.bind(this);
        this.handleOnDragStart = this.handleOnDragStart.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount(){
        if(this.props.renderData.length > 0){
            //Send data directly to rendering function. This skips use of state for storage
            this.galleryItems(this.props.renderData);
        }else{
            console.log("Render failed: Book data not found")
        }

        //Identifies viewport size
        //Component is remounted each time the window is resized. That's why this works in detecting viewport size!
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    }
    componentWillUnmount() {
        //Each time the window is resized, the DOM is re-rendered. This ensures event listeners do NOT stack up
        window.removeEventListener('resize', this.updateWindowDimensions);

        document.getElementsByClassName("carouselPlaceholder")[0].style.display = "block";
    }
    updateWindowDimensions() {
        //Sets number of items to display on carousel by screen size
        let cardsToShow = Math.round(window.innerWidth/210); //Need to round else cards partially shown
        this.setState({ 
            responsive: { 0: { items: cardsToShow }}
        });
        console.log('New viewport dimensions: Width: '+window.innerWidth+' Height: '+ window.innerHeight)
    }
    galleryItems(data) {  //Every item to insert into slide
        let newArrivalsArray = Array(data.length).fill().map((item, i) => 
            <div className='card' onDragStart={this.handleOnDragStart}>
                {data.surveyId}<br/>
                {data.title}<br/>
                {data.issuer}<br/>
                {data.dateIssued}<br/>
            </div>
        )

        //For retrieval later to generate 'Details' overlay
        this.setState({
            galleryItems: [...newArrivalsArray]
        })
        document.getElementsByClassName("carouselPlaceholder")[0].style.display = "none";
    }
    slidePrevPage = () => {
        const currentIndex = this.state.currentIndex - this.state.itemsInSlide
        this.setState({ currentIndex })
    }
    slideNextPage = () => {
        const { itemsInSlide, galleryItems: { length }} = this.state
        let currentIndex = this.state.currentIndex + itemsInSlide
        if (currentIndex > length) currentIndex = length

        this.setState({ currentIndex })
    }
    handleOnSlideChange = (event) => {
        const { itemsInSlide, item } = event
        this.setState({ itemsInSlide, currentIndex: item })
    }
    //Handles drag event independently to avoid odd behaviour
    handleOnDragStart = (e)=> {
        e.preventDefault()
    }   
    
    render() {
        const { currentIndex, galleryItems, responsive } = this.state
        
        return (
            <div className="carousel"> 
                <div className="carouselPlaceholder"><Typography variant="h6" color="inherit">Loading</Typography></div>    
                    {/*Using divs as button provider better customisation
                    <div className="prevButtonContainer" onClick={this.slidePrevPage}></div>
                    <div className="carouselBody">
                        <AliceCarousel
                            items={galleryItems}
                            slideToIndex={currentIndex}
                            responsive={responsive}
                            onInitialized={this.handleOnSlideChange}
                            onSlideChanged={this.handleOnSlideChange}
                            onResized={this.handleOnSlideChange}
                            buttonsDisabled = {true}
                            mouseDragEnabled = {true}
                            keysControlDisabled = {true}
                        />
                    
                    <div className="nextButtonContainer" onClick={this.slideNextPage}></div>
                    </div>
                    */}

                    <AliceCarousel mouseTrackingEnabled items={galleryItems}></AliceCarousel>
                
                <div className="carouselDivider"></div>
            </div> 
        ) 
    }
}

export default Carousel;