import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width:90,
        cursor:"pointer"
    }
}));

//props available: data, questionResponse
function ClosingCard(props) {
    const classes = useStyles();
    
    return(
        <React.Fragment>
            <Typography variant="body1">Rewards earned: {props.data.responseText['resp_1']}</Typography>

            <form className={classes.root} noValidate autoComplete="off">
                
                {/*Need to set: onChange= props.handleResponse(name, value, questionType*/}
                <TextField label="Feedback" variant="outlined" name="" 
                value=""  />
                {/**Submit only at end to prevent double-counting from >1 submission per respondent*/}
                <Button variant="contained" color="primary" onClick={() => {props.handleSubmit()}}>Submit responses</Button>
            </form>
        </React.Fragment>
    )
}

export default ClosingCard;
