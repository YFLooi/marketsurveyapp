//Images used
import contentHeaderBackground from "./icons/header.png";

export const styleObject = { 
  MainPage: {
    minHeight: "100%",
    width: "100%",
    display: "flex", /**Allows children to use flex-grow to fill white space */
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  menuBar: {
    width: "100%",    
    maxHeight: "5vh",
    background: "linear-gradient(to right, #b5e8fc, #87d7f7, #00b7ff)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px"
  },
  menuBarLogo: {
    width:90,
    cursor:"pointer"
  },
  /*left and right leaves extra space*/
  menuBarLeft: {
    flex: "1 1",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20
  },
  menuBarRight: {
    flex: "2 2",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20
  },
  header: {
    textAlign: "center",
    minHeight: "95vh",
    color: "white",
    padding: 5,
    flex: "1 1 auto", /**Header allowed 1/4 of all available height */

    backgroundImage: `url(${contentHeaderBackground})`,
    backgroundPositionX: "50%",
    backgroundPositionY: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll",
    backgroundSize: "cover",
    overflowX: "hidden",
    overflowY: "hidden"
  },
  headerStartButton: {
    background: "linear-gradient(to right, #87d7f7, #00b7ff)"
  },
  userFunnel:{
    position: "fixed",
    display: "none",
    width: "100vw",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 5
  },
  userFunnel_background: {
    position: "absolute",
    backgroundColor: "black", 
    width: "100%",
    height: "100%",
    opacity: 0.8,
    zIndex: -1
  },
  userFunnel_closeButton:{
    position: "absolute",
    fontSize: 25,
    fontFamily: "Arial",
    top: 30,
    right: 30,
    cursor: "pointer",
    color: "white",
  },
  userFunnel_contentBody:{
    backgroundColor: "white",
    height: "75%",
    width: "80%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 80
  },
  userFunnel_contentBody_card:{
    flex: "1 0 auto",
    minWidth: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 10
  },
  userFunnel_contentBody_cardImage:{
    width: "auto", 
    minWidth: 130,  
    minHeight: 130,
    backgroundPositionX: "50%",
    backgroundPositionY: "center", 
    backgroundRepeat: "no-repeat", 
    backgroundSize: "contain"
  },
  contentCard: {
    minHeight: "50vh",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
 
    backgroundPositionX: "50%",
    backgroundPositionY: "center", 
    backgroundRepeat: "no-repeat", 
    backgroundSize: "cover"
  },
  contentCard_body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    color: "white",
    backgroundColor: "black",
    opacity: 0.8,
    width: "80%",
    height: "90%",
    padding: 20
  },
  mediaLinks: {
    backgroundColor: "#001321",
    minHeight: 300,
    width: "100%",
    padding: 30,
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white"
  },
  mediaLinks_mediaIcons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  }
}