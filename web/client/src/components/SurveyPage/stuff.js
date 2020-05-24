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
    } else if (questionData.questionType === "manyAnsMultipleChoice") {
        answerSection = [
            <ManyAnswers
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
    } else if (questionData.questionType === "manyAnsMultipleChoice") {
        answerSection = [
            <ManyAnswers
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
} else if (questionData.questionType === "fivePoint") { 
    questionCard = [  
        <Card id={questionData.questionId} key={`${questionData.questionId}`}>
            <CardHeader
                title = {questionData.questionText}
            />
            <CardContent classes={{ root: classes.cardContent}}>
                <Button variant="contained" size="small" color="primary" >
                    EXIT
                </Button>
                <FivePoint data={questionData} answersForSubmit={answersForSubmit} answersSelected={answersSelected} handleResponse={handleResponse}/>
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


