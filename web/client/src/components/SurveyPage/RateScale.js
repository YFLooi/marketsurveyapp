import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
    },
    
}));

//Labels points on scale and value returned when on said point
const marks = [
    {
        value: 1,
        label: '1',
        index: "index1"
      },
      {
        value: 2,
        label: '2',
        index: "index2"
      },
      {
        value: 3,
        label: '3',
        index: "index3"
      },
      {
        value: 4,
        label: '4',
        index: "index4"
      },
      {
        value: 5,
        label: '5',
        index: "index5"
      }
];

//Returns newly-selected value at slider position
function valuetext(value, index) {
    console.log(`index supplied: ${index}`)
    return `${value}`;
}  

//props available: data, questionResponse
function RateScale(props) {
    const questionData = props.data;
    const responseKeys = Object.keys(questionData.responseText)
    const responseValues = Object.values(questionData.responseText)

    let [ sourceName, setSourceName] = useState("");
    let [ rating, setRating ] = useState(param => {
        let newObj = {};
        for (let i=0; i<responseKeys.length; i++){
            newObj[responseKeys[i]] = "3"; //Sets default slider rating on page load
        }

        return newObj;
    });
    
    const classes = useStyles(); 
    
    useEffect(() => {  
        
        
        /*
        const questionData = props.data;
        const responseKeys = Object.keys(questionData.responseText);
        const responseValues = Object.values(questionData.responseText);
        const dragNDropData = Array(responseKeys.length).fill().map(
            function(item, i) {
                return {
                    id: responseKeys[i],
                    content: responseValues[i]
                }
        })
        
        //Generates initial ranking 
        //Allows for the rare exception where the preset ranking = respondent's answer
        let initialRanking = {};
        for(let i=0; i<responseKeys.length; i++){
            initialRanking[`rank_${i}`] = responseKeys[i]
        };
        //Sets answersForSubmit to contain the initial ranking
        props.handleResponse(questionData.questionId, initialRanking, "rankOrder");

        setItems([ ...dragNDropData ])
        */
    }, []);

    const recordSourceName = (name) => {
        setSourceName(name);
    }
    const handleChange = (name) => { //"event" tends to bug out to "undefined" 
        console.log(`Rating change received from ${name}`);
        
        const ratingRecorded = document.getElementsByName(name)[0].value
        console.log(`New rating: ${ratingRecorded}`);
        
        let newRatingsToAnswers = rating;
        newRatingsToAnswers[name] = ratingRecorded;
        
        setRating(rating => ({
            ...rating,
            [name]: ratingRecorded
        }));

        //Sets answersForSubmit to new ranking
        props.handleResponse(props.data.questionId, newRatingsToAnswers, "rateScale");
    }
    
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <React.Fragment>
            {Array(responseKeys.length).fill().map(function(item, i) {
                return(
                    <div className={classes.root} key={`${questionData.questionId}_${responseKeys[i]}`} onMouseDown={() => {recordSourceName(responseKeys[i])}}>
                        <Typography id="discrete-slider-always" gutterBottom>
                            {responseValues[i]}
                        </Typography>
                        <input 
                            type="range" name={responseKeys[i]} min="1" max="5"
                            value={rating[responseKeys[i]]}
                            onChange={() => {handleChange(responseKeys[i])}}
                        ></input>
                    </div>
            )
            })}
           
            <button onClick={() => {console.log(rating)}}>Chk Ratings stored object</button>
        </React.Fragment>
    );
}

export default RateScale;
