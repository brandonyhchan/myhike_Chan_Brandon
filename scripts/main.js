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


function writeImages() {
    //define a variable for the collection you want to create in Firestore to populate data
    var imageRef = db.collection("images");

    imageRef.add({
        code:"BOW",
        name: "Bow Lake",    
        location: "Banff National Park",
        province: "Alberta",
        details: "Brandon says: Look at this view!"
    });
    imageRef.add({
        code:"VIEW",
        name: "Highway 93 Viewpoint",    
        location: "Banff National Park",
        province: "Alberta",
        details: "Brandon Says: Look at this view!"
    });
    imageRef.add({
        code:"GLAC",
        name: "Athabasca Glacier",    
        location: "Jasper National Park",
        province: "Alberta",
        details: "Brandon Says: Look at this view!"
    });
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);
                var code = doc.data().code;

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + code + ".HEIC"; //hikes.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("images");