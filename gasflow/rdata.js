// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to update gas level UI dynamically
function updateGasLevel(gasLevel) {
    const dataElement = document.getElementById("data");
    const progress = document.getElementById("progress");
    const alertMsg = document.getElementById("alert-msg");

    dataElement.innerHTML = `<strong>Gas Level: ${gasLevel} PPM</strong>`;
    
    // Ensure progress bar width doesn't exceed 100%
    progress.style.width = `${Math.min(gasLevel / 2, 100)}%`;

    // Set alert levels
    if (gasLevel < 50) {
        progress.style.background = "green";
        alertMsg.textContent = "✅ Safe Gas Level";
        alertMsg.style.color = "green";
    } else if (gasLevel >= 50 && gasLevel < 100) {
        progress.style.background = "orange";
        alertMsg.textContent = "⚠️ Warning: Moderate Gas Level";
        alertMsg.style.color = "orange";
    } else {
        progress.style.background = "red";
        alertMsg.textContent = "❌ Danger: High Gas Adulteration!";
        alertMsg.style.color = "red";
    }
}

// Function to fetch real-time gas sensor data
function fetchData() {
    const dataDiv = document.getElementById("data");
    const gasRef = ref(database, "GasSensors");

    onValue(gasRef, (snapshot) => {
        if (snapshot.exists()) {
            const gasData = snapshot.val();

            // Extract MQ-4 and MQ-6 sensor values
            let methaneLevel = gasData.MQ4?.Methane || 0;
            let cngLevel = gasData.MQ4?.CNG || 0;
            let naturalGasLevel = gasData.MQ4?.NaturalGas || 0;
            let lpgLevel = gasData.MQ6?.LPG || 0;
            let butaneLevel = gasData.MQ6?.Butane || 0;
            let propaneLevel = gasData.MQ6?.Propane || 0;

            // Display the data
            let output = `
                <h3>MQ-4 Sensor Data</h3>
                <p><strong>Methane:</strong> ${methaneLevel} PPM</p>
                <p><strong>CNG:</strong> ${cngLevel} PPM</p>
                <p><strong>Natural Gas:</strong> ${naturalGasLevel} PPM</p>
                <h3>MQ-6 Sensor Data</h3>
                <p><strong>LPG:</strong> ${lpgLevel} PPM</p>
                <p><strong>Butane:</strong> ${butaneLevel} PPM</p>
                <p><strong>Propane:</strong> ${propaneLevel} PPM</p>`;

            dataDiv.innerHTML = output;

            // Update the gas level display using Methane (or choose any relevant gas)
            updateGasLevel(methaneLevel);
        } else {
            dataDiv.innerHTML = "<p>No data available.</p>";
            document.getElementById("alert-msg").textContent = "No data received!";
            document.getElementById("alert-msg").style.color = "gray";
        }
    }, (error) => {
        console.error("Error fetching data:", error);
        document.getElementById("alert-msg").textContent = "Error fetching data!";
        document.getElementById("alert-msg").style.color = "red";
    });
}

// Fetch data every 3 seconds for real-time updates
setInterval(fetchData, 3000);




// // Import Firebase Modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// // Firebase Configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBtx5goLajG95oO05uhstQWde0gGRoHiR8",
//     authDomain: "lpg-gas-df611.firebaseapp.com",
//     databaseURL: "https://lpg-gas-df611-default-rtdb.firebaseio.com",
//     projectId: "lpg-gas-df611",
//     storageBucket: "lpg-gas-df611.firebasestorage.app",
//     messagingSenderId: "189799133286",
//     appId: "1:189799133286:web:8cb3ccbbf4fb91262f3da7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// // Ensure DOM is loaded before running the script
// document.addEventListener("DOMContentLoaded", function () {
//     let ctx = document.getElementById("gasChart");

//     // Check if canvas exists
//     if (!ctx) {
//         console.error("Canvas element with id 'gasChart' not found!");
//         return;
//     }

//     ctx = ctx.getContext("2d");

//     // Create Chart.js Bar Chart
//     let gasChart = new Chart(ctx, {
//         type: "bar",
//         data: {
//             labels: ["Methane", "CNG", "Natural Gas", "LPG", "Butane", "Propane"],
//             datasets: [{
//                 label: "Gas Levels (PPM)",
//                 data: [0, 0, 0, 0, 0, 0], // Default values
//                 backgroundColor: ["green", "green", "green", "green", "green", "green"]
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     max: 200 // Adjust based on your sensor range
//                 }
//             }
//         }
//     });

//     // Function to update bar chart dynamically
//     function updateBarChart(methane, cng, naturalGas, lpg, butane, propane) {
//         let gasLevels = [methane, cng, naturalGas, lpg, butane, propane];

//         let backgroundColors = gasLevels.map(level => {
//             if (level < 50) return "green";   // Safe
//             if (level >= 50 && level < 100) return "orange";  // Moderate
//             return "red"; // Danger
//         });

//         gasChart.data.datasets[0].data = gasLevels;
//         gasChart.data.datasets[0].backgroundColor = backgroundColors;
//         gasChart.update();
//     }

//     // Function to fetch real-time gas sensor data
//     function fetchData() {
//         const dataDiv = document.getElementById("data");
//         const gasRef = ref(database, "GasSensors");

//         onValue(gasRef, (snapshot) => {
//             if (snapshot.exists()) {
//                 const gasData = snapshot.val();

//                 let methaneLevel = gasData.MQ4?.Methane || 0;
//                 let cngLevel = gasData.MQ4?.CNG || 0;
//                 let naturalGasLevel = gasData.MQ4?.NaturalGas || 0;
//                 let lpgLevel = gasData.MQ6?.LPG || 0;
//                 let butaneLevel = gasData.MQ6?.Butane || 0;
//                 let propaneLevel = gasData.MQ6?.Propane || 0;

//                 let output = `
//                     <h3>MQ-4 Sensor Data</h3>
//                     <p><strong>Methane:</strong> ${methaneLevel} PPM</p>
//                     <p><strong>CNG:</strong> ${cngLevel} PPM</p>
//                     <p><strong>Natural Gas:</strong> ${naturalGasLevel} PPM</p>
//                     <h3>MQ-6 Sensor Data</h3>
//                     <p><strong>LPG:</strong> ${lpgLevel} PPM</p>
//                     <p><strong>Butane:</strong> ${butaneLevel} PPM</p>
//                     <p><strong>Propane:</strong> ${propaneLevel} PPM</p>`;

//                 dataDiv.innerHTML = output;

//                 updateBarChart(methaneLevel, cngLevel, naturalGasLevel, lpgLevel, butaneLevel, propaneLevel);
//             } else {
//                 dataDiv.innerHTML = "<p>No data available.</p>";
//             }
//         }, (error) => {
//             console.error("Error fetching data:", error);
//         });
//     }

//     // Fetch data every 3 seconds
//     setInterval(fetchData, 3000);
// });


