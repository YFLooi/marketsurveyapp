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

function RespondentPage() {
    const classes = useStyles();
   
    return (
        <div className="App">
            <header className="App-header">
                <h1>Respondent Page</h1>
            </header>
        
        </div>
    );
}

export default RespondentPage;
