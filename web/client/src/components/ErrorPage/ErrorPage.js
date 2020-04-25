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
    header: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
}))

function ErrorPage(props) {
    const classes = useStyles();
   
    return (
        <React.Fragment>
            <div>!4-oh-4!</div>
            <div>No page exists at this address</div>
            <div onClick={() => {props.history.push('/')}}><u style={{color: "blue", cursor:"pointer"}}>Return to HomePage</u></div>
        </React.Fragment>
    );
}

export default withRouter(ErrorPage);
