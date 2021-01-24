import React from "react";
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({ 
  buttonBox:{
    border: "1px solid black"
  }
}))

function MarketeerPage() {
    const classes = useStyles();
   
    return (
        <div className="App">
            <header className="App-header">
                <h1>Marketeer Page</h1>
            </header>
        </div>
    );
}

export default MarketeerPage;
