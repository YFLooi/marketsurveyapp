import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import logo from "./logo.png";
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
import Chatbot from "./components/Chatbot/Chatbot.js";
import { MainPage } from "./components/MainPage/MainPage.js";
import { TestPage } from "./components/TestPage/TestPage.js";
import MarketeerPage from "./components/MarketeerPage/MarketeerPage.js";
import RespondentPage from "./components/RespondentPage/RespondentPage.js";
import { GoogleSignIn } from "./components/GoogleSignIn/GoogleSignIn.js";
import ErrorPage from "./components/ErrorPage/ErrorPage.js";

const useStyles = makeStyles(theme => ({ 
    buttonBox: {
        border: "1px solid black"
    },
    App: {
        display: "flex", 
        flexDirection: "column",
        height: "100vh", /*100% of viewport height*/
        width: "100vw", /*100% of viewport width*/
        overflowX: "hidden"
    },
    AppHeader: {
        width: "100%",    
        height: 60,
        background: "linear-gradient(to left, #00b7ff, #87d7f7)",
        display: "flex",
        justifyContent: "center"
    },
    /*left and right leaves extra space*/
    AppHeaderLeft: {
        width: "75%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "10px"
    },
    AppHeaderRight: {
        width: "15%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    AppBody: {
        width: "100%",
        flex: "1 1 auto" /*Fills up height not taken by App-header and App-footer*/
    },
    AppFooter: {
        width: "100%",
        minHeight: 25,
        background: "linear-gradient(to left, #00b7ff, #87d7f7)"
    }
}))

function App() {
    const classes = useStyles();
 
    return (
        <BrowserRouter>
            {/**Bits to be shared across all pages */}
            <div className={classes.App}>
                <div className={classes.AppHeader}>
                    <div className={classes.AppHeaderLeft}>
                        <img src={logo} style={{ width:90 }} className="AppLogo" alt="logo" />
                        <span> Redefine Market Intelligence</span>
                    </div>
                    <div className={classes.AppHeaderRight}>
                        <GoogleSignIn/>
                    </div>
                </div>

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