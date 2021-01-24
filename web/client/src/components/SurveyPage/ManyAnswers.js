import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Checkbox, Radio, FormControlLabel } from '@material-ui/core';


//props available: data, questionResponse
function SingleAnswer(props) {
    const questionData = props.data;
    const responseKeys = Object.keys(questionData.responseText)
    const responseValues = Object.values(questionData.responseText)
    
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <React.Fragment>
            {Array(responseKeys.length).fill().map(function(item, i) {
                let answerRecorded = false;
                const targetIndex = props.answersForSubmit[questionData.questionId].findIndex(item => item === responseKeys[i]);

                if(targetIndex !== -1){
                    answerRecorded = true;
                }
                return(
                    <FormControlLabel
                        label={responseValues[i]}
                        control={ 
                            <Checkbox
                                checked={answerRecorded}
                                onChange={() => {props.handleResponse(questionData.questionId, responseKeys[i], "manyAnsMultipleChoice")}}
                                name={`${questionData.questionId}`} //keep to organise. no actual use here
                                inputProps={{ 'aria-label': `${questionData.questionId}, question ${i}` }}
                                key={`${questionData.questionId}_${i}`}
                            />
                        }
                    />
                )
            })}
        </React.Fragment>
    );
}

export default SingleAnswer;
