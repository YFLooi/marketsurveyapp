import React from "react";
import {
    //Allows us to connect to <Hashrouter/> from a child component
    withRouter
  } from "react-router-dom";
import logo from "./icons/logo.png";
import { makeStyles} from '@material-ui/core/styles';
import { GoogleSignIn } from "../GoogleSignIn/GoogleSignIn.js";

const useStyles = makeStyles(theme => ({ 
    AppHeader: {
        width: "100%",    
        maxHeight: 60,
        background: "linear-gradient(to left, #00b7ff, #87d7f7)",
        display: "flex",
        justifyContent: "center",
        padding: 10
    },
    AppLogo: {
        width:90,
        cursor:"pointer"
    },
    /*left and right leaves extra space*/
    AppHeaderLeft: {
        width: "70%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    AppHeaderRight: {
        width: "30%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
}))

function AppHeader(props) {
    const classes = useStyles();
   
    return (
        <React.Fragment>
            <div className={classes.AppHeader}>
                <div className={classes.AppHeaderLeft} onClick={() => {props.history.push('/')}}>
                    <img src={logo} className={classes.AppLogo  } alt="logo" />
                    <span>Market Intelligence</span>
                </div>
                <div className={classes.AppHeaderRight}>
                    <GoogleSignIn/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withRouter(AppHeader);
