/* This is a file inserted to keep the learn IDE browser happy */
const testVar = {}
// demo.js - full example to restore "like" behavior

// Step 1: grab the heart elements on the page
const articleHearts = document.querySelectorAll('.like-glyph');

// Modal for errors (assumes a #modal element exists in the HTML)
const modal = document.getElementById('modal');
if (modal) {
  // hide the modal initially if it exists
  modal.classList.add('hidden');
}

// Step 2: mock server call (simulates success/failure)
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      // Fail 20% of the time
      if (Math.random() < 0.2) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Helper to show error modal for a short time
function showError(message) {
  if (!modal) {
    // Fallback: console.warn if no modal in DOM
    console.warn("Error (no modal found):", message);
    return;
  }
  modal.textContent = message;
  modal.classList.remove('hidden');
  // hide again after 3 seconds
  setTimeout(() => modal.classList.add('hidden'), 3000);
}

// Step 3: wire up click event listeners that use the mock server
if (articleHearts && articleHearts.length > 0) {
  articleHearts.forEach(heart => {
    heart.addEventListener('click', () => {
      // call the fake server
      mimicServerCall()
        .then(() => {
          // toggle heart between empty and full
          // assuming the markup uses '♡' for empty and '♥' for full,
          // and a class 'activated-heart' is used to color the heart red.
          if (heart.textContent === '' || heart.innerText.trim() === '') {
            heart.textContent = '';
            heart.classList.add('activated-heart');
          } else {
            heart.textContent = '';
            heart.classList.remove('activated-heart');
          }
        })
        .catch(error => {
          // show error to the user
          showError(error);
        });
    });
  });
} else {
  console.warn('No hearts found on the page. Make sure elements have class "like-glyph".');
}
