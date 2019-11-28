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
    
    //Writing user data to the DATABASE
    writeUserData(email, password);
});

// new user request to firebase
function createUser(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

//:::::::::::DEBUG:::::::::::
//adding user data to the Database
function writeUserData(email, password) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid; //getting the uid from auth
            console.log("writeUserData User ID:" + userId); //for some reason, it is not going to the specific userId requested
            firebase.database().ref('users/' + userId).set({ //It's just going everywhere, rewriting every user on the DB
            email: email,
            password: password,
            uid: userId
            //user data
            });
                
        } else {
          // No user is signed in.
          console.log("No User Logged In");
        }
      });
      
    
    }

//================LOGIN=================

//* * * TODO: USE THIS TO LOAD TEXT IN THE MAIN BODY TO THE PAGE/SAVE IT TO THE DATABASE
//Load all a user's files in the file tab
        //When a user opens the file, it's corresponding text appears below
    //Also ability to make new in file tab
        //With a file open, whenever a user types anything, replace the text on the database with the text in the box

// attach event listener to login button
$("#login-btn").on("click", function(event) { //get user info
    event.preventDefault(); // prevent default behavior
    // grab values from password and email fields
    var email = $("#username-input").val().trim();
    var password = $("#password-input").val().trim();
    // make a request to firebase
    signInUser(email, password);

    //* * * TODO: WHEN A USER LOGS IN, LOADS THEIR FILES AND THE TOPICS ARRAY
});

// sign in request to firebase
function signInUser(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

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
    firebase.database().ref('users/' + userId + "/text").set(
        $("#main-writing").val()
        //user data
    );
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