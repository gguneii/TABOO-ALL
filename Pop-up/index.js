const editableItems = document.querySelectorAll('.seed-word li');

// Add input event listeners to each editable item
editableItems.forEach(item => {
    const span = item.querySelector('span');
    
    
    item.addEventListener('input', function() {
        // Show or hide placeholder based on content
        span.style.display = item.textContent.trim() === '' ? 'inline' : 'none';
        // Change the background color to white when typing starts
        item.style.backgroundColor = '#5760e6';
        item.style.color = 'white';
        
    });
    span.addEventListener('click', function() {
        // Remove the span element
        item.removeChild(span);
        // Set contenteditable attribute to true for the li element
        item.contentEditable = true;
        // Set focus to the li element
        item.focus();
    });
    item.addEventListener('blur', function() {
                if (span.textContent.trim() === '') {
                    span.textContent = 'Your word';
                }
            });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cardForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("Form submission prevented");

        // Get the main word from the input
        const mainWordInput = document.getElementById("mainword");
        const mainWord = mainWordInput.value.trim();
        console.log("Main word:", mainWord);

        // Get all forbidden words from the editable list items
        const forbiddenWordsElements = document.querySelectorAll("li[contenteditable='true']");
        const forbiddenWords = [];
        forbiddenWordsElements.forEach((element) => {
            const word = element.innerText.trim();
            if (word) {
                forbiddenWords.push(word);
            }
        });
        console.log("Forbidden words:", forbiddenWords);

        // Validate input
        if (!mainWord) {
            console.error("Main word is required");
            alert("Main word is required");
            return;
        }
        if (forbiddenWords.length !== 12) {
            console.error("Exactly 12 forbidden words are required");
            alert("Please enter exactly 12 forbidden words");
            return;
        }

        // Prepare the data to be sent
        const cardData = {
            mainWord: mainWord,
            forbiddenWords: forbiddenWords,
        };
        console.log("Card data to be sent:", cardData);

        // Send the data to the server using Fetch API
        try {
            const response = await fetch("http://localhost:5000/card", { // Change the URL to match your backend server
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cardData),
            });

            const result = await response.json();
            console.log("Server response:", result);

            if (response.ok) {
                alert("Card added successfully");
                form.reset(); // Clear the form after successful submission
                
                // Clear content of editable list items
                forbiddenWordsElements.forEach((element) => {
                    element.innerText = "Your word";
                });
                
                mainWordInput.value = ""; // Clear the main word input field
            } else {
                console.error("Failed to add card:", result.error);
                alert("Failed to add card: " + result.error);
            }
        } catch (error) {
            console.error("Error occurred while adding card:", error);
            alert("Error occurred while adding card");
        }
    });
});


// async function addCard() {
//     const seedWordInput = document.querySelector('.seed-word input');
//     const seedWord = seedWordInput.value.trim();

//     const forbiddenWordsList = document.querySelectorAll('.content li span');
//     const forbiddenWords = Array.from(forbiddenWordsList).map(word => word.textContent.trim());

//     try {
//         const response = await fetch('/card', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ mainWord: seedWord, forbiddenWords })
//         });

//         console.log('Response:', response); // Log the response

//         const data = await response.json();
//         console.log('Data:', data); // Log the parsed JSON data

//         if (response.ok) {
//             alert('Card added successfully');
//             // Optionally, redirect or perform any other action upon success
//         } else {
//             alert(data.error || 'Failed to add card');
//         }
//     } catch (error) {
//         console.error('Error adding card:', error);
//         alert('Failed to add card');
//     }
// }




// document.addEventListener('DOMContentLoaded', function () {
//     const seedWordInput = document.querySelector('.seed-word input');
//     const okButton = document.querySelector('.ok');

//     // Function to send a new card to the backend
//     async function addCard(seedWord) {
//         try {
//             const response = await fetch('http://localhost:5000/addCard', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ seedWord })
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to add card');
//             }
//             const newCard = await response.json();
//             return newCard;
//         } catch (error) {
//             console.error('Error adding card:', error);
//             throw error;
//         }
//     }

//     // Event listener for the OK button
//     okButton.addEventListener('click', async function () {
//         const seedWord = seedWordInput.value.trim();
//         if (seedWord) {
//             try {
//                 const newCard = await addCard(seedWord);
//                 // Handle the new card if needed (e.g., display it on the page)
//                 console.log('New card added:', newCard);
//             } catch (error) {
//                 console.error('Error adding card:', error);
//             }
//         } else {
//             alert('Please enter a seed word');
//         }
//     });

// });

// document.addEventListener('DOMContentLoaded', async function () {
//     const url = 'http://localhost:5000/getAllCards'; // Backend server URL

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         // Handle received cards data, you can render it on the page or do other actions here
//         console.log(data);
//     } catch (error) {
//         console.error('There was a problem fetching cards:', error.message);
//         // Handle error, maybe show an error message to the user
//     }
// });



