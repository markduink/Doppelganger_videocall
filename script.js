const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const ngrokUrl = "YOUR_NGROK_URL"; // Replace with your ngrok URL
const displayImage = document.getElementById('displayImage');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            console.log("Video metadata loaded");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
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
    });

function sendFrame() {
    console.log("Drawing image to canvas");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    try {
        const imageData = canvas.toDataURL('image/png'); // Changed to PNG
        if (!imageData) {
            console.error("imageData is empty");
            return;
        }

        console.log("Image data:", imageData);
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
    } catch (error) {
        console.error("ToDataURL error:", error);
    }
}
