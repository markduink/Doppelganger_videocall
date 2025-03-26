const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const ngrokUrl = "https://a203-35-247-138-37.ngrok-free.app";  // Replace this with the new ngrok URL!

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
        setInterval(sendFrame, 500); // Send every 500ms
    })
    .catch(error => console.error("Webcam error:", error));

function sendFrame() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png', 0.9);

    fetch(`${ngrokUrl}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frame: imageData })
    })
    .then(response => response.json())
    .then(data => console.log("Server Response:", data))
    .catch(error => console.error("Error sending frame:", error));
}

