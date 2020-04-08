import React from "react";
import { makeStyles} from '@material-ui/core/styles';
import { 
  Box, 
  Button,
  Typography 
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({ 
  buttonBox:{
    border: "1px solid black"
  }
}))

function MarketeerPage() {
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
        <h1>Marketeer Page</h1>
      </header>
     
    </div>
  );
}

export default MarketeerPage;
