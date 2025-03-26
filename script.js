// JavaScript (script.js)
const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const ngrokUrl = "https://0a78-35-247-138-37.ngrok-free.app"; // Replace with your ngrok URL
const displayImage = document.getElementById('displayImage');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            console.log("Video metadata loaded");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            console.log("Canvas dimensions:", canvas.width, canvas.height);
            setInterval(sendFrame, 100); // Send every 100ms
        };
        video.onloadeddata = () => {
          console.log("Video data loaded");
        }
        video.onerror = (error) => {
          console.error("Video element error", error);
        }
    })
    .catch(error => {
        console.error("Error accessing webcam:", error);
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error constraint:", error.constraint);
    });

function sendFrame() {
    console.log("Drawing image to canvas");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    try {
        const imageData = canvas.toDataURL('image/png', 0.9);
