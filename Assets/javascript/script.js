$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBFWVDcFXsN96XZWWWh4A6AdPAh6Fg-QOg",
        authDomain: "homework-07-20.firebaseapp.com",
        databaseURL: "https://homework-07-20.firebaseio.com",
        projectId: "homework-07-20",
        storageBucket: "homework-07-20.appspot.com",
        messagingSenderId: "1068760923291"
    }; // Config

    firebase.initializeApp(config);

    // Create A Variable For The Database
    var data = firebase.database();

    var keys = [];

    $("#add").on("click", function(event) {
        // Avoid Reloading The Page
        event.preventDefault();
        // Grab The Input Values
        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var first = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();
        // Check The Variables
        console.log(name);
        console.log(destination);
        console.log(first);
        console.log(frequency);
        
        // Push To The Database
        var newTrain = {
            name: name,
            destination: destination,
            firstTrain: first,
            frequency: frequency
        }

        keys.push(data.ref().push(newTrain).key);
        console.log(keys);
    }); // Add Function 

    data.ref().on("child_added", function(snapshot) {
        // Snapshot Value 
        console.log(snapshot.val());
        var snap = snapshot.val();

        // Build The Table
        var newName = snap.name;
        var newDestination = snap.destination;
        var newFirst = snap.firstTrain;
        var newFrequency = snap.frequency;
        var minutes = 0;
        var nextArrival;
        var Arrival;

        // Calculate The Next Train
        nextTrain(newFirst, newFrequency);

        $(".trainList").append('<tr><td>' + newName + "</td>" + "<td>" + newDestination + "</td>" + "<td>" + newFrequency + "</td>" + "<td>" + window.Arrival + "</td>" + "<td>" + window.minutes + "</td></tr>");
        

        // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    }); // On Child Added

    function nextTrain(newFirst, newFrequency) {
        console.log(newFirst);
        console.log(newFrequency);   

        var current = moment().format("HH:mm");
        console.log(current);

        var trainTime = moment(newFirst, "HH:mm");

        nextArrival = trainTime.add(newFrequency, "m");
        console.log(moment(nextArrival).format("HH:mm"));

        Arrival = moment(nextArrival).format("HH:mm");
        console.log(Arrival);

        minutes = nextArrival.diff(moment(), "minutes");
        console.log(minutes);

        // return;
    };

}); // Document Ready