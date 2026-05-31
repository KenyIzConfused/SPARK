// Placeholder variables for user data (ready to connect to Firebase)
let storedFirstName = '';
let storedSurName = '';
let storedEmail = '';
let storedPassword = '';

/**
 * Updates the stored values whenever form fields change.
 * This is placeholder code that can be connected to Firebase authentication.
 */
function storeFormValues() {
    storedFirstName = document.getElementById('firstName')?.value.trim() || '';
    storedSurName = document.getElementById('surName')?.value.trim() || '';
    storedEmail = document.getElementById('email')?.value.trim() || '';
    storedPassword = document.getElementById('password')?.value || '';
    // here is the code that stores this value
    // In a real implementation, you would send these to Firebase here
    console.log('Stored values:', { storedFirstName, storedSurName, storedEmail, storedPassword });
}

// Attach event listeners to form inputs when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const firstNameInput = document.getElementById('firstName');
    const surNameInput = document.getElementById('surName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (firstNameInput) firstNameInput.addEventListener('input', storeFormValues);
    if (surNameInput) surNameInput.addEventListener('input', storeFormValues);
    if (emailInput) emailInput.addEventListener('input', storeFormValues);
    if (passwordInput) passwordInput.addEventListener('input', storeFormValues);
    
    // Initial store in case values are pre-filled
    storeFormValues();
});