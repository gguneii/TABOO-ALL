// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get a reference to the form element
    const form = document.querySelector("form");

    // Add an event listener for the form's submit event
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form inputs
        const nameInput = form.querySelector("input[placeholder='Enter your name']");
        const passwordInput = form.querySelector("input[placeholder='Password']");

        const username = nameInput.value;
        const password = passwordInput.value;

        // Create a payload for the POST request
        const data = {
            username,
            password
        };

        try {
            // Send a POST request to the /register endpoint
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Specify that the data is in JSON format
                },
                body: JSON.stringify(data) // Convert the payload to JSON
            });

            if (response.ok) {
                // Registration successful
                const responseData = await response.json();
                alert("Registration successful! Your User ID: " + responseData.userId);
                // Optionally, redirect to another page (e.g., login)
                // window.location.href = "index.html";
            } else {
                // Handle errors
                const errorData = await response.json();
                alert("Registration failed: " + errorData.error);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    });
});