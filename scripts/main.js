function read_display_Quote() {

    db.collection("quotes").doc("tuesday")
        .onSnapshot(TuesdayDoc => {
            console.log(TuesdayDoc.data());
            document.getElementById("quote-goes-here").innerHTML = TuesdayDoc.data().quote

        })
}
read_display_Quote()

function insertName() {
    // to check if the user is logged in 
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);  // let us know which user logged in to get the uid
            currentUser = db.collection("users").doc(user.uid);     // will go to the firestore and go to the document of the user
            currentUser.get()       // get the document for the current user
            .then(userDoc =>{
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                document.getElementById("name-goes-here").innerText = user_Name;
            })
        }  else {
            // No user is signed in.
        }
    });
}
insertName();