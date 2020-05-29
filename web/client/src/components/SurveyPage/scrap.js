const questions = [
    { 
        surveyId: "survey1",
        questionId: "survey1_question0",
        questionType:"trueFalse", 
        questionText:"Do you know Nestle?", 
        questionImg: "",
        questionImgAlt: "",
        responseText: { resp_0: "YES", resp_1: "NO" },
        responseCounter:{ resp_0: 0, resp_1: 0 } //Stored on server. For questionType=trueFalse, resp_0 always = TRUE, resp_1 always = FALSE
    },
    { 
        surveyId: "survey1",
        questionId: "survey1_question1",
        questionType:"trueFalse", 
        questionText:"Do you know KitKat?", 
        questionImg: "",
        questionImgAlt: "",
        responseText: { resp_0: "YES", resp_1: "NO" },
        responseCounter:{ resp_0: 0, resp_1: 0 }
    },
    {   
        surveyId: "survey1",
        questionId: "survey1_question2",
        questionType:"oneAnsMultipleChoice", 
        questionText:"Which age group are you in?", 
        questionImg: "",
        questionImgAlt: "",
        responseText: { resp_0: "10-18", resp_1: "19-30", resp_2: "31-50", resp_3: "50+" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0 } 
    },
    { 
        surveyId: "survey1",
        questionId: "survey1_question3",
        questionType:"manyAnsMultipleChoice", 
        questionText:"Which of the following flavours sound tasty to you?", 
        questionImg: "",
        questionImgAlt: "",
        responseText: { resp_0: "Adzuki", resp_1: "Exotic Tokyo", resp_2: "Golden Citrus", resp_3: "Kobe Pudding", resp_4: "Passion Fruit", resp_5: "Soy Sauce", resp_6: "Wasabi" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0, resp_4: 0, resp_5: 0, resp_6: 0 } 
    },
    { 
        surveyId: "survey1",
        questionId: "survey1_question4",
        questionType:"rankOrder", 
        questionText:"Which of these do you notice first on the packaging?",
        questionImg: "https://images-na.ssl-images-amazon.com/images/I/A1TEMXMYo2L._AC_SL1500_.jpg",
        questionImgAlt: "Matcha-flavoured KitKat packaging",
        responseText: { resp_0: "Green-gold colour", resp_1: "KitKat logo", resp_2: "'Matcha' wording", resp_3: "Background graphics" }, 
        responseCounter:{ 
            rank_0: { resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0 }, 
            rank_1: { resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0 }, 
            rank_2: { resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0 }, 
            rank_3: { resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0 }
        } 
    },
    { 
        surveyId: "survey1",
        questionId: "survey1_question5",
        questionType:"rateScale", 
        questionText:"Rate how much these statements relate to you", 
        questionImg: "",
        questionImgAlt: "",
        responseText: { 
            resp_0: "Break time is KitKat time", 
            resp_1: "KitKats are made for sharing", 
            resp_2: "Gift season is KitKat season", 
            resp_3: "KitKats are exclusive items", 
            resp_4: "Rare KitKat flavours are best released seasonally",
            resp_5: "KitKat flavours should be unique to certain regions"
        }, 
        responseCounter:{ 
            resp_0: { rank_0: 0, rank_1: 0, rank_2: 0, rank_3: 0, rank_4: 0 }, 
            resp_1: { rank_0: 0, rank_1: 0, rank_2: 0, rank_3: 0, rank_4: 0 }, 
            resp_2: { rank_0: 0, rank_1: 0, rank_2: 0, rank_3: 0, rank_4: 0 }, 
            resp_3: { rank_0: 0, rank_1: 0, rank_2: 0, rank_3: 0, rank_4: 0 }, 
            resp_4: { rank_0: 0, rank_1: 0, rank_2: 0, rank_3: 0, rank_4: 0 }, 
            resp_5: { rank_0: 0, rank_1: 0, rank_2: 0, rank_3: 0, rank_4: 0 }
        }
    },
    { 
        surveyId: "survey1",
        questionId: "survey1_question6",
        questionType:"fivePoint", 
        questionText:"Would you pay more for a premium KitKat?",
        questionImg: "",
        questionImgAlt: "",
        responseText: { resp_0: "Extremely unlikely", resp_1: "Unlikely", resp_2: "It depends", resp_3: "Likely", resp_4: "Very likely" }, 
        responseCounter:{ resp_0: 0, resp_1: 0, resp_2: 0, resp_3: 0, resp_4: 0, resp_5: 0, resp_6: 0 } 
    },
]