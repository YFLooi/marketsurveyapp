import React from "react";
import { makeStyles} from '@material-ui/core/styles';
import { 
  Box, 
  Button,
  Grid,
  Typography 
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({ 
  buttonBox:{
    border: "1px solid black"
  }
}))

function MainPage() {
  const classes = useStyles();
  function testFunction(){
    const that = this;
    fetch("/testFunction/", {method: "GET"})  
      .then(function(response){
        return response.json()
          .then(function(data){
              console.log("Results of test:");
              console.log(data);
          })
      })  
      .catch(function(error){
          console.log("Request failed", error)
      })
  }
  function testGet(){
    fetch("/testGet/", {method: "GET"})  
      .then(function(response){
        return response.json()
          .then(function(data){
              console.log("Results of test:");
              console.log(data);
          })
      })  
      .catch(function(error){
          console.log('Request failed', error)
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Main Page</h1>
      </header>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      > 
        <Box classes={{root: classes.buttonBox}}>
        <Button variant="contained" color="primary" onClick={() => {testFunction()}}>Test function</Button>
        <Button variant="contained" color="secondary" onClick={() => {testGet()}}>Test Get</Button>
        </Box>
      </Grid>
    </div>
  );
}

export default MainPage;