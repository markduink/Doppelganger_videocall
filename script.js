const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const ngrokUrl = "https://781a-34-126-144-66.ngrok-free.app";
const displayImage = document.getElementById('displayImage');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            console.log("Video metadata loaded");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            console.log("Canvas dimensions:", canvas.width, canvas.height);
            setInterval(sendFrame, 100);
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
        const imageData = canvas.toDataURL('image/jpeg');
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
