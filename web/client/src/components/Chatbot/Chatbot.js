import React, { useEffect, useState }  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import dialogflowIcon from "./icons/dialogflowIcon.png"
import closeIcon from "./icons/closeIcon.png"

const useStyles = makeStyles(theme => ({ 
    chatboxIcon:{
        position: "fixed",
        width: 70,
        height: 70,
        bottom: "4%",
        right: "4%",
        zIndex: 20,

        borderRadius: 70,
        border: "1px solid lightgray",

        backgroundColor: "whitesmoke",
        backgroundImage: `url(${dialogflowIcon})`,
        backgroundPosition: "center",
        backgroundSize: "85% 85%",
        backgroundRepeat: "no-repeat", /* Do not repeat the image */
        display: "block",
        cursor: "pointer",
        transitionDuration: "0.2s",
        "&:hover": {
            boxShadow: "0 0 2.5px 5px orange"
        }    
    },
    chatbox: {
        position: "fixed",
        maxWidth: 350,
        maxHeight: 370,
        bottom: "16%",
        right: "4%",
        display: "none",
        flexDirection: "column"
    },
}))
  
function Chatbot() {
    const classes = useStyles();
    
    const [chatboxToggled, setChatboxToggled] = useState(false);

    function toggleChatbox(){
        if(chatboxToggled === false){
        document.getElementById("chatbox").style.display = "flex";
        document.getElementById("chatboxIcon").style.backgroundImage = `url(${closeIcon})`;
        setChatboxToggled(!chatboxToggled);
        }
        if(chatboxToggled === true){
        document.getElementById("chatbox").style.display = "none"
        document.getElementById("chatboxIcon").style.backgroundImage = `url(${dialogflowIcon})`
        setChatboxToggled(!chatboxToggled);
        }
    }

    return (
        <div className="Chatbox">
            <div id="chatboxIcon" className={classes.chatboxIcon} onClick={toggleChatbox}></div>
            <div id="chatbox" className={classes.chatbox}>
                <iframe
                    title="dialogflowChatbox"
                    allow="microphone;"
                    width="350"
                    height="430"
                    src="https://console.dialogflow.com/api-client/demo/embedded/ff3f4667-d9c7-4592-86a1-9ed99c681a59">
                </iframe>
            </div>
        </div>
    );
}
  
export default Chatbot;
