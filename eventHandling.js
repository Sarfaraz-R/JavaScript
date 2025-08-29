console.log("--- Event Handling Script Loaded ---");

// --- 1. The Basics ---
// Property Method
const propertyBtn = document.getElementById('propertyBtn');
propertyBtn.onclick = function() {
    console.log('Clicked via DOM property!');
};

// addEventListener Method
const listenerBtn = document.getElementById('listenerBtn');
listenerBtn.addEventListener('click', function() {
    console.log('Listener 1: Clicked via addEventListener!');
});
listenerBtn.addEventListener('click', function() {
    console.log('Listener 2: Multiple listeners can be attached!');
});

// --- 2. The Event Object ---
const myLink = document.getElementById('myLink');
myLink.addEventListener('click', function(event) {
    event.preventDefault(); // Stop the default browser action
    console.log("Default link navigation prevented by event.preventDefault().");
    console.log("Event Target:", event.target);
});

// --- 3. Event Flow: Bubbling & Capturing ---
const grandparent = document.getElementById('grandparent');
const parent = document.getElementById('parent');
const child = document.getElementById('child');

// BUBBLING listeners (default)
grandparent.addEventListener('click', () => console.log('BUBBLING: Grandparent clicked'));
parent.addEventListener('click', () => console.log('BUBBLING: Parent clicked'));
child.addEventListener('click', () => console.log('BUBBLING: Child clicked (Target Phase)'));

// CAPTURING listener (third argument is true)
grandparent.addEventListener('click', () => console.log('CAPTURING: Grandparent captured'), true);

// --- 4. Event Delegation ---
const itemList = document.getElementById('itemList');
itemList.addEventListener('click', function(event) {
    // Check if the clicked element is an LI
    if (event.target.tagName === 'LI') {
        console.log(`DELEGATION: You clicked on list item: "${event.target.textContent}"`);
    }
});

// --- 5. Removing Event Listeners ---
// Using removeEventListener
const removeBtn = document.getElementById('removeBtn');
function handleRemoveClick() { // Must be a NAMED function to be removable
    console.log('REMOVE: This button was clicked. Now removing its listener.');
    removeBtn.textContent = 'Listener Removed';
    removeBtn.disabled = true;
    removeBtn.removeEventListener('click', handleRemoveClick);
}
removeBtn.addEventListener('click', handleRemoveClick);

// Using the 'once' option
const onceBtn = document.getElementById('onceBtn');
onceBtn.addEventListener('click', function() {
    console.log("ONCE: This message will appear only one time.");
    onceBtn.textContent = 'Fired once!';
    onceBtn.disabled = true;
}, { once: true });

// --- 6. Custom Events ---
const userProfile = document.getElementById('userProfile');
// Listen for our custom event
userProfile.addEventListener('user:login', function(event) {
    console.log('CUSTOM EVENT: "user:login" was caught.', event.detail);
    userProfile.textContent = `Welcome back, ${event.detail.username}!`;
    userProfile.style.color = 'green';
});

// After 2 seconds, dispatch our custom event to simulate a login
setTimeout(() => {
    const loginData = { username: 'Alice', loginTime: Date.now() };
    const loginEvent = new CustomEvent('user:login', { detail: loginData });
    userProfile.dispatchEvent(loginEvent);
}, 2000);

// --- 7. Modern Options (`passive` & `AbortController`) ---
// 'passive' listener
const scrollBox = document.getElementById('scrollBox');
scrollBox.addEventListener('scroll', () => {
    console.log('PASSIVE: Scroll event fired. Browser is not blocked.');
}, { passive: true });

// 'AbortController'
const controller = new AbortController();
const { signal } = controller;
const listenBtn = document.getElementById('listenBtn');
const abortBtn = document.getElementById('abortBtn');

listenBtn.addEventListener('click', () => {
    console.log('ABORT: Listening for this click...');
}, { signal });

abortBtn.addEventListener('click', () => {
    controller.abort(); // Removes the listener from listenBtn
    console.log('ABORT: Listener on the other button has been aborted.');
    listenBtn.disabled = true;
    listenBtn.textContent = 'Listener Aborted';
    abortBtn.disabled = true;
});