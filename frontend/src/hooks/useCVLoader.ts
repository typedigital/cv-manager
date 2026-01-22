import { useState, useEffect } from 'react';
import type { CVData } from '../types';

const API_URL = 'http://127.0.0.1:8000/api/cvs/';

interface CVFile {
  file: string;
  data: CVData;
}

export const useCVLoader = (token: string | null) => {
  const [cvList, setCvList] = useState<CVFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCVs = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 1. Liste der Dateinamen laden
        const res = await fetch(API_URL, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }});

        if (res.status === 401 || res.status === 403) {
            throw new Error("Nicht autorisiert. Bitte neu einloggen.");
        }
        if (!res.ok) throw new Error(`API Fehler: ${res.statusText}`); 

        const dataList: CVData[] = await res.json();

        // 2. Alle Details parallel laden (Performance-Boost)
        const formattedList = dataList.map((cv: CVData) => ({
            // Als "file" Identifier nutzen wir einfach Vorname_Nachname
            file: `${cv.basics.name.first}_${cv.basics.name.last}`, 
            data: cv 
        }));
        
        setCvList(formattedList);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, [token]);

  return { cvList, loading, error };
};