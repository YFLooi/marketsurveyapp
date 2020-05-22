import React, { useState, useEffect } from "react";
import {
    //Allows us to connect to <Hashrouter/> from a child component
    withRouter
} from "react-router-dom";
import { GoogleSignIn } from "../GoogleSignIn/GoogleSignIn.js";
import RankOrder from "./RankOrder.js";
import RateScale from "./RateScale.js";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
        questionImg: "",
        responseText: { resp_0: "YES", resp_1: "NO" },
        responseCounter:{ resp_0: 0, resp_1: 0 } //Stored on server. For questionType=trueFalse, resp_0 always = TRUE, resp_1 always = FALSE
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question1",
        questionType:"trueFalse", 
        questionText:"Do you know KitKat?", 
        questionImg: "",
        responseText: { resp_0: "YES", resp_1: "NO" },
        responseCounter:{ resp_0: 0, resp_1: 0 }
    },
    {   
        originSurveyId: "survey1",
        questionId: "survey1_question2",
        questionType:"oneAnsMultipleChoice", 
        questionText:"Which age group are you in?", 
        questionImg: "",
        responseText: { resp_0: "10-18", resp_1: "19-30", resp_2: "31-50", resp_3: "50+" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0 } 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question3",
        questionType:"manyAnsMultipleChoice", 
        questionText:"Which of the following flavours sound tasty to you?", 
        questionImg: "",
        responseText: { resp_0: "Adzuki", resp_1: "Exotic Tokyo", resp_2: "Golden Citrus", resp_3: "Kobe Pudding", resp_4: "Passion Fruit", resp_5: "Soy Sauce", resp_6: "Wasabi" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0, resp_4: 0, resp_5: 0, resp_6: 0 } 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question4",
        questionType:"rankOrder", 
        questionText:"Which of these do you notice first on the packaging?",
        questionImg: "",
        questionImg: "https://images-na.ssl-images-amazon.com/images/I/A1TEMXMYo2L._AC_SL1500_.jpg",
        questionImgAlt: "Matcha-flavoured KitKat packaging",
        responseText: { resp_0: "Green-gold colour", resp_1: "KitKat logo", resp_2: "'Matcha' wording", resp_3: "Background graphics" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0, resp_4: 0, resp_5: 0, resp_6: 0 } 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question5",
        questionType:"rateScale", 
        questionText:"Rate how much these statements relate to you", 
        questionImg: "",
        responseText: { 
            resp_0: "Break time is KitKat time", 
            resp_1: "KitKats are made for sharing", 
            resp_2: "Gift season is KitKat season", 
            resp_3: "KitKats are exclusive items", 
            resp_4: "Rare KitKat flavours are best released seasonally",
            resp_5: "KitKat flavours should be unique to certain regions"
        }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0, resp_4: 0, resp_5: 0 } 
    },
    { 
        originSurveyId: "survey1",
        questionId: "survey1_question6",
        questionType:"fivePoint", 
        questionText:"Would you pay more for a premium KitKat?",
        questionImg: "",
        responseText: { resp_0: "Extremely unlikely", resp_1: "Unlikely", resp_2: "It depends", resp_3: "Likely", resp_4: "Very likely" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0, resp_4: 0, resp_5: 0, resp_6: 0 } 
     },
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
    cardContent: {
        display: "flex",
        flexDirection: "column"
    },
    coverImg_rankOrder: {
        width: 100,
        height: 100
    }
}));

