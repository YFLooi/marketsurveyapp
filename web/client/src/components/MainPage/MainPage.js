import React from "react";
import { makeStyles} from '@material-ui/core/styles';
import { 
    Button, Grid, Paper, Typography, Container, Box
} from "@material-ui/core";
import contentHeaderBackground from "./icons/header5.jpg";
import contentBodyLeftBackground from "./icons/marketeerImage4.jpg";
import contentBodyRightBackground from "./icons/respondantImage2.jpg";
import "./MainPage.css";

const useStyles = makeStyles(theme => ({ 
    MainPage: {
        minHeight: "100%",
        width: "100%",
        display: "flex", /**Allows children to use flex-grow to fill white space */
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    header: {
        textAlign: "center",
        minHeight: "95vh",
        color: "white",
        padding: 5,
        flex: "1 1 auto", /**Header allowed 1/4 of all available height */

        backgroundImage: `url(${contentHeaderBackground})`,
        backgroundPositionX: "50%",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        backgroundSize: "360%",
        overflowX: "hidden",
        overflowY: "hidden"
    },
    headerStartButton: {
        background: "linear-gradient(to left, #87d7f7, #00b7ff)"
    },
    contentBox: {
        minHeight: "100vh",
        minWidth: "100%",
        flex: "3 3 auto", /**Content box allowed 3/4 of all available height */
        margin: "0 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 10,
        paddingBottom: 10
    },
    contentBody: {
        backgroundColor: "gray",
        width: "100%",
        maxHeight: "30%",
        flex: "2 2 60%",

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    },
    contentBodyLeft: {
        minHeight: 190,
        transitionDuration: "0.4s",
        margin: 10,
        flex: "1 1 auto",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "middle",
        
        backgroundImage: `url(${contentBodyLeftBackground})`,
        backgroundPositionX: "50%",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        backgroundSize: "230%",
        overflowX: "hidden",
        overflowY: "hidden",
    },
    contentBodyLeftContent: {
        height: "85%",
        width: "85%",
        margin: "0 0", /**Container will attempt to horizontally center itself using margins*/
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        textAlign: "center",

        border: "4px solid white",
        padding: 10,
        color: "white",
        backgroundColor: "rgba(0,0,0, 0.4)", /* Black w/opacity/see-through */
        "&:hover": {
            backgroundColor: "rgba(0,0,0, 0.6)", /* Black w/opacity/see-through */
        }
    },
    contentBodyRight: {
        minHeight: 190,
        transitionDuration: "0.4s",
        margin: 10,
        flex: "1 1 auto",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        
        backgroundImage: `url(${contentBodyRightBackground})`,
        backgroundPositionX: "45%",
        backgroundPositionY: "35%",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        backgroundSize: "300%",
        overflowX: "hidden",
        overflowY: "hidden",
    },
    contentBodyRightContent: {
        height: "85%",
        width: "85%",
        margin: "0 0", /**Container will attempt to horizontally center itself using margins*/

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        textAlign: "middle",

        border: "4px solid white",
        padding: 10,
        color: "white",
        backgroundColor: "rgba(0,0,0, 0.4)", /* Black w/opacity/see-through */
        "&:hover": {
            backgroundColor: "rgba(0,0,0, 0.6)", /* Black w/opacity/see-through */
        }
    },
    mediaLinks: {
        flex: "1 1 auto",
        width: "100%",
        maxHeight: "50%",
        margin: 10,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }
}))

function MainPage() {
    const classes = useStyles();
   
    return (
        <div className={classes.MainPage}>
            <Grid container spacing={0} justify="center" alignItems="center" classes={{root: classes.header}}>
                <Grid item xs={12}>
                    <Typography variant="h2" align="center"><b>Know your audience</b></Typography>
                    <br/>
                    <br/>
                    <Typography variant="h4" align="center">SAVE.ai gets market data fast and at low cost</Typography>
                    <br/>
                    <Button variant="contained" classes={{root: classes.headerStartButton}}>
                        Get started >
                    </Button>
                </Grid>
            </Grid>
            <Container classes={{root: classes.contentBox}}>
                <Grid container spacing={0} classes={{root: classes.contentBody}}>
                    {/**Note: Use of Grid prevents left and right contentBodies from beign equal width */}
                    <Grid item xs={12} sm={6} md={6} classes={{root: classes.contentBodyLeft}}>
                        {/**Items with Grid-item should be wrapped in Container*/}
                        <Container classes={{root: classes.contentBodyLeftContent}}>
                            <Typography variant="h5" align="center">About our services</Typography>
                            <Typography variant="body1" align="center">Gain real market insights fast from a curated panel</Typography>
                            <Button variant="contained" color="primary" id="contentButtonLeft">
                                More..
                            </Button>
                        </Container>
                    </Grid>
                
                    <Grid item xs={12} sm={6} md={6} classes={{root: classes.contentBodyRight}}>
                        {/**Items with Grid-item should be wrapped in Container*/}
                        <Container classes={{root: classes.contentBodyRightContent}}>
                            <Typography variant="h5" align="center">Participate and get paid</Typography>
                            <Typography variant="body1" align="center">We reward survey participants!</Typography>
                            <Button variant="contained" color="secondary" id="contentButtonRight">
                                More..
                            </Button>
                        </Container>
                    </Grid>
                </Grid>
                <Grid container spacing={0} classes={{root: classes.mediaLinks}}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">
                            Contact us today: <br/>
                            <a href="#" className="fa fa-facebook"></a> 
                            <a href="#" className="fa fa-linkedin"></a> 
                            <a href="#" className="fa fa-envelope-o"></a>
                        </Typography>                    
                    </Grid>
                </Grid>
            </Container>
            
            
        </div>
    );
}

export { MainPage };
