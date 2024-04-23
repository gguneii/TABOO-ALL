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