function SurveyPage(props) {
    const classes = useStyles();

    useEffect(() => {    
        //Renders questions to display on component mount
        questionCardGenerator(questions[0], 0); 

        return () => {      
            //Do this mutably to wipe clean. Otherwise, reopening the same survey
            //may cause previous answers to reappear
            answersSelected = {}
            setAnswersForSubmit({});
        }; 
    }, []);

    //state that is pushed to DOM
    let [ activeQuestionCard, setActiveQuestionCard ] = useState([]);
    //Stores element number of current activeQuestionCard
    let [ activeQuestionCardId, setActiveQuestionCardId ] = useState(0);

    //Stores answer(s) selected for each card 
    //Entries not visible in console.log, but visible to questionCard-s
    let answersSelected = {};
    //Stores for submit later. Visible in console log, but invisble to radio questionCard-s
    let [ answersForSubmit, setAnswersForSubmit ] = useState(param =>{
        let newObj = {};
        for(let i =0; i<questions.length; ++i){
            if (
                questions[i].questionType === "trueFalse" || 
                questions[i].questionType === "oneAnsMultipleChoice" 
            ){
                newObj[questions[i].questionId] = "";
            } else if (questions[i].questionType === "manyAnsMultipleChoice" ){
                newObj[questions[i].questionId] = [];
            } else if (questions[i].questionType === "rankOrder" ){
                //DragNDrop.js will provide the required ranks
                newObj[questions[i].questionId] = {};
            }
        }
        
        return newObj;
    });

    /**
     * Assigns selected answer to storage in answersSelected{} and hook.answersForSubmit
     * Avoid using "event" global here like many tutorials do. It tends to bug when 
     * updating state that is an object (event.target.xx = null)
     * @param {*} name
     * @param {*} value
     */
    const handleResponse = (name, value, questionType) => {
        if (
            //These types only have one answer
            questionType === "trueFalse" ||
            questionType === "oneAnsMultipleChoice"    
        ){
            console.log(`Incoming value: ${value}, for ${name}`);
            console.log(`Current values in answersForSubmit[]: ${answersForSubmit[name]}`);

            //Sets object which stores which answer is selected/unselected
            //This object is visible to radio/checkboxes but NOT console.log
            const source = { [name]: value };
            const target = answersSelected;
            answersSelected = Object.assign(target, source);

            setAnswersForSubmit(answersForSubmit => ({
                ...answersForSubmit,
                [name]: value
            }));
        } else if (
            //These types have >1 answer but not all answers need to be selected
            questionType === "manyAnsMultipleChoice"
        ){
            let newAnswerArray = answersForSubmit[name];
            //Refers to question in survey data retrieved
            const targetIndex = answersForSubmit[name].findIndex(item => item === value);

            console.log(`location of entered response: ${targetIndex}`);
            //The logic below accounts for new answers being added, and existing answers being removed
            if (targetIndex === -1){
                //Adds new answer to start of array
                console.log(`New response to add: ${value}`);
                newAnswerArray.splice(0, 0, value);
            } else {
                //Removes existing answer. Happens when box is unchecked
                newAnswerArray.splice(targetIndex, 1);
            }   

            console.log(`Update for manyAnsMultipleChoice question:`);
            console.log(newAnswerArray);
            const source = { [name]: newAnswerArray };
            const target = answersSelected;
            answersSelected = Object.assign(target, source);

            setAnswersForSubmit(answersForSubmit => ({
                ...answersForSubmit,
                [name]: newAnswerArray
            }));
        } else if (
            //These types have >1 answer and all answers must be selected
            questionType === "rankOrder"
        ){ 
            console.log(`Incoming value:`);
            console.log(value)
            console.log(`for ${name}`)

            setAnswersForSubmit(answersForSubmit => ({
                ...answersForSubmit,
                [name]: value
            }));
        }

        //React will not trigger shouldComponentUpdate on these loop-rendered questionCards
        //I need to trigger the re-render manually. 
        //This also means I cannot use state to store the responses made for these cards
        questionCardGenerator(questions[activeQuestionCardId], activeQuestionCardId);  
    } 
    const handleSubmit = () => {
        const questionIds = Object.keys(answersForSubmit);
        const responses = Object.values(answersForSubmit);

        console.log(`Questions answered: ${questionIds}`);
        console.log(`Responses received: ${responses}`);

        /** 
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
        */
        
        /**
        Mock data store generator for rankOrder questions
        Output object is:
        {
            rank_0: {resp_0 = 0, resp_1 = 0 ...}
            rank_1: {resp_0 = 0, resp_1 = 0 ...}
            ...
        }

        let rankObj = {};
        const items = Object.keys(questions[i].responseText);
        const numberOfItems = Object.keys(questions[i].responseText).length;

        //Number of ranks = number of possible responses
        for (let i=0; i<numberOfItems; i++){
            rankObj[`rank_${i}`] = {}

            //Number of items per rank = number of possible responses
            for (let j=0; j<numberOfItems; j++){
                rankObj[`rank_${i}`][items[j]] = 0
            }
        }
         */
    }
    /**
     * Processes responses given to each question
     * @param {*} questionId 
     * @param {*} questionType 
     */
    const questionCardGenerator = (questionData, questionCardId) => {
        let questionCard = [];

        const responseKeys = Object.keys(questionData.responseText);
        const responseValues = Object.values(questionData.responseText);

        if (
            questionData.questionType === "trueFalse" ||
            questionData.questionType === "oneAnsMultipleChoice"
        ) {
            questionCard = [
                <Card id={questionData.questionId} key={`${questionData.questionId}`}>
                    <CardHeader
                        title = {questionData.questionText}
                    />
                    <CardContent classes={{ root: classes.cardContent}}>
                        <Button variant="contained" size="small" color="primary" >
                            EXIT
                        </Button>
                        {Array(responseKeys.length).fill().map(function(item, i) {
                            let answerRecorded = false;
                            
                            //Won't work with the hook-hosted answersForSubmit
                            if(answersSelected[questionData.questionId] === responseKeys[i]){
                                answerRecorded = true;
                                console.log(`answer recorded? ${answerRecorded}`)
                            } 
                            return(
                                <FormControlLabel
                                    label={responseValues[i]}
                                    control={ 
                                        <Radio
                                            checked={answerRecorded}
                                            onChange={() => {handleResponse(questionData.questionId, responseKeys[i], "oneAnsMultipleChoice")}}
                                            name={`${questionData.questionId}`} //keep to organise. no actual use here
                                            inputProps={{ 'aria-label': `${questionData.questionId}, question ${i}` }}
                                            key={`${questionData.questionId}_${i}`}
                                        />
                                    }
                                />
                            )
                        })}
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
        } else if (questionData.questionType === "manyAnsMultipleChoice") {
            questionCard = [
                <Card id={questionData.questionId} key={`${questionData.questionId}`}>
                    <CardHeader
                        title = {questionData.questionText}
                    />
                    <CardContent>
                        <Button variant="contained" size="small" color="primary" >
                            EXIT
                        </Button>
                        
                        {Array(responseKeys.length).fill().map(function(item, i) {
                            let answerRecorded = false;
                            const targetIndex = answersForSubmit[questionData.questionId].findIndex(item => item === responseKeys[i]);

                            if(targetIndex !== -1){
                                answerRecorded = true;
                            }
                            return(
                                <FormControlLabel
                                    label={responseValues[i]}
                                    control={ 
                                        <Checkbox
                                            checked={answerRecorded}
                                            onChange={() => {handleResponse(questionData.questionId, responseKeys[i], "manyAnsMultipleChoice")}}
                                            name={`${questionData.questionId}`} //keep to organise. no actual use here
                                            inputProps={{ 'aria-label': `${questionData.questionId}, question ${i}` }}
                                            key={`${questionData.questionId}_${i}`}
                                        />
                                    }
                                />
                            )
                        })}
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
        
        } else if (questionData.questionType === "rankOrder") {
            questionCard = [  
                <Card id={questionData.questionId} key={`${questionData.questionId}`}>
                    <CardHeader
                        title = {questionData.questionText}
                    />
                    <CardContent classes={{ root: classes.cardContent}}>
                        <Button variant="contained" size="small" color="primary" >
                            EXIT
                        </Button>
                        <CardMedia
                            className={classes.coverImg_rankOrder}
                            image={questionData.questionImg}
                            title={questionData.questionImgAlt}
                        />
                        <RankOrder data={questionData} answersForSubmit={answersForSubmit} handleResponse={handleResponse}/>
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
            ]
        } else if (questionData.questionType === "rateScale") { 
            questionCard = [  
                <Card id={questionData.questionId} key={`${questionData.questionId}`}>
                    <CardHeader
                        title = {questionData.questionText}
                    />
                    <CardContent classes={{ root: classes.cardContent}}>
                        <Button variant="contained" size="small" color="primary" >
                            EXIT
                        </Button>
                        <CardMedia
                            className={classes.coverImg_rankOrder}
                            image={questionData.questionImg}
                            title={questionData.questionImgAlt}
                        />
                        <RateScale data={questionData} answersForSubmit={answersForSubmit} handleResponse={handleResponse}/>
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
            ]
        } else { //Cannot define a "" here, must be able to move back/forwards. Otherwise, there's nothing to go on when invalid data is received
            questionCard = [
                <Card key={`errorCard.${questionCardId}`}>
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

        setActiveQuestionCard( questionCard );
        setActiveQuestionCardId( questionCardId );//notes which obj in questions[] is rendered
    }
    /**
     * Uses cardId passed by Previous and Next buttons to get data in questions[] for
     * rendering new card
     * @param {*} cardId 
     */
    const changeQuestionCard = (cardId) => {
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
                <Button variant="contained" color="primary" onClick={() => {handleSubmit()}}>Submit responses</Button>
            </Container>
            <Container>
                <Button onClick={() => {console.log(questions)}}>Chk "questions"</Button>
                <Button onClick={() => {console.log(activeQuestionCard)}}>Chk "activeQuestionCard"</Button>
                <Button onClick={() => {console.log(activeQuestionCardId)}}>Chk "activeQuestionCardId"</Button>
                <Button onClick={() => {console.log(answersSelected)}}>Chk "answersSelected"</Button>
                <Button onClick={() => {console.log(answersForSubmit)}}>Chk "answersForSubmit"</Button>
            </Container>        
        </div>
    );
}

export default withRouter(SurveyPage);
