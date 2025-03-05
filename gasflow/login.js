// Show Registration Form
function showRegistration() {
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('registration-form-container').style.display = 'block';
}

// Show Login Form
function showLogin() {
    document.getElementById('registration-form-container').style.display = 'none';
    document.getElementById('login-form-container').style.display = 'block';
}

// Handle Login Form Submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Example: Show alert for demonstration
    alert(`Logged in with ${email}`);
    // In real applications, make a request to backend for authentication
});

// Handle Registration Form Submission
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Example: Show alert for demonstration
    alert(`Registered with ${name}, ${email}`);
    // In real applications, send this data to the backend for registration
});
