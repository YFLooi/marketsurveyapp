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
import MainPage from "./components/MainPage/MainPage.js";
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
        <div className="App-Header">
          <img src={logo} style={{ width:90 }} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <GoogleSignIn/>
        </div>
        <Chatbot/>
      </div>

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
        />}
      </Switch>
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