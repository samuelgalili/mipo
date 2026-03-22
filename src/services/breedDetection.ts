const API_URL = import.meta.env.VITE_API_URL ?? '';

export interface BreedResult {
  breed: string;
  confidence: 'high' | 'medium' | 'low';
  en: string;
}

const MAX_DIMENSION = 1024; // resize to max 1024px before upload
const JPEG_QUALITY  = 0.82;

export async function detectBreed(
  file: File,
  petType?: string
): Promise<BreedResult> {
  const { base64, mediaType } = await compressImage(file);

  const res = await fetch(`${API_URL}/detect-breed`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ image: base64, mediaType, petType }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `שגיאת שרת ${res.status}`);
  }

  return res.json();
}

/** Resize + compress image via canvas, returns base64 without data: prefix */
function compressImage(file: File): Promise<{ base64: string; mediaType: 'image/jpeg' }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height / width) * MAX_DIMENSION);
          width  = MAX_DIMENSION;
        } else {
          width  = Math.round((width / height) * MAX_DIMENSION);
          height = MAX_DIMENSION;
        }
      }

      const canvas  = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
      resolve({ base64: dataUrl.split(',')[1], mediaType: 'image/jpeg' });
    };

    img.onerror = reject;
    img.src = url;
  });
}
