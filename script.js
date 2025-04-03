const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
const statusLabel = document.getElementById('status');

// 💡 Replace with your active ngrok URL
const SERVER_URL = "https://f34f-35-240-179-116.ngrok-free.app";

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
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageData })
    });

    const result = await response.json();

    if (result.image) {
      output.src = `data:image/jpeg;base64,${result.image}`;
      statusLabel.style.display = "none"; // ✅ Hide “Connecting...” on success
    } else {
      console.warn("⚠️ No image returned.");
      statusLabel.textContent = "🔄 Connecting...";
    }
  } catch (err) {
    console.error("❌ Error sending frame:", err);
    statusLabel.textContent = "🔄 Connecting...";
  }
}

video.addEventListener('loadeddata', () => {
  setInterval(sendFrame, 800); // faster refresh for more real-time
});

startWebcam();

