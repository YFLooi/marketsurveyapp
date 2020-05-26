const answerSectionRender = (questionType) => {
    let answerSection = {}
    if (
        questionType === "trueFalse" ||
        questionType === "oneAnsMultipleChoice"
    ) {
        answerSection = [
            <SingleAnswer 
                data={questionData} 
                answersForSubmit={answersForSubmit} 
                answersSelected={answersSelected} 
                handleResponse={handleResponse}
            />
        ]
    } else if (questionData.questionType === "manyAnsMultipleChoice") {
        answerSection = [
            <ManyAnswers
                data={questionData} 
                answersForSubmit={answersForSubmit} 
                answersSelected={answersSelected} 
                handleResponse={handleResponse}
            />
        ]
    } else if (questionData.questionType === "rankOrder") {
        answerSection = [
            <RankOrder 
                data={questionData} 
                answersForSubmit={answersForSubmit} 
                handleResponse={handleResponse}
            />
        ]
    } else if (questionData.questionType === "rateScale") {
        answerSection = [
            <RateScale 
                data={questionData} 
                answersForSubmit={answersForSubmit} 
                handleResponse={handleResponse}
            />
        ]
    } else if (questionData.questionType === "fivePoint") {
        answerSection = [
            <FivePoint 
                data={questionData} 
                answersForSubmit={answersForSubmit} 
                answersSelected={answersSelected} 
                handleResponse={handleResponse}
            />
        ]
    } else {
        answerSection = [
            <CardHeader
            title = "Error: Card failed to render"
        />
        ]
    }
    
    //using return() causes this JSX to return as {JSX}. 
    //Using return[] will cause JSX to return as [{JSX}]
    return answerSection;
}
const cardMediaRender = (questionData) => {
    if (questionData.questionImg == ""){
        return null;
    } else {
        return [
            <CardMedia
                image={questionData.questionImg}
                title={questionData.questionImgAlt}
            />
        ]
    }
}

questionCard = [
    <Card id={questionData.questionId} key={`${questionData.questionId}`}>
        <CardHeader
            title = {questionData.questionText}
        />
        <CardContent classes={{ root: classes.cardContent}}>
            {
                /* Necessary: Cannot have img src="" */
                cardMediaRender(questionData) 
            }

            {answerSectionRender(questionData.questionType)}
            
            {/**Box for buttons */}
            <Container>
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
                <Button variant="contained" size="small" color="primary" >
                    EXIT
                </Button>
            </Container>
        </CardContent>
    </Card>
]
