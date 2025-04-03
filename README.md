# DoppelGänger Video Call — Real-Time GAN Webcam Transformation

This project transforms your **live webcam input** into a **GAN-generated doppelgänger** using the [e4e encoder](https://github.com/omertov/encoder4editing) over the pSp framework. Inspired by FaceTime, the UI displays a live feed of you and a stylized GAN output of your face in real time.

Live demo:  
[markduink.github.io/Doppelganger_videocall](https://markduink.github.io/Doppelganger_videocall)

Colab backend notebook:  
[Run in Google Colab](https://colab.research.google.com/drive/1Kf5vpd7K9j23wLXk58JZAm8Dlmpxx8DC?usp=sharing)

Demo video:  
[Watch on YouTube](https://www.youtube.com/watch?v=O8adgXXSpoI)

---

## Features

- Real-time GAN generation from webcam input
- Face detection, alignment, and transformation
- FaceTime-style layout with webcam preview and AI output
- Google Colab backend using Flask and PyTorch
- GitHub Pages frontend using HTML/JS with webcam streaming
- Optional latent space animation (GAN motion)

---

## Try It Yourself (Colab + GitHub)

### 1. Launch the backend notebook:
[https://colab.research.google.com/drive/1Kf5vpd7K9j23wLXk58JZAm8Dlmpxx8DC?usp=sharing](https://colab.research.google.com/drive/1Kf5vpd7K9j23wLXk58JZAm8Dlmpxx8DC?usp=sharing)

Follow the cell instructions to:
- Clone the `encoder4editing` repo
- Install dependencies
- Load the pretrained model
- Launch a Flask server and expose it with ngrok

When it prints:
🚀 Your backend URL is: https://xxxx.ngrok-free.app/process

Copy the full URL ending in `/process`.

---

### 2. Update your frontend

Go to your frontend repo:  
[https://github.com/markduink/Doppelganger_videocall](https://github.com/markduink/Doppelganger_videocall)

Open `script.js`, and update the line:

```js
const SERVER_URL = "https://xxxx.ngrok-free.app/process";


