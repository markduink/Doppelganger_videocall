const video = document.getElementById('webcam');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
const statusLabel = document.getElementById('status');

// ✅ Use your active ngrok URL + correct endpoint
const SERVER_URL = "https://ff11-35-240-179-116.ngrok-free.app/process";

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error("❌ Failed to access webcam:", err);
    statusLabel.textContent = "❌ Cannot access webcam";
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
      statusLabel.style.display = "none"; // ✅ Hide when working
    } else {
      console.warn("⚠️ Server returned no image");
      statusLabel.style.display = "block";
      statusLabel.textContent = "🔄 Connecting...";
    }
  } catch (err) {
    console.error("❌ Error sending frame:", err);
    statusLabel.style.display = "block";
    statusLabel.textContent = "🔄 Connecting...";
  }
}

// 🔁 Send frames repeatedly
video.addEventListener('loadeddata', () => {
  setInterval(sendFrame, 800); // ⏱️ Increase/decrease interval here
});

// 🔌 Start
startWebcam();
