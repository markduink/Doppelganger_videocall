const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const ctx = canvas.getContext('2d');

// Replace with your Flask server URL if using ngrok
const SERVER_URL = "http://localhost:5000/process";  

async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Error accessing webcam:", error);
    }
}

async function sendFrame() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/jpeg').split(',')[1];  // Get Base64 data

    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData })
        });

        const result = await response.json();
        if (result.image) {
            output.src = "data:image/jpeg;base64," + result.image;  // Show processed image
        }
    } catch (error) {
        console.error("Error sending frame:", error);
    }
}

video.addEventListener('loadeddata', () => {
    setInterval(sendFrame, 500);  // Send frame every 500ms
});

startWebcam();
