// content.js

const elementSelector = 'tp-yt-paper-dialog.style-scope.ytd-popup-container';

function removeElement() {
  const element = document.querySelector(elementSelector);
  if (element) {
    element.remove();
  }
}

// Observe changes in the DOM
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      removeElement();
    }
  }
});

observer.observe(document.documentElement, { childList: true, subtree: true });

// Call the removeElement function initially
removeElement();
