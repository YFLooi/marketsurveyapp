import React, { useState, useEffect } from "react";
import {
    //Allows us to connect to <Hashrouter/> from a child component
    withRouter
} from "react-router-dom";
import { GoogleSignIn } from "../GoogleSignIn/GoogleSignIn.js";

import { makeStyles} from '@material-ui/core/styles';
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { RadioGroup, Radio, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, IconButton } from "@material-ui/core";
import { Card, CardHeader, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core/";
//Material UI icon imports
import { Menu, Home, Settings, AccountBox, ShoppingCart, Explore, FavoriteOutlined } from '@material-ui/icons';

import logo from "../logo.png";

const questions = [
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question0",
        questionType:"trueFalse", 
        questionText:"Do you know Nestle?", 
        responseCounter:{ true: 10, false: 5 } 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question1",
        questionType:"trueFalse", 
        questionText:"Do you know KitKat?", 
        responseCounter:{ true: 5, false: 10 }
    },
    {   
        originSurveyId: "survey1",
        questionId: "survey1_question2",
        questionType:"oneAnsMultipleChoice", 
        questionText:"Which age group are you in?", 
        responseText: { resp_0: "10-18", resp_1: "19-30", resp_2: "31-50", resp_3: "50+" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0 } 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question3",
        questionType:"manyAnsMultipleChoice", 
        questionText:"Which of the following flavours sound tasty to you?", 
        responseText: { resp_0: "Adzuki", resp_1: "Exotic Tokyo", resp_2: "Golden Citrus", resp_3: "Kobe Pudding", resp_4: "Passion Fruit", resp_5: "Soy Sauce", resp_6: "Wasabi" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0, resp_4: 0, resp_5: 0, resp_6: 0 } 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question4",
        questionType:"rankOrder", 
        questionText:"Rank the following", response:"" 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question5",
        questionType:"rateScale", 
        questionText:"Rate how appealing these flavours sound to you", response:"" },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question6",
        questionType:"fivePoint", 
        questionText:"How much more would you pay for a premium, $100 product?", response:"" },
] 

