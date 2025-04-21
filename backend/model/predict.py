import torch
from torchvision import transforms
from PIL import Image
import os
from model_arch import SimpleCNN  # Same model used in training

# 1. Class names (same order as in training)
class_names = ['AnnualCrop', 'Forest', 'HerbaceousVegetation', 'Highway', 'Industrial',
               'Pasture', 'PermanentCrop', 'Residential', 'River', 'SeaLake']

# 2. Transform
transform = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor()
])

# 3. Load model
print("🔄 Loading model...")
model = SimpleCNN(num_classes=len(class_names))
model.load_state_dict(torch.load("model.pth", map_location=torch.device("cpu")))
model.eval()
print("✅ Model loaded!")

# 4. Load image
test_image_path = os.path.join("..", "dataset", "EuroSAT_RGB", "Forest", "Forest_1.jpg")
print("🔍 Predicting for:", test_image_path)
image = Image.open(test_image_path).convert("RGB")
input_tensor = transform(image).unsqueeze(0)

# 5. Predict
with torch.no_grad():
    output = model(input_tensor)
    _, predicted = torch.max(output, 1)
    class_name = class_names[predicted.item()]
    print("🧠 Prediction:", class_name)
