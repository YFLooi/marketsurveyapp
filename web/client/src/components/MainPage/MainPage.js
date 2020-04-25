import React from "react";
import { makeStyles} from '@material-ui/core/styles';
import { 
    Box, 
    Button,
    Grid,
} from "@material-ui/core";
const useStyles = makeStyles(theme => ({ 
    header: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    contentBody: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap" 
    },
    contentBodyLeft: {
        minWidth: "50%",
        display: "flex",
        height: 200,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    contentBodyRight: {
        minWidth: "50%",
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}))

function MainPage() {
    const classes = useStyles();
   
    return (
        <div className="MainPage">
            <div className={classes.header}>
                <div className="headerText">Know your audience</div>
                <br/> {/**<br style={{clear:"both"}}/> */}
                <div className="headerSubtext">SAVE.ai gets market data fast and at low cost</div>
            </div>
            <div className={classes.contentBody}>
                <div className={classes.contentBodyLeft}>
                    <div>About our services</div>
                    <div>Gain real market insights fast from a curated panel</div>
                </div>
                <div className={classes.contentBodyRight}>
                    <div>Participate and earn</div>
                    <div>We pay survey participants and more!</div>
                </div>
            </div>
        </div>
    );
}

export { MainPage };
