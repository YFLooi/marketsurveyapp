import React from "react";
import {
    //Allows us to connect to <Hashrouter/> from a child component
    withRouter
  } from "react-router-dom";
import { makeStyles} from '@material-ui/core/styles';
import { 
    Box, 
    Button,
    Grid,
} from "@material-ui/core";
const useStyles = makeStyles(theme => ({ 
    messageBody: {
        display: "flex",
        width: "100%",
        height: "70vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
}))

function ErrorPage(props) {
    const classes = useStyles();
   
    return (
        <React.Fragment>
            <div className={classes.messageBody}>
                <div>!4-oh-4!</div>
                <div>No page exists at this address</div>
                <div onClick={() => {props.history.push('/')}}><u style={{color: "blue", cursor:"pointer"}}>Return to HomePage</u></div>
            </div>
        </React.Fragment>
    );
}

export default withRouter(ErrorPage);
