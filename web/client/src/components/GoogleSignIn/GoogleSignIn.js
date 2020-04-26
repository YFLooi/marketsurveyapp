import React, { useEffect, useState }  from "react";
import { makeStyles} from '@material-ui/core/styles'; 
import { 
    TextField,
    Button
} from "@material-ui/core";
import { GoogleLogin, GoogleLogout } from 'react-google-login'; //using a HTML <script> for GoogleOAuth does not work in React

const useStyles = makeStyles(theme => ({ 
    signInButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        font: 12,
        color: "white",
        padding: 10,
        width: 78,
        height: "100%",
        transitionDuration: "0.2s",
        "&:hover":{
            fontWeight: "bold",
            color: "black"
        }
    },
    signInPopup: {
        display: "none",
        position: "absolute",
        top: 80, /**Header height is 60px + 20 for padding*/
        right: 40,
        backgroundColor: "whitesmoke",
        padding: 10,
        border: "2px solid gray",
        zAxis: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column"
    },
    signInPopupCloseButton: {
        width: "100%",
        textAlign: "right",
        cursor: "pointer",
        font: 12,
        color: "gray",
        marginBottom: 20,
        transitionDuration: "0.2s",
        "&:hover": {
            fontWeight: "bold",
            color: "black"
        }
    },
    signInPopUpForm: {
        margin: 5
    }
}))

export function GoogleSignIn(props) {
    const classes = useStyles();
    const [signedIn, setSignedIn] = useState(false);
    const [signInPopupDisplay, setSignInPopupDisplay] = useState(false);

    //Should set to clear on sucessful login
    const [emailEntered, setEmailEntered] = useState("");
    const [passwordEntered, setPasswordEntered] = useState("");

    function signInPopupToggle() {
        setSignInPopupDisplay(!signInPopupDisplay)

        if (signInPopupDisplay === true) {
            document.getElementById("signInPopup").style.display = "flex"
        } else if (signInPopupDisplay === false) {
            document.getElementById("signInPopup").style.display = "none"
        } else {
            return null;
        }
    }
    function handlePasswordInputChange(event){
        if (event.target.name === "user_email"){
            setEmailEntered(event.target.value)
        } 
        if (event.target.name === "user_password"){
            setPasswordEntered(event.target.value)
        }
    }
    //getBasicProfile() is a method to get info from GId that signed in
    function onGoogleSignIn(googleUser) {
        setSignedIn(true);
        var profileParameters = []
        
        var profile = googleUser.getBasicProfile();
        profileParameters.splice(0, 0, profile.getId()) // Do not send to your backend! Use an ID token instead.
        profileParameters.splice(1, 0, profile.getName())
        profileParameters.splice(2, 0, profile.getImageUrl())
        profileParameters.splice(3, 0, profile.getEmail()) // This is null if the 'email' scope is not present.

        console.log(profileParameters);
        renderProfile(profileParameters);
    }
    //getBasicProfile() is a method to get info from GId that signed in
    function onGoogleSignInFailure() {
        console.log("Login failed!")
    }
    function renderProfile(parameters){
        var profileParameterNames = ["ID", "Name", "Image URL", "Email"];
        var numberOfRenderedItems = parameters.length;
        
        for (let i=0; i<numberOfRenderedItems; ++i) {
            console.log(`${profileParameterNames[i]}: ${parameters[i]}`)
        }
    }
    function onSignOut() {
        console.log('User signed out.');
        /**Triggers page refresh */
        window.parent.location = window.parent.location.href;
    }

    return (
        <React.Fragment>
            <div id="signInButton" className={classes.signInButton} onClick={() => {signInPopupToggle()}}>SIGN IN</div>
            <div id="signInPopup" className={classes.signInPopup}>
                <div id="signInPopupCloseButton" className={classes.signInPopupCloseButton} onClick={() => {signInPopupToggle()}}>X CLOSE</div>
                <form noValidate autoComplete="on" onSubmit={(event) => { event.preventDefault(); console.log(`received ${emailEntered} & ${passwordEntered}`); }}>
                    <TextField 
                        variant="outlined"
                        label="Email" 
                        classes={{root: classes.signInPopUpForm}} 
                        type="email" 
                        name="user_email"  
                        onChange = {handlePasswordInputChange}
                        value = {emailEntered}
                    /><br/>
                    <TextField 
                        variant="outlined"
                        label="Password" 
                        classes={{root: classes.signInPopUpForm}} 
                        type="password" 
                        name="user_password"  
                        onChange = {handlePasswordInputChange}
                        value = {passwordEntered}
                    /><br/>
                    <Button variant="contained" color="primary" type="submit" classes={{root: classes.signInPopUpForm}}>
                        Submit
                    </Button>
                </form>
                <br/>
                <div><u>Alternate Sign In</u></div>
                <GoogleLogin
                    clientId="264618720481-jsdkhtj62lvt1agk3ejk1qec1vmtkp3b.apps.googleusercontent.com"
                    buttonText="Google Login"
                    onSuccess={onGoogleSignIn}
                    onFailure={onGoogleSignInFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />

                {/** 
                <GoogleLogout
                    clientId="264618720481-jsdkhtj62lvt1agk3ejk1qec1vmtkp3b.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={onSignOut}
                    render={renderProps => (
                        //Remove "render" to render the default Google sign in button
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Custom Google button</button>
                    )}
                />
                */}
            </div>
        </React.Fragment>
    );
}

