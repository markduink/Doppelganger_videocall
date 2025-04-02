const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
const statusText = document.createElement('div'); // for "Connecting..."
statusText.innerText = "🔄 Connecting...";
statusText.style.fontSize = "20px";
statusText.style.marginTop = "10px";
document.body.appendChild(statusText);


const SERVER_URL = "https://c260-34-143-227-250.ngrok-free.app"; 

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
      statusText.innerText = "";  // hide status if image is returned
    } else if (result.error) {
      console.warn("⚠️ Server message:", result.error);
      if (result.error.includes("No face detected")) {
        statusText.innerText = "🔄 Connecting...";
      } else {
        statusText.innerText = "⚠️ Error: " + result.error;
      }
    }
  } catch (err) {
    console.error("❌ Error sending frame:", err);
    statusText.innerText = "❌ Connection error";
  }
}

video.addEventListener('loadeddata', () => {
  setInterval(sendFrame, 1000); // You can speed this up if needed
});

startWebcam();

