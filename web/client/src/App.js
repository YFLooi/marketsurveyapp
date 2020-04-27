import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles} from '@material-ui/core/styles';
/** 
import { 
  Box, 
  Button,
  Grid, 
  Typography 
} from "@material-ui/core",
*/
/**Component imports */
import AppHeader from "./components/AppHeader/AppHeader.js"
import Chatbot from "./components/Chatbot/Chatbot.js";
import { MainPage } from "./components/MainPage/MainPage.js";
import { TestPage } from "./components/TestPage/TestPage.js";
import MarketeerPage from "./components/MarketeerPage/MarketeerPage.js";
import RespondentPage from "./components/RespondentPage/RespondentPage.js";
import ErrorPage from "./components/ErrorPage/ErrorPage.js";

const useStyles = makeStyles(theme => ({ 
    buttonBox: {
        border: "1px solid black"
    },
    App: {
        overflowX: "hidden", /*Prevents tiny white border on right of page that appears even at 100% page width*/
        display: "flex", 
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%"
    },
    AppBody: {
        width: "100%",
        flex: "2 2 auto",
        display: "flex",
    },
    AppFooter: {
        maxHeight: 20,
        width: "100%",
        background: "linear-gradient(to left, #00b7ff, #87d7f7)",
        textAlign: "right"
    }
}))

function App(props) {
    const classes = useStyles();
 
    return (
        <BrowserRouter>
            {/**Bits to be shared across all pages */}
            <div className={classes.App}>
                <AppHeader/>

                <div className={classes.AppBody}>
                    <Switch>
                        <Route 
                            exact path="/"
                            component={MainPage}
                        />}
                        <Route 
                            path="/TestPage"
                            component={TestPage}
                        />}
                        <Route 
                            path="/MarketeerPage"
                            component={MarketeerPage}
                        />}
                        <Route 
                            path="/RespondentPage"
                            component={RespondentPage}
                        />
                        <Route 
                            path="*"
                            component={ErrorPage}
                        />
                    </Switch>
                    <Chatbot/>
                </div>
                <div className={classes.AppFooter}>
                    <div className="footerText">
                        A project by YFLooi. More on <span role="img" aria-label="point right">&#128073;</span> <a href="https://github.com/YFLooi/marketsurveyapp">Github</a>
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