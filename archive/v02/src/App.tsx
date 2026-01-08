import { useState, useRef, useEffect } from 'react';
import './App.css';
import type { CVData, Html2PdfOptions } from './types';
import { Sidebar } from './components/Sidebar';
import { Resume } from './components/Resume';
import { useCVLoader } from './hooks/useCVLoader';
import html2pdf from 'html2pdf.js';
import { Login } from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('cv_auth');
    if (sessionAuth === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('cv_auth', 'true');
    setIsAuthenticated(true);
  };

  const { cvList, loading, error } = useCVLoader();
  
  const [selectedCV, setSelectedCV] = useState<CVData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);

  const currentCV = selectedCV || (cvList.length > 0 ? cvList[0].data : null);

  const handleDownload = () => {
    if (!resumeRef.current || !currentCV) return;

    const element = resumeRef.current;
    const spacer = element.querySelector('#browserSpacer') as HTMLElement;
    if(spacer) spacer.style.display = 'none';

    const name = `${currentCV.basics.name.first} ${currentCV.basics.name.last}`.replace(/\s+/g, '_');
    
    const opt: Html2PdfOptions = {
      margin: [10, 0, 10, 0],
      filename: `Lebenslauf_${name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save().then(() => {
        if(spacer) spacer.style.display = 'block';
    });
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: '#555' }}>Lade Lebensläufe...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 50, textAlign: 'center', color: '#e74c3c' }}>
        <h3>Fehler beim Laden</h3>
        <p>{error}</p>
        <p style={{ fontSize: '0.8rem', color: '#555' }}>Stelle sicher, dass <code>/data/cv_list.json</code> existiert.</p>
      </div>
    );
  }

  if (!currentCV) return null;

  return (
    <>
      <button className="menu-toggle no-print" onClick={() => setIsMenuOpen(true)}>☰</button>
      
      <div className="ui-controls no-print">
        <button className="btn btn-accent" onClick={handleDownload}>PDF Herunterladen</button>
      </div>

      <Sidebar 
        isOpen={isMenuOpen} 
        setIsOpen={setIsMenuOpen} 
        cvList={cvList} 
        onSelect={setSelectedCV}
        activeCVName={currentCV.basics.name}
      />

      <div className="cv-page-wrapper">
        <Resume ref={resumeRef} data={currentCV} />
      </div>
    </>
  );
}

export default App;