//The MaterialUI way of modding styles
const useStyles = makeStyles(theme => ({
    menuBar: {
        width: "100%",    
        maxHeight: 65,
        background: "linear-gradient(to left, #00b7ff, #87d7f7)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 10px"
    },
    menuBarLogo: {
        width:90,
        cursor:"pointer"
    },
    /*left and right leaves extra space*/
    menuBarLeft: {
        minWidth: "50%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20
    },
    menuList: {  //For Drawer
        minWidth: 250,
        zIndex: 2,
    },
    drawerButton: {
        width: 48,
        height: 48,

    },
    menuBarRight: {
        minWidth: "30%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 20
    },
    header: {
        minHeight: 70
    },
    bodyBox: {
        minHeight: "40vh",
        display: "flex",
    },
    body: {
        flex: "2 2 auto",
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

function SurveyPage(props) {
    const classes = useStyles();

    useEffect(() => {    
        //Renders questions to display on component mount
        questionCardGenerator(questions[0], 0); 

        return () => {      
            //Do this mutably to wipe clean. Otherwise, reopening the same survey
            //may cause previous answers to reappear
            setAnswers([])
        }; 
    }, []);

    //state that is pushed to DOM
    let [ activeQuestionCard, setActiveQuestionCard ] = useState([]);
    //Stores element number of current activeQuestionCard
    let [ activeQuestionCardId, setActiveQuestionCardId ] = useState(0);
    //Allows reponses to persist after moving to next question. Erased on exiting survey
    let [answers, setAnswers] = useState(Array(questions.length).fill().map((item, i) => {
        return { 
            questionId: `${questions[i].questionId}`,
            answer: ""
        }
    }))
    
    /**
     * Assigns selected answer to storage in state
     * @param {*} event 
     * @param {*} questionId 
     */
    const handleResponse = (event) => {
        event.preventDefault();    

        if (event.target.name === "manyAnsMultipleChoice"){
            let regexQuestionId = /survey\d_question\d/;
            let questionId = (event.target.name).match(regexQuestionId); 
            console.log(`regex returns ${questionId}`);
    
            let regexResponse = /resp_\d/;
            let response = (event.target.name).match(regexResponse); 
            console.log(`regex returns ${response}`);

            //Refers to question in survey data retrieved
            const targetIndex = answers.findIndex(item => item.questionId === event.target.name);
            
            //Need some way to account for answers being added/removed
            answers.splice(
                targetIndex, 
                1, 
                { questionId: event.target.name, answer:event.target.value }
            )      
        } else {
            //Refers to question in survey data retrieved
            const targetIndex = answers.findIndex(item => item.questionId === event.target.name);
            
            //Removes existing object containing "answer" for question of questionId,
            //to replace with new "answer"
            answers.splice(
                targetIndex, 
                1, 
                { questionId: event.target.name, answer:event.target.value }
            )
        }
    }
    /**
     * Processes responses given to each question
     * @param {*} questionId 
     * @param {*} questionType 
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        const questionId = event.target.questionId;
        const questionType = event.target.questionType;
        console.log(`Survey submit made of questionId-s ${questionId}, of 
        of question-Types ${questionType}`);

        //Refers to question in survey data retrieved
        const targetIndex = answers.findIndex(item => item.questionId === questionId);

        if (questionType === "trueFalse") {
            if (event.target.value === true){
                //using questionId accounts for scenario if respondent goes back to change given answer
                questions[targetIndex].responseCounter[`true`] += 1;
            }
            if (event.target.value === false){
                //using questionId accounts for scenario if respondent goes back to change given answer
                questions[targetIndex].responseCounter[`false`] += 1;
            }
        }
        if (questionType === "oneAnsMultipleChoice") {
            questions[targetIndex].responseCounter[event.target.value] += 1;
        }
        
    }
    /** 
     * Returns "answers" gathered to responseCounter of each question
     * @param {global} event
     */
    const questionCardGenerator = (questionData, questionCardId) => {
        let questionCard = [];
        const id = questionCardId;

        /** 
        //Refers to question in survey data retrieved
        const indexNumOfValue = answers.findIndex(item => item.questionId === questionData.questionId);
        console.log(`indexNumOfValue = ${indexNumOfValue}`)
        */
        
        if (questionData.questionType === "trueFalse") {
            questionCard = [
                <Card key={`questionCard_${id}`} id={questionData.questionId}>
                    <CardHeader
                        title = {questionData.questionText}
                    />
                    <CardContent>
                        <Button variant="contained" size="small" color="primary" >
                            EXIT
                        </Button>
                        <RadioGroup
                            name={questionData.questionId}
                            value={answers.answer /*It finds the right index on its own!!*/}
                            onChange={handleResponse}
                        >
                            <FormControlLabel value="true" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="false" control={<Radio />} label="NO"/>
                        </RadioGroup>
                        {/**"Previous" button set to automatically disable if at first card */}
                        <Button 
                            variant="contained" size="small" color="primary" 
                            onClick={() => {changeQuestionCard(activeQuestionCardId -= 1)}}
                            disabled={activeQuestionCardId === 0 ? true : false}
                        >
                            PREVIOUS
                        </Button>
                        {/**"Next" button set to automatically disable if at last card */}
                        <Button 
                            variant="contained" size="small" color="primary" 
                            onClick={() => {changeQuestionCard(activeQuestionCardId += 1)}}
                            disabled={activeQuestionCardId === questions.length ? true : false}
                        >
                            NEXT
                        </Button>
                    </CardContent>
                </Card>
            ]; //using return() causes this JSX to return as {JSX}. Using return[] will cause JSX to return as [{JSX}]
        } else if (questionData.questionType === "oneAnsMultipleChoice") {
            const responseKeys = Object.keys(questionData.responseText);
            const responseValues = Object.values(questionData.responseText);

            questionCard = [
                <Card key={`questionCard_${id}`} id={questionData.questionId}>
                    <CardHeader
                        title = {questionData.questionText}
                    />
                    <CardContent>
                        <Button variant="contained" size="small" color="primary" >
                            EXIT
                        </Button>
                        
                        <RadioGroup
                            name={questionData.questionId /**Retrieved by handleResponse() to insert correctly into answers[]*/}
                            value={answers.answer}
                            onChange={handleResponse}
                        >
                            {Array(responseKeys.length).fill().map(function(item, i) {
                                return(
                                    //Note that map() starts from zero!
                                    <FormControlLabel 
                                        value={responseKeys[i]} 
                                        control={<Radio/>} 
                                        label={responseValues[i]}
                                    />
                                )
                            })}
                        </RadioGroup>
                        {/**"Previous" button set to automatically disable if at first card */}
                        <Button 
                            variant="contained" size="small" color="primary" 
                            onClick={() => {changeQuestionCard(activeQuestionCardId -= 1)}}
                            disabled={activeQuestionCardId === 0 ? true : false}
                        >
                            PREVIOUS
                        </Button>
                        {/**"Next" button set to automatically disable if at last card */}
                        <Button 
                            variant="contained" size="small" color="primary" 
                            onClick={() => {changeQuestionCard(activeQuestionCardId += 1)}}
                            disabled={activeQuestionCardId === questions.length ? true : false}
                        >
                            NEXT
                        </Button>
                    </CardContent>
                </Card>
            ];
        } else if (questionData.questionType === "manyAnsMultipleChoice") {
            const responseKeys = Object.keys(questionData.responseText);
            const responseValues = Object.values(questionData.responseText);

            questionCard = [
                <Card key={`questionCard_${id}`} id={questionData.questionId}>
                    <CardHeader
                        title = {questionData.questionText}
                    />
                    <CardContent>
                        <Button variant="contained" size="small" color="primary" >
                            EXIT
                        </Button>
                        
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup> 
                                {Array(responseKeys.length).fill().map(function(item, i) {
                                    return(
                                        //Note that map() starts from zero!
                                        <FormControlLabel
                                            control={<Checkbox 
                                                checked={answers.answer} 
                                                onChange={handleResponse} 
                                                name={`${questionData.questionId}.${responseKeys[i]}`} 
                                            />}
                                            label={responseValues[i]}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </FormControl>
                        {/**"Previous" button set to automatically disable if at first card */}
                        <Button 
                            variant="contained" size="small" color="primary" 
                            onClick={() => {changeQuestionCard(activeQuestionCardId -= 1)}}
                            disabled={activeQuestionCardId === 0 ? true : false}
                        >
                            PREVIOUS
                        </Button>
                        {/**"Next" button set to automatically disable if at last card */}
                        <Button 
                            variant="contained" size="small" color="primary" 
                            onClick={() => {changeQuestionCard(activeQuestionCardId += 1)}}
                            disabled={activeQuestionCardId === questions.length ? true : false}
                        >
                            NEXT
                        </Button>
                    </CardContent>
                </Card>
            ];
        } else { //Cannot define a "" here, must be able to move back/forwards. Otherwise, there's nothing to go on when invalid data is received
            questionCard = [
                <Card key={`questionCard_${id}`} >
                    <CardHeader
                        title = "Error: Card failed to render"
                    />
                     {/**"Previous" button set to automatically disable if at first card */}
                     <Button 
                        variant="contained" size="small" color="primary" 
                        onClick={() => {changeQuestionCard(activeQuestionCardId -= 1)}}
                        disabled={activeQuestionCardId === 0 ? true : false}
                    >
                        PREVIOUS
                    </Button>
                    {/**"Next" button set to automatically disable if at last card */}
                    <Button 
                        variant="contained" size="small" color="primary" 
                        onClick={() => {changeQuestionCard(activeQuestionCardId += 1)}}
                        disabled={activeQuestionCardId === questions.length ? true : false}
                    >
                        NEXT
                    </Button>
                </Card>
            ];
        };

        console.log(`Generated questionCard: `);
        console.log(questionCard);
        console.log(`Key of generated questionCard: ${questionCard[0].key}`);

        //Must set mutably to remove last recorded response?
        setActiveQuestionCard( questionCard );
        setActiveQuestionCardId( questionCardId );//notes which obj in questions[] is rendered
    }
    const changeQuestionCard = (cardId) => {
        console.log(`id of replacement card: ${cardId}`)
        console.log(`Data for rendering new card:`)
        console.log(questions[cardId])
        
        questionCardGenerator(questions[cardId], cardId)
    }  
    return (
        <div className={classes.RespondentPage}>
            <div className={classes.menuBar}>
                <div className={classes.menuBarLeft}>
                    <IconButton edge="start" className={classes.drawerButton} color="inherit" aria-label="Drawer">
                        <Menu/>
                    </IconButton>
                    <img src={logo} className={classes.menuBarLogo} alt="logo" onClick={() => {props.history.push('/')}}/>
                </div>
                <div className={classes.menuBarRight}>
                    <GoogleSignIn/>
                </div>
            </div>
           
            <Container classes={{root: classes.header}}>
                <Typography variant="h3" align="left">Welcome back survey</Typography>
                <Typography variant="h3" align="left">Progress: </Typography>
            </Container>
            <Container classes={{root: classes.bodyBox}}>
                {activeQuestionCard} {/**Must use state here: When state updates, the update is pushed to all calls of that state*/}
            </Container>
            <Container>
                <Button onClick={() => {console.log(questions)}}>Chk "questions"</Button>
                <Button onClick={() => {console.log(activeQuestionCard)}}>Chk "activeQuestionCard"</Button>
                <Button onClick={() => {console.log(activeQuestionCardId)}}>Chk "activeQuestionCardId"</Button>
                <Button onClick={() => {console.log(answers)}}>Chk "answers"</Button>
            </Container>
        </div>
    );
}

export default withRouter(SurveyPage);
