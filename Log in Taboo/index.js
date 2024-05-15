let authToken;
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.querySelector(".name").value;
    const password = document.querySelector(".password").value;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!"); // You can handle the success response as needed
        // console.log(data); // Output response data to console (for debugging)
        authToken = data.token;
        localStorage.setItem('token', data.token);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to login");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  });

})



export function getCurrentUser() {

  fetch('http://localhost:5000/currentUser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}` // Include the actual authentication token here
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch current user');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data containing the current user details
      console.log('Current user:', data.user);
    })
    .catch(error => {
      console.error('Error fetching current user:', error);
    });
}