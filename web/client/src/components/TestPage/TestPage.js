import React from "react";
import { makeStyles} from '@material-ui/core/styles';
import { 
    Box, 
    Button,
    Grid,
} from "@material-ui/core";
const useStyles = makeStyles(theme => ({ 
    buttonBox:{
        border: "1px solid black",
        minWidth: "200px",
        minHeight: "200px"
    }
}))

//For testing Jest
function productTestFunction(a, b){
    return a*b
}
function arrayTestFunction(a){
    let testArray = new Array(a.length)

    testArray = a.map(function (currVal, index) {
        return `${index}: ${currVal}`;
    })
    console.log(testArray) //Outputs to Jest test console
    return testArray
}

function TestPage() {
    const classes = useStyles();
    function testFunction(){
        fetch("/server/testFunction/", {method: "GET"})  
        .then(function(response){
            return response.json()
            .then(function(data){
                console.log("Results of test:");
                console.log(data);
                document.getElementById("outputBox").innerHTML = data;
            })
        })  
        .catch(function(error){
            console.log("Request failed", error)
        })
    }
    function testGet(){
        fetch("/server/testGet/", {method: "GET"})  
        .then(function(response){
            return response.json()
            .then(function(data){
                console.log("Results of test:");
                console.log(data);
                document.getElementById("outputBox").innerHTML = data;
            })
        })  
        .catch(function(error){
            console.log('Request failed', error)
        })
    }
    function testHerokuPg(){
        fetch("/server/testHerokuPg/", {method: "GET"})  
        .then(function(response){
            return response.json()
            .then(function(data){
                console.log("Results of test:");
                console.log(data);

                let resultsArray = data["results"]
                document.getElementById("outputBox").innerHTML = `Retrived id=${resultsArray[0].id}, name=${resultsArray[0].name}`;
            })
        })  
        .catch(function(error){
            console.log('Request failed', error)
        })
    }

    return (
        <div className="MainPage">
            <header className="MainPage-header">
                <h1>Test Page</h1>
            </header>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
            >   
                <Grid item>
                    <Box classes={{root: classes.buttonBox}}>
                        <Button variant="contained" color="primary" onClick={() => {testFunction()}}>Test function</Button>
                        <Button variant="contained" color="secondary" onClick={() => {testGet()}}>Test Get</Button>
                        <Button variant="contained" color="secondary" onClick={() => {testHerokuPg()}}>Test Heroku Pg</Button>

                        <div>Output:</div>
                        <div id="outputBox">*Initial value*</div>
                    </Box>
                    <a href="www.9gag.com">learn react</a>
                </Grid>
            </Grid>
        </div>
    );
}

export { TestPage, productTestFunction, arrayTestFunction };
