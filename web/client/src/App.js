import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import logo from "./logo.png";
import "./App.css";
import { makeStyles} from '@material-ui/core/styles';
import { 
  Box, 
  Button,
  Grid, 
  Typography 
} from "@material-ui/core";

/**Component imports */
import Chatbot from "./components/Chatbot/Chatbot.js";
import { MainPage } from "./components/MainPage/MainPage.js";
import MarketeerPage from "./components/MarketeerPage/MarketeerPage.js";
import RespondentPage from "./components/RespondentPage/RespondentPage.js";
import { GoogleSignIn } from "./components/GoogleSignIn/GoogleSignIn.js";

const useStyles = makeStyles(theme => ({ 
    buttonBox:{
        border: "1px solid black"
    },
}))

function App() {
    const classes = useStyles();
 
    return (
        <BrowserRouter>
        {/**Bits to be shared across all pages */}
        <div className="App">
            <div className="App-header">
                <img src={logo} style={{ width:90 }} className="App-logo" alt="logo" />
                <span>  Redefine Market Intelligence</span>
                <GoogleSignIn/>
            </div>

            <div className="App-body">
                <Switch>
                    <Route 
                        exact path="/"
                        component={MainPage}
                    />}
                    <Route 
                        path="/MarketeerPage"
                        component={MarketeerPage}
                    />}
                    <Route 
                        path="/RespondentPage"
                        component={RespondentPage}
                    />
                </Switch>
                <Chatbot/>
            </div>
            <div className="App-footer">
                <div className="footer-text">
                    A project by YFLooi. Find me on &#128073; <a href="https://github.com/YFLooi/marketsurveyapp">Github</a>
                </div>
            </div>
        </div>

        
        </BrowserRouter>
    );
}

export default App;

/** 
 * 2 kinds of routes:
 * without props being passed:
 * <Route 
    path="/SuggestBooks"
    component={SuggestBooks}
    />}
 * with props being passed:
 * <Route 
      path="/Borrowings" 
      render={(props) => <Borrowings {...props}
          passwordInput={this.state.passwordInput}
          borrowingsRecord={this.state.borrowingsRecord}
          isBorrowingsPasswordCorrect={this.state.isBorrowingsPasswordCorrect}
          expandList = {this.state.expandList}
          stateUpdater={this.stateUpdater}
      />}
    />
*/