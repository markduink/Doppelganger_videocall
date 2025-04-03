# DoppelGänger Video Call — Real-Time GAN Webcam Transformation

This project transforms your **live webcam input** into a **GAN-generated doppelgänger** using the [e4e encoder](https://github.com/omertov/encoder4editing) over the pSp framework. Inspired by FaceTime, the UI displays a live feed of you and a stylized GAN output of your face in real time.

Live demo:  
[https://markduink.github.io/Doppelganger_videocall](https://markduink.github.io/Doppelganger_videocall)

Backend notebook:  
[Open in Google Colab](https://colab.research.google.com/drive/1Kf5vpd7K9j23wLXk58JZAm8Dlmpxx8DC?usp=sharing)

Demo video:  
[Watch on YouTube](https://www.youtube.com/watch?v=O8adgXXSpoI)

---

## Features

- Real-time GAN image generation from webcam input
- Face detection, alignment, and transformation using e4e
- FaceTime-style layout with webcam stream and stylized output
- Google Colab backend with Flask + ngrok
- GitHub Pages frontend using HTML + JS
- Optional GAN animation (latent space looping)

---

## Files in This Repository

- `Doppelganger_VideoCall_backend.ipynb`:  
  The complete Google Colab backend notebook to run the GAN, load the model, and launch the server with ngrok.

- `index.html`:  
  The main webpage that displays your webcam and the generated face in a FaceTime-style layout. It loads `script.js` and references `dock.png`.

- `script.js`:  
  Sends your webcam frames to the Colab server every 800ms, receives the GAN-transformed image, and updates the display in real time.

- `dock.png`:  
  A FaceTime-style control dock overlayed on the page (static image for aesthetic).

- `README.md`:  
  This file — full setup instructions and context.

---

## Try It Yourself (Colab + GitHub)

### 1. Launch the backend notebook:
Open this Colab notebook:  
[https://colab.research.google.com/drive/1Kf5vpd7K9j23wLXk58JZAm8Dlmpxx8DC?usp=sharing](https://colab.research.google.com/drive/1Kf5vpd7K9j23wLXk58JZAm8Dlmpxx8DC?usp=sharing)

Follow the cells to:
- Clone the encoder4editing repo
- Install Python packages
- Load the pretrained e4e model
- Start the Flask app
- Launch ngrok and get your live server URL

When you see something like:
🚀 Your backend URL is: https://xxxx.ngrok-free.app/process

Copy that full URL.

---

### 2. Configure the frontend

1. In this repo, open `script.js`
2. Find the line:
   ```js
   const SERVER_URL = "https://xxxx.ngrok-free.app/process";

   Replace it with your actual ngrok URL from Colab.

Commit the changes to GitHub

Open your live frontend site:  
[https://markduink.github.io/Doppelganger_videocall](https://markduink.github.io/Doppelganger_videocall)

You should see your webcam and the GAN-generated doppelgänger side-by-side, FaceTime-style.

---

## Requirements

### Colab Backend:
- Python 3.9+ (Colab default)
- PyTorch 1.7.1 + CUDA 11.0
- encoder4editing repo
- Pretrained e4e model (`e4e_ffhq_encode.pt`)
- Required pip packages:
  - flask
  - flask_cors
  - pyngrok
  - face-recognition
  - torchvision
  - ninja

### GitHub Pages Frontend:
- HTML + JavaScript
- Works in modern browsers (webcam permission required)

---

## Resources

### Pretrained model:  
**Download:**  
[e4e_ffhq_encode.pt](https://huggingface.co/anzorq/e4e-ffhq/resolve/main/e4e_ffhq_encode.pt)

**Upload it to your Google Drive and copy it in Colab using:**
```python
from google.colab import drive
drive.mount('/content/drive')
!cp "/content/drive/MyDrive/e4e_ffhq_encode.pt" "/content/encoder4editing/e4e_ffhq.pt"


Repositories & Links:
Encoder repo: https://github.com/omertov/encoder4editing

This repo: https://github.com/markduink/Doppelganger_videocall

Live frontend: https://markduink.github.io/Doppelganger_videocall

Demo video: https://www.youtube.com/watch?v=O8adgXXSpoI



Notes & Troubleshooting
The Colab server must stay open for the site to function.

Ngrok URLs expire unless you're using a static domain.

If webcam doesn’t appear, check browser permissions.

If nothing loads, check your browser console and Colab for errors.

For performance, you can lower the frame interval in script.js from 800 to 400 (this increases load).

You can create smooth doppelgänger motion by interpolating the latent space output from net.encoder.

Credits
Built with StyleGAN2 + pSp via the e4e encoder

Real-time processing using PyTorch and Flask

Hosted with Google Colab and GitHub Pages

Designed to explore identity, transformation, and generative media




