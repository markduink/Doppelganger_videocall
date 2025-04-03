# 👯 DoppelGanger Video Call — Generative GAN Artwork

This project transforms your **live webcam** into a GAN-powered doppelgänger using the [e4e encoder](https://github.com/omertov/encoder4editing) over the pSp framework. It mimics a FaceTime-style UI on the frontend and shows AI-generated faces based on your webcam input.

Live demo: [markduink.github.io/Doppelganger_videocall](https://markduink.github.io/Doppelganger_videocall)

---

## 🚀 Features

- Real-time GAN image generation from webcam input  
- FaceTime-style UI with floating controls and video layout  
- AI doppelgänger generation with optional looping GAN animation  
- Hosted with Google Colab backend + ngrok and frontend on GitHub Pages

---

## 🫠 Requirements

### Google Colab Backend:

- PyTorch 1.7.1 + CUDA 11.0  
- encoder4editing repo  
- e4e pretrained model (`e4e_ffhq_encode.pt`)  
- Packages: `flask`, `flask_cors`, `pyngrok`, `face-recognition`, `torchvision`

### GitHub Pages Frontend:

- HTML + JS  
- Deployed to GitHub Pages repo: [https://github.com/markduink/Doppelganger_videocall](https://github.com/markduink/Doppelganger_videocall)

---

## 🔧 Setup Instructions (Google Colab)

### 1. Clone model repo

```bash
!rm -rf /content/encoder4editing
!git clone https://github.com/omertov/encoder4editing.git /content/encoder4editing
```

### 2. Load the pretrained e4e model

Download and mount your Google Drive:

```python
from google.colab import drive
drive.mount('/content/drive')

!cp "/content/drive/MyDrive/e4e_ffhq_encode.pt" "/content/encoder4editing/e4e_ffhq.pt"
```

> 🔗 This file should be ~1.2GB. Ensure it's named `e4e_ffhq.pt` and copied to `/content/encoder4editing/`

### 3. Install dependencies

```bash
!pip install ninja flask flask_cors pyngrok face-recognition
```

### 4. Load the model

```python
from argparse import Namespace
import torch, sys
sys.path.append('/content/encoder4editing')
from models.psp import pSp

ckpt_path = "/content/encoder4editing/e4e_ffhq.pt"
ckpt = torch.load(ckpt_path, map_location='cuda')
opts = ckpt['opts']
opts['checkpoint_path'] = ckpt_path
opts = Namespace(**opts)

net = pSp(opts)
net.eval().cuda()
print("✅ e4e model loaded!")
```

### 5. Run the Flask server with ngrok

Use the provided server script that includes CORS and real-time processing at `/process`.

```python
!pkill -f ngrok
!ngrok authtoken YOUR_NGROK_AUTH_TOKEN
public_url = ngrok.connect(5000).public_url
print("🚀 Backend running at:", public_url + "/process")
```

---

## 📱 Frontend Setup

1. Go to: [https://github.com/markduink/Doppelganger_videocall](https://github.com/markduink/Doppelganger_videocall)
2. Replace `SERVER_URL` in `script.js` with the live ngrok URL
3. Commit & push your changes
4. Open your GitHub Pages link: [https://markduink.github.io/Doppelganger_videocall](https://markduink.github.io/Doppelganger_videocall)

---

## 💡 Troubleshooting

- If webcam doesn't show: check browser permissions  
- If ngrok URL expires: restart ngrok cell and update `script.js`  
- To speed up generation: reduce interval time in `setInterval(sendFrame, 800)`  
- To animate output: interpolate latent vectors each frame instead of re-encoding

---

## 📂 Reference Links

- 🔗 Model repo: [omertov/encoder4editing](https://github.com/omertov/encoder4editing)
- 📁 Frontend repo: [markduink/Doppelganger_videocall](https://github.com/markduink/Doppelganger_videocall)
- 📀 e4e model file: `/content/drive/MyDrive/e4e_ffhq_encode.pt`

---

## 😍 Acknowledgements

Built with:

- StyleGAN2 + pSp (via e4e)  
- Google Colab for backend  
- GitHub Pages for frontend  
- You, for being your authentic self ✨
