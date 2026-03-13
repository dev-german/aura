import React, { useState } from 'react';
import AuraForm from './components/AuraForm';
import AuraResults from './components/AuraResults';
import './index.css'; // Make sure global styles are imported

function App() {
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (name, date) => {
    setUserData({ name, date });
  };

  const resetForm = () => {
    setUserData(null);
  };

  return (
    <>
      {/* Redes Sociales Top Right (Solo Desktop) */}
      <div className="desktop-socials">
        <a 
          href="https://www.instagram.com/maritabaldeon/" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Instagram"
          onMouseOver={(e) => { e.currentTarget.querySelector('svg').style.fill = '#E1306C'; }}
          onMouseOut={(e) => { e.currentTarget.querySelector('svg').style.fill = '#fff'; }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" style={{ transition: 'fill 0.3s ease' }}>
            <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.555.556.9 1.11 1.152 1.77.248.638.415 1.363.465 2.428.048 1.067.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 c-.556.555-1.11.9-1.77 1.152-.638.248-1.363.415-2.428.465-1.067.048-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.152-1.77c-.248-.638-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5.838a4.162 4.162 0 1 0 0 8.324 4.162 4.162 0 0 0 0-8.324zm0 6.824a2.662 2.662 0 1 1 0-5.324 2.662 2.662 0 0 1 0 5.324zm5.132-7.854a.996.996 0 1 0-.001-1.992.996.996 0 0 0 0 1.992z"/>
          </svg>
        </a>
        
        <a 
          href="https://www.tiktok.com/@maritabaldeon" 
          target="_blank" 
          rel="noopener noreferrer"
          title="TikTok"
          onMouseOver={(e) => { e.currentTarget.querySelector('svg').style.fill = '#00f2fe'; }}
          onMouseOut={(e) => { e.currentTarget.querySelector('svg').style.fill = '#fff'; }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" style={{ transition: 'fill 0.3s ease' }}>
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        </a>
      </div>

      {!userData && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
          <h1 className="title">Mapa de tu Alma</h1>
          <p className="subtitle">Descubre tus números de vida</p>
          <AuraForm onSubmit={handleFormSubmit} />
        </div>
      )}

      {userData && (
        <AuraResults 
          name={userData.name} 
          birthdate={userData.date} 
          onReset={resetForm} 
        />
      )}
    </>
  );
}

export default App;
