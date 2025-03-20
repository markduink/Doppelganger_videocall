const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const ngrokUrl = "https://13a8-34-142-156-152.ngrok-free.app"; // Replace with your ngrok URL

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            setInterval(sendFrame, 100); // Send every 100ms
        };
    })
    .catch(error => {
        console.error("Error accessing webcam:", error);
    });

function sendFrame() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    fetch(ngrokUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ frame: imageData })
    })
    .then(response => {
        if (!response.ok) {
            console.error("Error sending frame:", response.status);
        } else {
            console.log("frame sent successfully");
        }
    })
    .catch(error => {
        console.error("Request error:", error);
    });
}
