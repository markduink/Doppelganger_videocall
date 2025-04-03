# 👯 DoppelGänger Video Call — Real-Time GAN Webcam Transformation

This project transforms your **live webcam input** into a **GAN-generated doppelgänger** using the [e4e encoder](https://github.com/omertov/encoder4editing) over the pSp framework. Inspired by FaceTime, the UI displays a live feed of you and a stylized GAN output of your face in real time.

🔴 **Live Demo:**  
[markduink.github.io/Doppelganger_videocall](https://markduink.github.io/Doppelganger_videocall)

---

## 🚀 Features

- Real-time GAN image generation from webcam input  
- FaceTime-style UI with webcam stream + transformed face layout  
- AI doppelgänger generation with looping GAN output  
- Runs with a Google Colab backend and is served to a GitHub Pages frontend

---

## 🧪 Try It Yourself (in Colab)

🔗 **Run the backend on Google Colab**  
Open this notebook and follow the instructions:  
👉 [Colab Link](https://colab.research.google.com/drive/1Kf5vpd7K9j23wLXk58JZAm8Dlmpxx8DC?usp=sharing)

### Quick Setup in Colab:
1. Run the setup cells to:
   - Clone the encoder repo  
   - Load the pretrained e4e model  
   - Start the Flask server and expose via ngrok  

2. After running the cell that prints the ngrok URL, **copy the URL it shows** (it ends in `/process`)

3. Open `script.js` in your GitHub repo  
   Replace the existing `SERVER_URL` with the one you copied from Colab.

4. Commit your changes, and open your GitHub Pages site to test it live!

---

## 🧰 Requirements

### Google Colab Backend:
- Python 3.9+ in Google Colab  
- PyTorch 1.7.1 + CUDA 11.0  
- encoder4editing repo  
- Pretrained e4e model `e4e_ffhq_encode.pt`  
- Python packages:  
  `flask`, `flask_cors`, `pyngrok`, `face-recognition`, `torchvision`, `ninja`

### GitHub Pages Frontend:
- HTML + JavaScript
- Hosted via GitHub Pages:  
  [https://github.com/markduink/Doppelganger_videocall](https://github.com/markduink/Doppelganger_videocall)

---

## 💻 Local Development

If needed, you can clone this repo:

```bash
git clone https://github.com/markduink/Doppelganger_videocall.git
cd Doppelganger_videocall
```

Then update `script.js` with your live ngrok URL each time you restart the backend.

---

## 🧠 Notes & Troubleshooting

- ❗ The Colab backend must remain open and running for the app to work.
- 🔁 Ngrok URLs change on each session unless you pay for a static one.
- 🚫 If your webcam isn’t showing, make sure your browser has access permission.
- 🖼 If the transformed image isn’t updating, check the console for CORS or model errors.

---

## 📁 Resources & Downloads

- 🧠 **Encoder model:**  
  [e4e_ffhq_encode.pt](https://drive.google.com/file/d/1FGhfqu6iLkhkRYnVh_z1nRxy1sDazXvU/view?usp=sharing)  
  Upload this to your Google Drive and use it in Colab.
  
- 🔧 **Model repo:**  
  [omertov/encoder4editing](https://github.com/omertov/encoder4editing)

- 🎨 **Frontend repo:**  
  [markduink/Doppelganger_videocall](https://github.com/markduink/Doppelganger_videocall)

---

## 🙌 Credits

- Based on StyleGAN2 + pSp (via e4e)  
- Google Colab for backend compute  
- GitHub Pages for live deployment  
- Designed with FaceTime-style inspiration

---

🧬 _Built to explore algorithmic identity and visual AI transformation._

