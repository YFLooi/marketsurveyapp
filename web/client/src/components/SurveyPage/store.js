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

} else if (questionData.questionType === "oneAnsMultipleChoice") {
    //Need to keep responseKeys and responseValues local. Otherwise, JS throws an error if questionData = undefined
    //This happens even with an if-else catch for "undefined"
    const responseKeys = Object.keys(questionData.responseText);
    const responseValues = Object.values(questionData.responseText);

    questionCard = [
        <Card id={questionData.questionId} key={`${questionData.questionId}`}>
            <CardHeader
                title = {questionData.questionText}
            />
            <CardContent>
                <Button variant="contained" size="small" color="primary" >
                    EXIT
                </Button>
                
                <RadioGroup
                    name={questionData.questionId /**Retrieved by handleResponse() to insert correctly into answers[]*/}
                    value={answers[questionData.questionId]}
                    onChange={handleResponse}
                >
                    {Array(responseKeys.length).fill().map(function(item, i) {
                        return(
                            //Note that map() starts from zero!
                            <FormControlLabel 
                                value={responseKeys[i]} 
                                control={<Radio/>} 
                                label={responseValues[i]}
                                key={`${questionData.questionId}_${i}`}
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
    //Need to keep responseKeys and responseValues local. Otherwise, JS throws an error if questionData = undefined
    //This happens even with an if-else catch for "undefined"
    const responseKeys = Object.keys(questionData.responseText);
    const responseValues = Object.values(questionData.responseText);

    questionCard = [
        <Card id={questionData.questionId} key={`${questionData.questionId}`}>
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
                                        checked={false} //checked = 1, true. notChecked = 0, false
                                        onChange={handleResponse} 
                                        name={`${questionData.questionId}.${responseKeys[i]}`} 
                                    />}
                                    label={responseValues[i]}
                                    key={`${questionData.questionId}_${i}`}
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