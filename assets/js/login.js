//PSUDOCODE FOR THE LOGIN
    //Make a modal for first login
    //Autofill for logins, if that isn't automatic?
    //Load all a user's files in the file tab
        //When a user opens the file, it's corresponding text appears below
    //Also ability to make new in file tab
        //With a file open, whenever a user types anything, replace the text on the database with the text in the box

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

// attach event listener to newuser button
$("#new-user-btn").on("click", function(event) { //get user info
    event.preventDefault(); // prevent default behavior
    // grab values from password and email fields
    var email = $("#username-input").val().trim();
    var password = $("#password-input").val().trim();
    // make a request to firebase
    //Writing user data to the AUTHENTICATION
    createUser(email, password);
    //Writing user data to the DATABASE
    writeUserData(email, password);
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      console.log("User ID:" + user.uid);
      var userId = user.uid;
      return userId; 
    } else {
      // User not logged in or has just logged out.
    }
});

//adding user data to the Database
function writeUserData(email, password, userId) {
    firebase.database().ref('users/' + userId).set({
      email: email,
      password: password
      //user data
    });
}
//TODO: USE THIS TO LOAD TEXT IN THE MAIN BODY TO THE PAGE/SAVE IT TO THE DATABASE

// attach event listener to login button
$("#login-btn").on("click", function(event) { //get user info
    event.preventDefault(); // prevent default behavior
    // grab values from password and email fields
    var email = $("#username-input").val().trim();
    var password = $("#password-input").val().trim();
    // make a request to firebase
    signInUser(email, password);

    //TODO: WHEN A USER LOGS IN, LOADS THEIR FILES AND THE TOPICS ARRAY
});

// new user request to firebase
function createUser(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

// sign in request to firebase
function signInUser(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}



//TODO -- signout button