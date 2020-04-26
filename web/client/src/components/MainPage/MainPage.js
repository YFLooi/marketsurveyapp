import React from "react";
import { makeStyles} from '@material-ui/core/styles';
import { 
    Button
} from "@material-ui/core";
import contentBodyLeftBackground from "./icons/marketeerImage4.jpg"
import contentBodyRightBackground from "./icons/respondantImage2.jpg"

const useStyles = makeStyles(theme => ({ 
    MainPage: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    header: {
        display: "flex",
        width: "100%",
        minheight: "20%",
        flexDirection: "column",
        alignItems: "center"
    },
    contentBody: {
        minheight: "60%",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap" 
    },
    contentBodyLeft: {
        minWidth: 360,
        maxWidth: "50%",
        minHeight: 360,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transitionDuration: "0.4s",
        border: "2px solid white",

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        border: "4px solid white",
        padding: 10,
        color: "white",
        height: 250,
        width: 280,
        backgroundColor: "rgba(0,0,0, 0.4)", /* Black w/opacity/see-through */
        "&:hover": {
            backgroundColor: "rgba(0,0,0, 0.6)", /* Black w/opacity/see-through */
        }
    },
    contentBodyRight: {
        minWidth: 360,
        maxWidth: "50%",
        minHeight: 360,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transitionDuration: "0.4s",
        border: "2px solid white",

        backgroundImage: `url(${contentBodyRightBackground})`,
        backgroundPositionX: "50%",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        backgroundSize: "180%",
        overflowX: "hidden",
        overflowY: "hidden",
    },
    contentBodyRightContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        border: "4px solid white",
        padding: 10,
        color: "white",
        height: 250,
        width: 280,
        backgroundColor: "rgba(0,0,0, 0.4)", /* Black w/opacity/see-through */
        "&:hover": {
            backgroundColor: "rgba(0,0,0, 0.6)", /* Black w/opacity/see-through */
        }
    },
    mediaLinks: {
        minheight: "20%",
        width: "100%"
    }
}))

function MainPage() {
    const classes = useStyles();
   
    return (
        <div className={classes.MainPage}>
            <div className={classes.header}>
                <div className="headerText">Know your audience</div>
                <br/> {/**<br style={{clear:"both"}}/> */}
                <div className="headerSubtext">SAVE.ai gets market data fast and at low cost</div>
            </div>
            <div className={classes.contentBody}>
                <div className={classes.contentBodyLeft}>
                    <div className={classes.contentBodyLeftContent}>
                        <div>About our services</div>
                        <div>Gain real market insights fast from a curated panel</div>
                        <br/>
                        <Button variant="contained" colour="primary" id="contentButtonLeft">
                            More..
                        </Button>
                    </div>
                </div>
                <div className={classes.contentBodyRight}>
                    <div className={classes.contentBodyRightContent}>
                        <div>Participate and earn</div>
                        <div>We pay survey participants and more!</div>
                        <br/>
                        <Button variant="contained" colour="secondary" id="contentButtonRight">
                            More..
                        </Button>
                    </div>
                </div>
            </div>
            <div className={classes.mediaLinks}>
                <div>
                    Follow us on: YT LN @Email
                </div>
            </div>
            
        </div>
    );
}

export { MainPage };
