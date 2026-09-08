import { useState } from 'react';
import AuraForm from './components/AuraForm';
import AuraResults from './components/AuraResults';
import TopNavigation from './components/TopNavigation';
import PersonalYearTimeline from './components/PersonalYearTimeline';
import UniversalMonth from './components/UniversalMonth';
import { calculateAuraNumbers } from './utils/numerology';

function MapDrawing() {
  return (
    <svg className="map-drawing" viewBox="0 0 480 210" fill="none" aria-hidden="true">
      <path className="map-contour" d="M-25 145C45 10 135 10 177 88S308 224 369 132 451 37 510 71M-25 173C46 41 112 34 151 106S294 260 385 156 470 62 510 99M-25 199C43 72 94 61 126 126S279 290 401 181 481 92 510 126" />
      <path className="map-route" d="M43 147C101 147 97 55 177 55S281 156 347 119 391 69 445 69" />
      <circle cx="43" cy="147" r="7" /><circle cx="177" cy="55" r="7" /><circle cx="347" cy="119" r="7" />
      <text x="27" y="179">Esencia</text><text x="151" y="30">Karma</text><text x="330" y="152">Talento</text>
    </svg>
  );
}

export default function App() {
  const [view, setView] = useState('soul-map');
  const [userData, setUserData] = useState(null);
  const handleFormSubmit = (name, date) => setUserData({ name, date });
  const resetForm = () => setUserData(null);

  return (
    <>
      <TopNavigation view={view} onNavigate={setView} />
      <main id="main-content" className="app-content" tabIndex={-1}>
        {view === 'soul-map' && (userData ? (
          <AuraResults name={userData.name} birthdate={userData.date} onReset={resetForm} />
        ) : (
          <section className="map-intro">
            <div className="intro-copy">
              <p className="intro-context">Un espacio para conocerte</p>
              <h1 className="title">Tu fecha.<br />Tu historia.<br />Tu mapa.</h1>
              <p className="intro-description">Explora tu esencia, tu karma y tu talento a través de la numerología. Un punto de partida para mirarte de otra manera.</p>
              <MapDrawing />
            </div>
            <AuraForm onSubmit={handleFormSubmit} />
          </section>
        ))}
        {view === 'personal-year' && (
          <section className={`time-view${userData ? '' : ' time-entry'}`}>
            <div className="view-heading">
              <p className="intro-context">Numerología de tiempos</p>
              <h1 className="title">Cada año,<br />un nuevo ciclo.</h1>
              <p className="subtitle">Descubre tu año personal y explora el momento que estás viviendo.</p>
            </div>
            {userData ? (
              <>
                <PersonalYearTimeline personalYears={calculateAuraNumbers(userData.name, userData.date).personalYears} />
                <button className="btn-secondary" onClick={resetForm}>Consultar otra fecha</button>
              </>
            ) : <AuraForm onSubmit={handleFormSubmit} title="Tu año personal" submitLabel="Explorar mi año" />}
          </section>
        )}
        {view === 'universal-month' && <UniversalMonth />}
      </main>
      <footer className="site-footer">
        <div><span className="footer-brand">Marita Baldeon</span><p>Numerología y autoconocimiento</p></div>
        <div className="footer-links">
          <a href="https://www.instagram.com/maritabaldeon/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@maritabaldeon" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </footer>
    </>
  );
}
