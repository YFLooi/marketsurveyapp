import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/';
import "./ProgressBar.css";

//sauce: https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f
const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
    },
    indication: {
        position: "absolute",
        left: "47.5%",
        top: "15%",
    }
}));

//props available: data, questionResponse
function ProgressBar(props) {
    const classes = useStyles(); 
    const [ percentage, setPercentage ] = useState(0);

    useEffect(() => {    
        const activeQuestionCardId = props.activeQuestionCardId;
        const numberOfQuestions = props.questions.length;
        
        //Triggers each time a new questionCard is rendered
        //1st active questions card  is zero. Hence, if there are 10 cards,
        //activeQuestionCardId ranges from 0 to 9. 
        //Thus, to get 100% (10 out of 10), must add in a "closing" card
        setPercentage(property => {
            return Math.round(activeQuestionCardId*100 /numberOfQuestions);
        }); 

    }, [props.activeQuestionCardId]);

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <div className="progress-bar">
            <Typography variant="body1" align="center" classes={{ root: classes.indication }}>
                {`${percentage}%`}
            </Typography>
            <div className="filler" style={{ width:`${percentage}%`}}></div>
        </div>
    );
}

export default ProgressBar;
