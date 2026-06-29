# Bone Age Assessment System

Sistem berbasis web untuk memprediksi dan mengestimasi usia tulang (*Bone Age Assessment*) dari citra medis X-Ray menggunakan model Deep Learning. Project ini mengintegrasikan model arsitektur berbasis Swin Transformer di sisi backend dengan antarmuka pengguna yang modern dan responsif di sisi frontend.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js (App Router / Pages Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS

### Backend & Machine Learning
- **Framework API:** Python Flask (dengan Flask-CORS)
- **Deep Learning Framework:** PyTorch
- **Computer Vision Utilities:** Torchvision, `timm` (Swin Transformer Architecture)
- **Environment Management:** Python Virtual Environment (`venv` / `.venv`)

---

## 📋 Prasyarat (Prerequisites)

Sebelum menjalankan project ini, pastikan Anda sudah menginstal perangkat lunak berikut di perangkat Anda:
- **Git**
- **Node.js** (Versi 18 atau yang lebih baru)
- **NPM** atau **Yarn**
- **Python** (Versi 3.8 s.d. 3.11 disarankan)

## 🛠️ Langkah Instalasi & Menjalankan Project

### 1. Kloning Repositori (Cloning)
Buka terminal/command prompt Anda, lalu jalankan perintah berikut untuk mengkloning repositori ini:
https://github.com/ayuwanda07/boneage_predict.git

### 2. Konfigurasi & Menjalankan Backend (Flask API)
Masuk ke folder backend:
Bash
cd bone_age

Membuat Virtual Environment (venv):
Jika belum pernah dibuat, jalankan:
Bash
python -m venv venv

Mengaktifkan Virtual Environment:
Windows (Command Prompt):
.\venv\Scripts\activate

Menginstal Dependencies (Library):
pip install -r requirements.txt

Menjalankan Flask API:
python app.py

default akan berjalan di http://127.0.0.1:5000/

### 3. Konfigurasi & Menjalankan Frontend (Next.js)

cd bone-age-assessment
npm install
npm run dev

default akan berjalan di http://localhost:3000

=============================================================================================
**📁 Struktur Folder Utama**
├── bone_age/                  # Backend Directory (Flask)
│   ├── venv/                  # Python Virtual Environment
│   ├── models/                # File bobot model (.pth / .bin)
│   ├── app.py                 # File utama Flask API
│   └── requirements.txt       # Daftar library Python
│
└── bone-age-assessment/       # Frontend Directory (Next.js)
    ├── app/                   # Next.js App Router (Components & Pages)
    ├── public/                # Aset statis (Gambar, Icon)
    ├── package.json           # Dependensi Node.js
    ├── tailwind.config.ts     # Konfigurasi Tailwind CSS
    └── tsconfig.json          # Konfigurasi TypeScript
