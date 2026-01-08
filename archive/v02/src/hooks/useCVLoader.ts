import { useState, useEffect } from 'react';
import type { CVData } from '../types';

interface CVFile {
  file: string;
  data: CVData;
}

export const useCVLoader = (basePath: string = '/data/') => {
  const [cvList, setCvList] = useState<CVFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        setLoading(true);
        // 1. Liste der Dateinamen laden
        const listRes = await fetch(`${basePath}cv_list.json`);
        if (!listRes.ok) throw new Error('Konnte cv_list.json nicht laden');
        
        const files: string[] = await listRes.json();

        // 2. Alle Details parallel laden (Performance-Boost)
        const promises = files.map(async (file) => {
          const res = await fetch(`${basePath}${file}`);
          if (!res.ok) throw new Error(`Fehler beim Laden von ${file}`);
          const data: CVData = await res.json();
          return { file, data };
        });

        const results = await Promise.all(promises);
        
        setCvList(results);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, [basePath]);

  return { cvList, loading, error };
};