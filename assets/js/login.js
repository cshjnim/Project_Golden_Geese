//Initialize Firebase
var config = {
    apiKey: "AIzaSyBtr7RXc1xMn2Dpaq4clWNqINsWAfBwag0",
    authDomain: "wordcloud-cd654.firebaseapp.com",
    databaseURL: "https://wordcloud-cd654.firebaseio.com",
    projectId: "wordcloud-cd654",
    storageBucket: "wordcloud-cd654.appspot.com",
    messagingSenderId: "835307039957",
    appId: "1:835307039957:web:3736745b8d1d54d986465c"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

//TYPING TIMER TO SAVE TO DATABASE
var typingTimer;                
var doneTypingInterval = 5000;  //5 second timer
var textInput = $('#content-box');

//on keyup, start the countdown
textInput.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
textInput.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is finished typing
function doneTyping () {
    console.log("Done typing");
    //save the data to Firebase
    var textBody = $("#content-box").val();
    console.log(textBody);
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    if (user && user != null) {
    //Writing user data to the DATABASE
        firebase.database().ref('users/' + userId ).child('text').set(
            textBody
            //user text
        );
    }
}

//================NEW USER=================

// attach event listener to newuser button
$("#new-user-btn").on("click", function(event) { //get user info
    event.preventDefault(); // prevent default behavior
    // grab values from password and email fields
    var email = $("#username-input").val().trim();
    var password = $("#password-input").val().trim();
    // make a request to firebase
    //Creating user data for the AUTHENTICATION
    createUser(email, password);
    password = $("#password-input").val("");
});

// new user request to firebase
function createUser(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

//Writing user data to the Database
function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }
  

//FUNCTION TO GET CURRENTLY SIGNED IN USER
$( document ).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var user = firebase.auth().currentUser; 
            var name, email, uid;
            if (user != null) {
                name = user.displayName;
                email = user.email;
                uid = user.uid;
                //LOAD STUFF
            } else {
            // No user is signed in.
            console.log("No User Logged In");
            }
        }
    });
});

//================LOGIN=================

//* * * TODO: USE THIS TO LOAD TEXT IN THE MAIN BODY TO THE PAGE/SAVE IT TO THE DATABASE
//Load all a user's files in the file tab
        //When a user opens the file, it's corresponding text appears below
    //Also able to make new in file tab

// attach event listener to login button
$("#login-btn").on("click", function(event) { //get user info
    event.preventDefault(); // prevent default behavior
    // grab values from password and email fields
    var email = $("#username-input").val().trim();
    var password = $("#password-input").val().trim();
    // make a request to firebase
    signInUser(email, password);
    password = $("#password-input").val("");
    //* * * TODO: WHEN A USER LOGS IN, LOADS THEIR FILES AND THE TOPICS ARRAY
});

// sign in request to firebase
function signInUser(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
    //load text to text box once signed in
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId + '/text').once('value').then(function(snapshot) {
        console.log(snapshot);
        $("#content-box").val(snapshot.node_.value_);
    });


}


//* * * TODO -- signout button


//Show password function:
function myFunction() {
    var x = document.getElementById("password-input");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}