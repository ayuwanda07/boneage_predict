const API_BASE_URL = 'http://localhost:5000';

export interface Prediction {
  rank: 1 | 2 | 3;
  age: number;
  confidence: number;
}

export interface PredictResponse {
  status: string;
  predictions: Prediction[];
}

export async function predictBoneAge(file: File): Promise<PredictResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Prediction failed');
  }

  return response.json();
}