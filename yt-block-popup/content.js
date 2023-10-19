// content.js

const elementSelector = 'tp-yt-paper-dialog.style-scope.ytd-popup-container';

let hasStarted = 0; // Variable to track the number of times the video has started
let timer; // Timer to prevent constant checking

// Function to start the video
function startVideo() {
  const videoElement = document.querySelector('video'); // Select the video element

  if (videoElement && videoElement.paused) {
    if (videoElement.currentTime <= 20 && hasStarted < 1) {
      videoElement.play();
      hasStarted++;
    }
    // If the video duration is above 20 seconds, add a delay to check again
    else if (videoElement.duration > 20) {
      clearTimeout(timer); // Clear the existing timer
      // Set a new timer to check every 10 minutes
      timer = setTimeout(checkVideo, 10 * 60 * 1000); // 10 minutes in milliseconds
    }
  }
}

// Function to remove the popup element
function removeElement() {
  const element = document.querySelector(elementSelector);
  if (element) {
    element.remove();
  }
}

// Timer function to prevent constant checking
function checkVideo() {
  startVideo();
}

// Observe changes in the DOM
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      removeElement();
    }
  }
});

// Listen for changes in the video state (e.g., pause and play)
document.querySelector('video').addEventListener('pause', startVideo);

// Add an event listener for page load to start the video and observe the DOM
document.addEventListener('DOMContentLoaded', () => {
  startVideo();
  observer.observe(document.documentElement, { childList: true, subtree: true });
  removeElement(); // Call the removeElement function initially
});
