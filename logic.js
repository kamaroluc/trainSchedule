  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCKcmW4knwmgfAA9E0YKaxFzkde9WRobMA",
    authDomain: "traintime-986cb.firebaseapp.com",
    databaseURL: "https://traintime-986cb.firebaseio.com",
    projectId: "traintime-986cb",
    storageBucket: "traintime-986cb.appspot.com",
    messagingSenderId: "991798377863"
  };
  firebase.initializeApp(config);
  console.log(" This file is linked")

  var traintime= firebase.database();

  // action on the submit button
  $("#submit").on("click", function(event){
    event.preventDefault();
console.log(" The submit button has been clicked")

// Get inputs
     var trainName = $("#trainName").val().trim();
     var destination = $("#destination").val().trim();
     var trainTime = $("#trainTime").val().trim();
     var frequency = $("#frequency").val().trim();

     //// Change what is saved in firebase
     traintime.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
});

});
 
traintime.ref().on("child_added", function(snapshot){
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var trainTime = snapshot.val().trainTime;
    var frequency = snapshot.val().frequency;

    console.log(trainName, destination, trainTime, frequency);

     // First Time (pushed back 1 year to make sure it comes before current time)
     var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
     console.log(trainTimeConverted);
 
     // Current Time
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
     // Difference between the times
     var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
 
     // Time apart (remainder)
     var tRemainder = diffTime % frequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var tMinutesTillTrain = frequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 
     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var tr = document.createElement('tr');
tr.className ="text-center";
console.log(tr);
tr.innerHTML = `<td>${trainName}</td>
    <td>${destination}</td>
    <td>${frequency}</td>
    <td>${nextTrain}</td>
    <td>${tMinutesTillTrain}`;
 $(".trainDataTable").append(tr);
 

   // Assumptions
  //  var tFrequency = 3;

    // Time is 3:30 AM
  //  var firstTime = "03:30";

   

});
 