const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');

// ✅ Replace with your current ngrok URL
const SERVER_URL = "https://73ef-34-27-148-227.ngrok-free.app";

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error("❌ Failed to access webcam:", err);
  }
}

async function sendFrame() {
  if (!video.videoWidth || !video.videoHeight) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert to base64 JPEG and remove the prefix
  const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

  try {
    const response = await fetch(`${SERVER_URL}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: imageData })
    });

    const result = await response.json();

    if (result.image) {
      output.src = `data:image/jpeg;base64,${result.image}`;
    } else if (result.error) {
      console.error("⚠️ Server error:", result.error);
    }
  } catch (err) {
    console.error("❌ Error sending frame:", err);
  }
}

// 🔁 Start sending frames regularly once video is ready
video.addEventListener('loadeddata', () => {
  setInterval(sendFrame, 1000); // send every second
});

startWebcam();

});

startWebcam();

