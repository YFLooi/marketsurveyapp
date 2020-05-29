import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
    thumb: { //For the dot that is dragged
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
    },
    mark: { //For the lines denoting the scale values
        backgroundColor: 'gray',
        height: 10,
        width: 3,
        marginTop: -3,
    }
}));

//Labels points on scale and value returned when on said point
const marks = [
    {
        value: 1,
        label: '1',
      },
      {
        value: 2,
        label: '2',
      },
      {
        value: 3,
        label: '3',
      },
      {
        value: 4,
        label: '4',
      },
      {
        value: 5,
        label: '5',
      }
];

//Used to check if this card was rendered before
let firstRender = true;
let recordedValuesCopy = {};

//Sets value in pop-up balloon
function valuetext(value) {
    return `${value}`;
}  

//props available: data, questionResponse
function RateScale(props) {
    const classes = useStyles(); 

    const questionData = props.data;
    const responseKeys = Object.keys(questionData.responseText)
    const responseValues = Object.values(questionData.responseText)

    let newValue = ""; //Using hook state causes error "setX is not a function"
    
    let [ recordedValues, setRecordedValues ] = useState(param => {
        //Should generate its own. hook state is read by Slider before useEffect
        //can kick in
        if(firstRender === true){
            let newObj = {};
            for (let i=0; i<responseKeys.length; i++){
                newObj[responseKeys[i]] = 3; //Sets default slider value on page load
            }

            recordedValuesCopy = newObj;
            return newObj;
        } else {
            return recordedValuesCopy
        }
    });

    useEffect(() => {      
        //Generates initial ranking 
        //Allows for the rare exception where the preset ranking = respondent's answer
        //If{} catch prevents overwrite of recorded answers when moving back and forth between questionCards
        console.log(`First render: ${firstRender}`);
        if(firstRender === true){
            //Sets answersForSubmit to contain the initial ranking
            props.handleResponse(questionData.questionId, recordedValues, "rankOrder");

            //Sets firstRender to false after this if{} is run
            firstRender = !firstRender;
        }
    }, []);

    const handleChangeValue = (event, receivedValue) => {
        console.log(`New value received: ${receivedValue}`)
        newValue = receivedValue
    }
    const handleChangeCommit = (name) => {
        console.log(`Request made to commit new value for ${name}`)
        console.log(`Value to commit: ${newValue}`)

        setRecordedValues(value => ({
            ...value,
            [name]: newValue
        }));

        //Must do this instead of get from hook state. Otherwise,
        //value passed to handleResponse is the one before update by setRecordedValues
        recordedValuesCopy[name] = newValue
        //Sets answersForSubmit to new ranking
        props.handleResponse(props.data.questionId, recordedValuesCopy, "rankOrder");
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <React.Fragment>
            {Array(responseKeys.length).fill().map(function(item, i) {
                return(
                    <div className={classes.root} key={`${questionData.questionId}_${responseKeys[i]}`}>
                        <Typography id="discrete-slider-always" gutterBottom>
                            {responseValues[i]}
                        </Typography>
                        <Slider
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-always"
                            step={1}
                            valueLabelDisplay="auto" //The bubble that pops up to show the current value on hover
                            marks={marks}
                            min={1} //If min-max not set, default is 1-100
                            max={5}
                            classes ={{thumb: classes.thumb, mark: classes.mark}}
                            onChange={handleChangeValue}
                            onChangeCommitted={changeEvent => {
                                //This mod removes default "event" and "value" returned
                                //to instead return the name of this slider
                                //The only defect is the slider will only respond onMouseUp
                                handleChangeCommit(responseKeys[i]);
                            }}
                            value={recordedValues[responseKeys[i]]}
                            name={responseKeys[i]}
                        />
                    </div>
            )
            })}
           
            <button onClick={() => {console.log(recordedValues)}}>Chk value store object</button>
            <button onClick={() => {console.log(recordedValuesCopy)}}>Chk recordedValuesCopy</button>
        </React.Fragment>
    );
}

export default RateScale;
