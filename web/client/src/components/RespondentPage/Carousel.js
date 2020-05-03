import React, { Component, useState, useEffect } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
//import "./Carousel.css";
import { Grid, Card, CardHeader, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from "@material-ui/core/";

import { makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    example: {
        display: "none"
    },
}));

//Do not attempt to style with Material UI's withStyle(). It weirds out handleOnSlideChange()
function CarouselRender (props) {    
    const classes = useStyles();

    const [renderData, setRenderData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsInSlide, setItemsInSlide] = useState(1);
    const [responsive, setResponsive] = useState({ 0: { items: 2 }}); //Property value = window.innerWidth
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {    
        //Runs on componentDidMount()
        setRenderData([...renderData, ...props.renderData]);
        
        //Send data directly to rendering function. This skips delay from use of state for storage
        generateGalleryItems(props.renderData);

        //Identifies viewport size
        //Component is remounted each time the window is resized. That's why this works in detecting viewport size!
        window.addEventListener('resize', updateWindowDimensions);
        updateWindowDimensions();
        
        return () => {      
            document.getElementsByClassName("CarouselPlaceholder")[0].style.display = "flex";  
        }; 
    }, []);
    const generateGalleryItems = (data) => {  //Every item to insert into slide
        //Array generated by this array constructor will have a length = data.length
        let itemsArray = Array(data.length).fill().map((item, i) => 
            <Grid item key={`survey card ${i}`}>
                <Card classes={{root: classes.card}}>
                    <CardActionArea>
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
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Details
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )

        //For retrieval later to generate 'Details' overlay
        setGalleryItems([...itemsArray])
        document.getElementsByClassName("CarouselPlaceholder")[0].style.display = "none";
    }
    const updateWindowDimensions = () => {
        //Sets number of items to display on carousel by screen size
        let cardsToShow = Math.round(window.innerWidth/210); //Need to round else cards partially shown
        setResponsive({ responsive: { 0: { items: cardsToShow }} });
        console.log('New viewport dimensions: Width: '+window.innerWidth+' Height: '+ window.innerHeight)
    }
    return (
        <div className="Carousel"> 
            <div className="CarouselPlaceholder">
                <Typography variant="h6" align="center">Loading</Typography>
            </div>

         
            <div className="CarouselBody" style={{maxWidth:"80vw", maxHeight:"100%"}}>
                <Carousel 
                    slides={galleryItems}
                    arrows
                    clickToChange
                    slidesPerPage={2}
                    centered //Shows a bit of next slide
                    infinite //Scrolling to end scrolls back to 1st slide
                />     
            </div>
        </div> 
    ) 
}

export default CarouselRender;