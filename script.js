const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const ngrokUrl = "https://b76a-34-142-156-152.ngrok-free.app"; // Replace with your ngrok URL
const displayImage = document.getElementById('displayImage');

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
    .then(response => response.json())
    .then(data => {
        if (data.image) {
            displayImage.src = "data:image/jpeg;base64," + data.image;
        } else {
            console.error("Error:", data.error);
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}
