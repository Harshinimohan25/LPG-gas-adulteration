// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtx5goLajG95oO05uhstQWde0gGRoHiR8",
    authDomain: "lpg-gas-df611.firebaseapp.com",
    databaseURL: "https://lpg-gas-df611-default-rtdb.firebaseio.com",
    projectId: "lpg-gas-df611",
    storageBucket: "lpg-gas-df611.firebasestorage.app",
    messagingSenderId: "189799133286",
    appId: "1:189799133286:web:8cb3ccbbf4fb91262f3da7"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Sign Up & Store User Details in Firestore
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message");

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let userId = userCredential.user.uid;

            // Store additional user data in Firestore
            return db.collection("users").doc(userId).set({
                name: name,
                email: email,
                phone: phone,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            message.style.color = "green";
            message.textContent = "Sign Up Successful!";
        })
        .catch((error) => {
            message.style.color = "red";
            message.textContent = error.message;
        });
});

// Fetch All Users from Firestore
document.getElementById("fetch-users").addEventListener("click", function () {
    let userList = document.getElementById("user-list");
    userList.innerHTML = "";

    db.collection("users").orderBy("createdAt", "desc").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let userData = doc.data();
                let li = document.createElement("li");
                li.textContent = `Name: ${userData.name}, Email: ${userData.email}, Phone: ${userData.phone}`;
                userList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
        });
});
