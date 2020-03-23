import React, { useEffect, useState }  from "react";
import { makeStyles} from '@material-ui/core/styles';
import { 
    Box, 
    Button,
    Typography 
} from "@material-ui/core";
import { GoogleLogin, GoogleLogout } from 'react-google-login'; //using a HTML <script> for GoogleOAuth does not work in React

const useStyles = makeStyles(theme => ({ 
    buttonBox:{
        border: "1px solid black"
    }
}))

function GoogleSignIn() {
    const classes = useStyles();

    //getBasicProfile() is a method to get info from GId that signed in
    function onSignIn(googleUser) {
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
    function onSignInFailure() {
        console.log("Login failed!")
    }
    function renderProfile(parameters){
        var profileParameterNames = ["ID", "Name", "Image URL", "Email"];
        var renderedItems = [];
        var numberOfRenderedItems = parameters.length;
        var renderTarget = document.getElementById("userDetails");
        
        for (let i=0; i<numberOfRenderedItems; ++i) {
            var childDiv = document.createElement("div");
            childDiv.appendChild(document.createTextNode(`${profileParameterNames[i]}: ${parameters[i]}`));
            renderTarget.appendChild(childDiv);
            renderedItems.splice(renderedItems.length, 0, childDiv)
        }

        return renderedItems; //For testing only
    }
    function onSignOut() {
        console.log('User signed out.');
        /**Triggers page refresh */
        window.parent.location = window.parent.location.href;
    }

  return (
    <div className="App">
        <h1>Login/logout tester</h1>
        <GoogleLogin
            clientId="264618720481-jsdkhtj62lvt1agk3ejk1qec1vmtkp3b.apps.googleusercontent.com"
            buttonText="Google Login"
            onSuccess={onSignIn}
            onFailure={onSignInFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
        <GoogleLogout
            clientId="264618720481-jsdkhtj62lvt1agk3ejk1qec1vmtkp3b.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={onSignOut}
            render={renderProps => (
                /**Remove "render" to render the default Google sign in button*/
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Custom Google button</button>
            )}
        />
        <h1>Details of signee</h1>
        <div id="userDetails"></div>
    </div>
  );
}

export default GoogleSignIn;
