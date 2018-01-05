var config = {
  apiKey: "AIzaSyCLsYnNTsRxlyVZYlV5RvMagWslqOPJ-A4",
  authDomain: "de1database-e9ea2.firebaseapp.com",
  databaseURL: "https://de1database-e9ea2.firebaseio.com",
  projectId: "de1database-e9ea2",
  storageBucket: "de1database-e9ea2.appspot.com",
  messagingSenderId: "5729486823"
};
firebase.initializeApp(config);
var firestore = firebase.firestore();

const docRef = firestore.doc("Data/1");
const outputHeader = document.querySelector("#Output");
const inputTextField = document.querySelector("#status");
const saveButton = document.querySelector("#SaveButton");
const loadButton = document.querySelector("#LoadButton");

saveButton.addEventListener("click", function() {
  const textToSave = inputTextField.value;
  console.log("Lagrer " + textToSave);
  docRef.set({
    statusx: textToSave
  }).then(function() {
    console.log("Lastet opp!")
  }).catch(function (error){
    console.log("Error:", error);
  });
});

getRealtimeUpdates = function() {
  docRef.onSnapshot({includeMetadataChanges: true}, function (doc) {
    if (doc && doc.exists) {
      const myData = doc.data();
      console.log("Fikk:", doc);
      outputHeader.innerText = "Info om fag: " + myData.statusx;
    }
  });
}

getRealtimeUpdates();