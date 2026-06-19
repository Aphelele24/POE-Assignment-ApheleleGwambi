// HOME PAGE
// Get elements
const video = document.getElementById("myVideo");
const playBtn = document.getElementById("playBtn");
const container = document.querySelector(".video-container");

// ▶ Play video when clicking container
container.addEventListener("click", () => {
  video.play();
  playBtn.style.display = "none";
});

// ⏸ Show play button again when paused
video.addEventListener("pause", () => {
  playBtn.style.display = "block";
});
// contact.js

(function () {
  // STEP 1: Initialize EmailJS with your Public Key
  emailjs.init("eAkFkj8OQfkKGCdHj");

  // STEP 2: Get form element
  const form = document.getElementById("contactForm");

  // STEP 3: Handle form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // STEP 4: Send email using Service ID + Template ID
    emailjs.sendForm(
      "service_mqmx4p7",    
      "template_z22xxkz",   
      this
    )
    .then(() => {
      alert("✅ Message sent successfully!");
      form.reset();
    })
    .catch((error) => {
      alert("❌ Failed to send message: " + error.text);
      console.log("EmailJS Error:", error);
    });
  });
})();
document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Stop form from refreshing the page instantly
    event.preventDefault();

    // Field handles
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    // Error text placeholders
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Clear previous errors 
    clearValidationState(nameField, nameError);
    clearValidationState(emailField, emailError);
    clearValidationState(messageField, messageError);

    let isFormValid = true;

    // 1. Validate Name Field
    if (nameField.value.trim() === "") {
        applyErrorState(nameField, nameError, "Name field cannot be left empty.");
        isFormValid = false;
    } else if (nameField.value.trim().length < 2) {
        applyErrorState(nameField, nameError, "Name must be at least 2 characters.");
        isFormValid = false;
    }

    // 2. Validate Email Field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value.trim() === "") {
        applyErrorState(emailField, emailError, "Email address is required.");
        isFormValid = false;
    } else if (!emailRegex.test(emailField.value.trim())) {
        applyErrorState(emailField, emailError, "Please enter a valid email layout (e.g. user@domain.com).");
        isFormValid = false;
    }

    // 3. Validate Message Box
    if (messageField.value.trim() === "") {
        applyErrorState(messageField, messageError, "Please leave a message outline.");
        isFormValid = false;
    }

    // 4. Submit if fields verified successfully
    if (isFormValid) {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const templateParams = {
            from_name: nameField.value.trim(),
            reply_to: emailField.value.trim(),
            message: messageField.value.trim()
        };

        // Replace placeholders below with actual parameters from EmailJS dashboard if required
        emailjs.send('service_mqmx4p7', 'template_z22xxkz', templateParams)
            .then(function() {
                submitBtn.textContent = "Message Sent!";
                document.getElementById('contactForm').reset();
                setTimeout(() => {
                    submitBtn.textContent = "Send Message";
                    submitBtn.disabled = false;
                }, 3000);
            }, function(error) {
                submitBtn.textContent = "Error Sending. Retry";
                submitBtn.disabled = false;
                console.error("Transmission Failure:", error);
            });
    }
});

// Helper: Make error warning visible exactly on target field wrapper
function applyErrorState(inputElement, errorElement, message) {
    inputElement.classList.add('field-invalid');
    errorElement.textContent = message;
    errorElement.style.visibility = 'visible';
}

// Helper: Strip error styles away smoothly
function clearValidationState(inputElement, errorElement) {
    inputElement.classList.remove('field-invalid');
    errorElement.textContent = 'name-error';
    errorElement.style.visibility = 'hidden';
}
// code for enquiry//
(function() {
    emailjs.init("eAkFkj8OQfkKGCdHj"); // <-- Replace with your actual Public Key
})();

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("enquiry-form");
    const statusDisplay = document.getElementById("form-status");

    form.addEventListener("submit", function (event) {
        // Prevent the page from automatically reloading
        event.preventDefault();

        // Clear any old messages
        statusDisplay.innerText = "";
        statusDisplay.style.color = "black";

        // Grab values from input elements
        const fname = document.getElementById("fname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // --- VALIDATION RULES ---

        // Check for empty fields
        if (!fname || !email || !phone || !message) {
            statusDisplay.innerText = "Error: All fields are required.";
            statusDisplay.style.color = "red";
            return;
        }

        // Validate email structure via Regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            statusDisplay.innerText = "Error: Please enter a valid email address.";
            statusDisplay.style.color = "red";
            return;
        }

        // Validate phone number structure (allows digits, spaces, dashes, minimum 7 digits)
        const phonePattern = /^[0-9\s\-]{7,15}$/;
        if (!phonePattern.test(phone)) {
            statusDisplay.innerText = "Error: Please enter a valid phone number.";
            statusDisplay.style.color = "red";
            return;
        }

        // --- EMAILJS TRANSMISSION ---
        statusDisplay.innerText = "Sending your enquiry...";
        statusDisplay.style.color = "blue";

        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS configurations
        emailjs.sendForm('service_mqmx4p7', 'template_z22xxkz', form)
            .then(function () {
                statusDisplay.innerText = "Success! Your enquiry has been sent.";
                statusDisplay.style.color = "green";
                form.reset(); // Wipe form inputs clear upon success
            }, function (error) {
                statusDisplay.innerText = "Failed to send email. Please try again later.";
                statusDisplay.style.color = "red";
                console.error("EmailJS Error details:", error);
            });
    });
});