var config = {
  apiKey: "AIzaSyCLsYnNTsRxlyVZYlV5RvMagWslqOPJ-A4",
  authDomain: "de1database-e9ea2.firebaseapp.com",
  databaseURL: "https://de1database-e9ea2.firebaseio.com",
  projectId: "de1database-e9ea2",
  storageBucket: "de1database-e9ea2.appspot.com",
  messagingSenderId: "5729486823"
};
firebase.initializeApp(config);
var chatRef = firebase.database().ref();
var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("hide").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = email_id;
      chat.setUser(email_id + user.uid.substr(10, 8));

    }

  } else {
    // No user is signed in.
    firebase.auth().signInAnonymously().catch(function(error) {
      console.log("Error Logge inn:", error);
    });
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("hide").style.display = "none";

  }

function login(){

  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}
function logout(){
  firebase.auth().signOut();
}