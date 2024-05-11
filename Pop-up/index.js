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

document.addEventListener('DOMContentLoaded', function () {
    const addCardButton = document.querySelector('.ok');

    addCardButton.addEventListener('click', async function () {
        const mainWordInput = document.querySelector('.seed-word input');
        const mainWord = mainWordInput.value;

        const forbiddenWordsList = document.querySelectorAll('.seed-word ul li span');
        const forbiddenWords = Array.from(forbiddenWordsList).map(item => item.textContent.trim());

        // Backend server URL
        const url = 'http://localhost:5000/addCard';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mainWord, forbiddenWords })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Handle successful card addition, you can redirect user or do other actions here
            console.log(data);
        } catch (error) {
            console.error('There was a problem adding the card:', error.message);
            // Handle error, maybe show an error message to the user
        }
    });
});




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



