import { useEffect, useState } from 'react';

export function useWebGLAvailable() {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setAvailable(!!gl);
    } catch {
      setAvailable(false);
    }
  }, []);

  return available;
}
