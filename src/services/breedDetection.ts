const API_URL = import.meta.env.VITE_API_URL ?? '';

export interface BreedResult {
  breed: string;
  confidence: 'high' | 'medium' | 'low';
  en: string;
}

export async function detectBreed(
  file: File,
  petType?: string
): Promise<BreedResult> {
  const base64 = await fileToBase64(file);
  const mediaType = normalizeMediaType(file.type);

  const res = await fetch(`${API_URL}/detect-breed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64, mediaType, petType }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `שגיאת שרת ${res.status}`);
  }

  return res.json();
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip the "data:image/...;base64," prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function normalizeMediaType(type: string): 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif' {
  if (type === 'image/png')  return 'image/png';
  if (type === 'image/webp') return 'image/webp';
  if (type === 'image/gif')  return 'image/gif';
  return 'image/jpeg';
}
