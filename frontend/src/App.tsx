import { useState, useRef, useEffect } from 'react';
import './App.css';
import type { CVData, Html2PdfOptions } from './types';
import { Sidebar } from './components/Sidebar';
import { Resume } from './components/Resume';
import { useCVLoader } from './hooks/useCVLoader';
import html2pdf from 'html2pdf.js';
import { Login } from './components/Login';

function App() {
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    const savedToken = sessionStorage.getItem('auth_token');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem('auth_token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('auth_token');
  };

  const { cvList, loading, error } = useCVLoader(token);
  
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

  if (!token) {
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
      <div style={{padding: 50, textAlign:'center'}}>
          <h3 style={{color: '#e74c3c'}}>{error}</h3>
          {error.includes("autorisiert") && <button className="btn" onClick={handleLogout}>Zum Login</button>}
      </div>
    );
  }

  if (!currentCV) return <div style={{padding: 50, textAlign:'center'}}>Keine CVs gefunden. Bitte im Admin-Bereich anlegen.</div>;

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
        onLogout={handleLogout}
      />

      <div className="cv-page-wrapper">
        <Resume ref={resumeRef} data={currentCV} />
      </div>
    </>
  );
}

export default App;