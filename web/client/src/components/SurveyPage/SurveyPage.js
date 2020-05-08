import React, { useState, useEffect } from "react";
import {
    //Allows us to connect to <Hashrouter/> from a child component
    withRouter
} from "react-router-dom";
import { GoogleSignIn } from "../GoogleSignIn/GoogleSignIn.js";

import { makeStyles} from '@material-ui/core/styles';
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { RadioGroup, Radio, FormControlLabel,IconButton } from "@material-ui/core";
import { Card, CardHeader, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core/";
//Material UI icon imports
import { Menu, Home, Settings, AccountBox, ShoppingCart, Explore, FavoriteOutlined } from '@material-ui/icons';

import logo from "../logo.png";

const questions = [
    { 
        originSurveyId: "survey1",
        questionId: "survey1.question1",
        questionType:"trueFalse", 
        questionText:"Do you know Nestle?", 
        responseCounter:{ true: 10, false: 5 } 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1.question2",
        questionType:"trueFalse", 
        questionText:"Do you know KitKat?", 
        responseCounter:{ true: 5, false: 10 }
    },
    {   
        originSurveyId: "survey1",
        questionId: "survey1.question3",
        questionType:"oneAnsMultipleChoice", 
        questionText:"Which age group are you in?", 
        responseText: { resp_0: "10-18", resp_1: "19-30", resp_2: "31-50", resp_3: "50+" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0 } 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1.question4",
        questionType:"manyAnsMultipleChoice", 
        questionText:"Which of the following flavours sound tasty to you?", 
        userResponse:"" 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1.question5",
        questionType:"rankOrder", 
        questionText:"Rank the following", response:"" 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1.question6",
        questionType:"rateScale", 
        questionText:"Rate how appealing these flavours sound to you", response:"" },
    { 
        originSurveyId: "survey1",
        questionId: "survey1.question7",
        questionType:"fivePoint", 
        questionText:"Would you pay a bit more for a premium KitKat?", response:"" },
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
    }
}));

function SurveyPage(props) {
    const classes = useStyles();

    useEffect(() => {    
        //Renders questions to display on component mount
        questionGenerator(questions); 

        return () => {      
            //Do this mutably to wipe clean. Otherwise, reopening the same survey
            //may cause previous answers to reappear
            setQuestionCards([])
            setAnswers([])
        }; 
    }, []);

    let [questionCards, setQuestionCards] = useState([]);
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

        console.log(`Response received from questionId: ${event.target.questionid}`);

        //Refers to question in survey data retrieved
        const targetIndex = answers.findIndex(item => item.questionId === event.target.questionId);
        setAnswers(answers[targetIndex].answer = event.target.value);
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
    const questionGenerator = (questionData) => {
        let questionArray = Array(questionData.length).fill().map((item, i) => {
            if (questionData[i].questionType === "trueFalse") {
                return (
                    <Card key={`questionCard_${questionData.questionId}`} id={questionData.questionId}>
                        <CardHeader
                            title = {questionData[i].questionText}
                        />
                        <CardContent>
                            <Button variant="contained" size="small" color="primary" >
                                EXIT
                            </Button>
                            <RadioGroup
                                name='answerRadio'
                                value={answers[i]}
                                questionid={questionData[i].questionId}
                                onChange={handleResponse}
                            >
                                <FormControlLabel value={true} control={<Radio/>} label="YES"/>
                                <FormControlLabel value={false} control={<Radio />} label="NO"/>
                            </RadioGroup>
                            {/**"Previous" button set to automatically disable if at first card */}
                            <Button 
                                variant="contained" size="small" color="primary" 
                                onClick={() => {changeQuestionCard(activeQuestionCardId-1)}}
                                disabled={activeQuestionCardId === 0 ? true : false}
                            >
                                PREVIOUS
                            </Button>
                            {/**"Next" button set to automatically disable if at last card */}
                            <Button 
                                variant="contained" size="small" color="primary" 
                                onClick={() => {changeQuestionCard(activeQuestionCardId+1)}}
                                disabled={activeQuestionCardId === questions.length ? true : false}
                            >
                                NEXT
                            </Button>
                        </CardContent>
                    </Card>
                );
            } else if (questionData[i].questionType === "oneAnsMultipleChoice") {
                const responseKeys = Object.keys(questionData[i].responseText);
                const responseValues = Object.values(questionData[i].responseText);

                return (
                    <Card key={`questionCard_${questionData.questionId}`} id={`questionCard_${i}`}>
                        <CardHeader
                            title = {questionData[i].questionText}
                        />
                        <CardContent>
                            <Button variant="contained" size="small" color="primary" >
                                EXIT
                            </Button>
                            
                            <RadioGroup
                                name='answerRadio'
                                value={answers[i]}
                                questionid={questionData[i].questionId}
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
                                onClick={() => {changeQuestionCard(activeQuestionCardId-1)}}
                                disabled={activeQuestionCardId === 0 ? true : false}
                            >
                                PREVIOUS
                            </Button>
                            {/**"Next" button set to automatically disable if at last card */}
                            <Button 
                                variant="contained" size="small" color="primary" 
                                onClick={() => {changeQuestionCard(activeQuestionCardId+1)}}
                                disabled={activeQuestionCardId === questions.length ? true : false}
                            >
                                NEXT
                            </Button>
                        </CardContent>
                    </Card>
                );
            } else {
                return ""
            }
        });

        //Must set mutably to remove last recorded response?
        console.log(`Generated questionCards: `);
        console.log(questionArray);
        setQuestionCards(questionCards.concat(questionArray));

        //This function runs on componentDidMount, so it pushes to 1st question immediately
        setActiveQuestionCard( questionArray[0] );
        setActiveQuestionCardId(0);
    }
    const changeQuestionCard = (cardId) => {
        console.log(`id of replacement card: ${cardId}`)
        setActiveQuestionCard(questionCards[cardId]);
        setActiveQuestionCardId(cardId);
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
                <Button onClick={() => {console.log(questionCards)}}>Chk "questionCards"</Button>
            </Container>
        </div>
    );
}

export default withRouter(SurveyPage);
