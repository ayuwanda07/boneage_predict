import os
import torch
import torch.nn as nn
import torch.nn.functional as F
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from torchvision import transforms
import timm
from werkzeug.utils import secure_filename

# ===== SETUP FLASK =====
app = Flask(__name__)
CORS(app)  # Enable CORS untuk frontend

# ===== CONFIG =====
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'bmp', 'dicom'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# ===== LOAD MODEL & PREPARE TRANSFORMS =====
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"🔧 Using device: {device}")

# 1. Bikin Arsitektur Custom (Sesuai kode training V6 kamu)
NUM_CLASSES =20 

model_base = timm.create_model('swin_tiny_patch4_window7_224', pretrained=False, num_classes=0, global_pool='avg')

head_v6 = nn.Sequential(
    nn.Linear(model_base.num_features, 512),
    nn.BatchNorm1d(512),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(512, NUM_CLASSES)
)

class SwinWrapper(nn.Module):
    def __init__(self, base_model, head):
        super().__init__()
        self.base_model = base_model
        self.head = head
    
    def forward(self, x): 
        x = self.base_model(x)
        x = self.head(x)
        return x

model = SwinWrapper(model_base, head_v6)

# 2. Load model weights
MODEL_PATH = 'models/swin_v6_normalisasi_new.pth'
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model = model.to(device)
model.eval()
print("✅ Model loaded successfully!")

# 3. Image transforms (Pakai nilai Normalisasi RSNA)
val_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.1823, 0.1823, 0.1823],
        std=[0.1924, 0.1924, 0.1924]
    )
])

# Class names (age labels) - 228 classes dari 0 sampai 227
# Asumsi: class 0 = umur 0 tahun, class 1 = umur 1 tahun, dst sampai class 227 = umur 227 tahun
class_names = sorted([str(i) for i in range(20)])

print(f"📋 Class Mapping: {class_names}")

# ===== HELPER FUNCTION =====
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_age_label(class_idx):
    """Convert class index to age label"""
    return int(class_names[class_idx])
 
# ===== ROUTES =====

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'status': 'ok',
        'message': 'Bone Age Assessment API is running',
        'version': '1.0'
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Upload image and get bone age prediction
    Returns: Top 3 age predictions dengan confidence score
    """
    try:
        # Check apakah file ada
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400
        
        # Save file temporarily
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Load and preprocess image
        pil_img = Image.open(filepath).convert('RGB')
        img_tensor = val_transforms(pil_img).unsqueeze(0).to(device)
        
        # Run inference
        with torch.no_grad():
            outputs = model(img_tensor)
            probs = F.softmax(outputs, dim=1)
            
            # Get top-3 predictions
            top3_prob, top3_idx = torch.topk(probs, 3)
        
        # Format results
        predictions = []
        for i in range(3):
            class_idx = top3_idx[0][i].item()
            confidence = top3_prob[0][i].item()
            age = get_age_label(class_idx)
            
            predictions.append({
                'rank': i + 1,
                'age': age,
                'confidence': round(confidence * 100, 2)
            })
        
        # Clean up - delete temporary file
        os.remove(filepath)
        
        return jsonify({
            'status': 'success',
            'predictions': predictions
        })
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'device': str(device),
        'model_loaded': True
    })

# ===== RUN SERVER =====
if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Bone Age Assessment Backend API")
    print("=" * 60)
    print(f"📍 Server running at: http://localhost:5000")
    print(f"🔗 API endpoint: http://localhost:5000/api/predict")
    print("=" * 60)
    app.run(debug=True, host='0.0.0.0', port=5000)