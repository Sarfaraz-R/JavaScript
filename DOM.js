/* ==================================
   DOM MANIPULATION CHEATSHEET
==================================
*/

// --- 1. SELECTING ELEMENTS ---
// Select a single element by its ID (most common)
const mainHeading = document.getElementById('main-heading');

// Select the *first* element that matches a CSS selector
const container = document.querySelector('.container');
const actionButton = document.querySelector('#action-btn');

// Select *all* elements that match a CSS selector (returns a NodeList, like an array)
const allParagraphs = document.querySelectorAll('.container p');
const allListItems = document.querySelectorAll('#item-list li');


// --- 2. MODIFYING CONTENT & ATTRIBUTES ---
// Change the text content (Best for text, it's safer)
mainHeading.textContent = 'JS DOM Cheatsheet';

// Change the inner HTML (Use when you need to insert HTML tags)
container.innerHTML = '<h2>New Content</h2><p>The old paragraphs are gone!</p>';

// Modify an attribute
const inputField = document.getElementById('my-input');
inputField.setAttribute('placeholder', 'New placeholder text!');
// You can also access them like properties
inputField.value = 'Default Value';


// --- 3. MODIFYING STYLES & CLASSES ---
// Change inline CSS styles directly
mainHeading.style.color = 'crimson';
mainHeading.style.backgroundColor = '#333'; // CSS 'background-color' becomes 'backgroundColor' (camelCase)
mainHeading.style.padding = '10px';

// Manipulate CSS classes (The BEST way to change styles)
allListItems[0].classList.add('highlight');     // Add a class
allListItems[1].classList.remove('highlight');  // Remove a class (if it exists)
allListItems[2].classList.toggle('highlight');  // Add if it doesn't exist, remove if it does


// --- 4. CREATING & ADDING ELEMENTS ---
const itemList = document.getElementById('item-list');

// 1. Create a new element
const newItem = document.createElement('li');

// 2. Add content and classes to it
newItem.textContent = 'Newly Added Fourth Item';
newItem.classList.add('highlight');

// 3. Append it to a parent in the DOM
itemList.appendChild(newItem); // Adds it to the end
// itemList.prepend(newItem); // Adds it to the beginning


// --- 5. EVENT HANDLING ---
// Listen for events on an element
const myButton = document.getElementById('action-btn');

myButton.addEventListener('click', () => {
    // This code runs every time the button is clicked
    console.log('Button was clicked!');
    
    // Example: Toggle a class on the heading when clicked
    mainHeading.classList.toggle('highlight');
    
    // Example: Add a new list item with the input's value
    const textValue = inputField.value;
    if (textValue.trim() !== '') { // Only add if not empty
        const dynamicItem = document.createElement('li');
        dynamicItem.textContent = textValue;
        itemList.appendChild(dynamicItem);
        inputField.value = ''; // Clear the input field
    }
});

// You can listen for other events too, like 'mouseover' or 'input'
inputField.addEventListener('input', (event) => {
    // 'event.target' is the element that triggered the event
    console.log(`User is typing: ${event.target.value}`);
});


// --- 6. DOM TRAVERSAL ---
// Moving between elements
const firstListItem = document.querySelector('#item-list li');

// Get the parent element
console.log(firstListItem.parentElement); // Logs the <ul> element

// Get the children elements
console.log(itemList.children); // Logs an HTMLCollection of all <li>s