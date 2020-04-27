import React from "react";
import { makeStyles} from '@material-ui/core/styles';
import { 
    Button, Grid, Paper, Typography, Container
} from "@material-ui/core";
import contentBodyLeftBackground from "./icons/marketeerImage4.jpg"
import contentBodyRightBackground from "./icons/respondantImage2.jpg"

const useStyles = makeStyles(theme => ({ 
    MainPage: {
        minHeight: "100%",
        width: "100%",
        flexGrow: 1
    },
    header: {
        textAlign: "center",
        maxHeight: 100
    },
    contentBodyLeft: {
        minHeight: 210,
        transitionDuration: "0.4s",

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
        backgroundSize: "150%",
        overflowX: "hidden",
        overflowY: "hidden",
    },
    contentBodyLeftContent: {
        height: "90%",
        width: "90%",
        margin: "0 0", /**Container will attempt to horizontally center itself using margins*/
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        minHeight: 210,
        transitionDuration: "0.4s",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        
        backgroundImage: `url(${contentBodyRightBackground})`,
        backgroundPositionX: "50%",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        backgroundSize: "230%",
        overflowX: "hidden",
        overflowY: "hidden",
    },
    contentBodyRightContent: {
        height: "90%",
        width: "90%",
        margin: "0 0", /**Container will attempt to horizontally center itself using margins*/

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        width: "100%",
        maxHeight: 100
    }
}))

function MainPage() {
    const classes = useStyles();
   
    return (
        <div className={classes.MainPage}>
            <Grid container spacing={0} className="contentHeader">
                <Grid item xs={12}>
                    <Container>
                        <Typography variant="h3" align="center">Know your audience</Typography>
                        <br/>
                        <Typography variant="h5" align="center">SAVE.ai gets market data fast and at low cost</Typography>
                    </Container>
                </Grid>
            </Grid>
            <Grid container spacing={0} className="contentBody">
                <Grid item xs={12} sm={6} classes={{root: classes.contentBodyLeft}}>
                    {/**Items with Grid-item should be wrapped in Container*/}
                    <Container classes={{root: classes.contentBodyLeftContent}}>
                        <div>About our services</div>
                        <div>Gain real market insights fast from a curated panel</div>
                        <br/>
                        <Button variant="contained" color="primary" id="contentButtonLeft">
                            More..
                        </Button>
                    </Container>
                </Grid>
                <Grid container xs={12} sm={6} classes={{root: classes.contentBodyRight}} >
                    <Container classes={{root: classes.contentBodyRightContent}}>
                        <div>Participate and earn</div>
                        <div>We pay survey participants and more!</div>
                        <br/>
                        <Button variant="contained" color="secondary" id="contentButtonRight">
                            More..
                        </Button>
                    </Container>
                </Grid>
            </Grid>
            <Grid container spacing={0} className="contentMedia">
                <Grid item xs={12}>
                    Follow us on: YT LN @Email
                </Grid>
            </Grid>
            
            
        </div>
    );
}

export { MainPage };
