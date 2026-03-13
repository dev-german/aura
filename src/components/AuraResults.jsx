import React, { useEffect, useState } from 'react';
import { calculateAuraNumbers } from '../utils/numerology';

const AuraResults = ({ name, birthdate, onReset }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const calc = calculateAuraNumbers(name, birthdate);
    setResults(calc);
  }, [name, birthdate]);

  if (!results) return null;

  const currentYear = new Date().getFullYear();

  const timelineData = [
    {
      year: currentYear - 1,
      number: results.personalYears.past.number,
      title: `Año Personal ${results.personalYears.past.number}`,
      desc: results.personalYears.past.concept,
      active: false
    },
    {
      year: currentYear,
      number: results.personalYears.current.number,
      title: `Año Personal ${results.personalYears.current.number}`,
      desc: results.personalYears.current.concept,
      active: true
    },
    {
      year: currentYear + 1,
      number: results.personalYears.future.number,
      title: `Año Personal ${results.personalYears.future.number}`,
      desc: results.personalYears.future.concept,
      active: false
    }
  ];

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', animation: 'fadeIn 0.5s ease-out' }}>
      <h2 className="title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>El Mapa de tu alma, {name.split(' ')[0]}</h2>
      <p className="subtitle" style={{ marginBottom: '2rem' }}>Estos son los números que guían tu camino</p>

      <div className="results-grid" style={{ marginBottom: '3rem' }}>
        <div className="result-card">
          <div className="number-circle">{results.esencia.number}</div>
          <div className="result-content">
            <h3 className="result-title">Esencia</h3>
            <p className="result-desc">{results.esencia.description}</p>
          </div>
        </div>

        <div className="result-card">
          <div className="number-circle">{results.karma.number}</div>
          <div className="result-content">
            <h3 className="result-title">Karma</h3>
            <p className="result-desc">{results.karma.description}</p>
          </div>
        </div>

        <div className="result-card">
          <div className="number-circle">{results.talento.number}</div>
          <div className="result-content">
            <h3 className="result-title">Talento (Vidas Pasadas)</h3>
            <p className="result-desc">{results.talento.description}</p>
          </div>
        </div>
      </div>

      <div className="timeline-container">
        <h3 className="result-title" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.5rem' }}>Línea de Tiempo (El "Año Personal")</h3>
        <p style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#b0b0b0' }}>
          Descubre en qué punto de tu ciclo te encuentras y prepárate para el futuro.
        </p>

        <div className="custom-timeline">
          {timelineData.map((item, index) => (
            <div key={index} className={`timeline-item ${item.active ? 'active' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content glass-panel-sm" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div className="number-circle" style={{ width: '60px', height: '60px', fontSize: '1.8rem', flexShrink: 0 }}>
                  {item.number}
                </div>
                <div>
                  <span className="timeline-year">{item.year}</span>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action - Sesión 1:1 */}
      <div className="glass-panel" style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'rgba(167, 112, 239, 0.15)',
        borderColor: 'rgba(167, 112, 239, 0.5)',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>
          Tu mapa aún está incompleto... 🗺️
        </h3>

        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: '#e0e0e0' }}>
          ¿Sientes que esta información resonó contigo? Prepárate, porque solo has visto la punta del iceberg (3 de tus 5 números clave).<br /><br />
          Para entender realmente tus bloqueos y potenciar tu luz, necesitas conocer tu mapa completo. Descubrir los 5 puntos a profundidad es el mapa que te guiará para dejar de luchar y empezar a crear desde tu verdadero Ser.
        </p>

        <a
          href={`https://wa.me/51989360251?text=${encodeURIComponent(`Hola, acabo de ver mi Mapa del Alma (Esencia: ${results.esencia.number}) y quiero agendar mi Carta Numerológica Personal (Sesión 1:1).`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            display: 'inline-block',
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
          }}
        >
          Quiero mi Carta Numerológica Personal (Sesión 1:1)
        </a>
      </div>

      <button className="btn-secondary" onClick={onReset} style={{ marginTop: '2rem' }}>
        Trazar otro Mapa
      </button>

      {/* Redes Sociales Footer */}
      <div style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <p style={{ color: '#a0a0a0', fontSize: '0.9rem', margin: 0 }}>Sígueme si quieres iniciar un viaje de autoconocimiento con los números:</p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
          <a
            href="https://www.instagram.com/maritabaldeon/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#E1306C'; e.currentTarget.querySelector('svg').style.fill = '#E1306C'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.querySelector('svg').style.fill = '#fff'; }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" style={{ transition: 'fill 0.3s ease' }}>
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.555.556.9 1.11 1.152 1.77.248.638.415 1.363.465 2.428.048 1.067.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 c-.556.555-1.11.9-1.77 1.152-.638.248-1.363.415-2.428.465-1.067.048-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.152-1.77c-.248-.638-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5.838a4.162 4.162 0 1 0 0 8.324 4.162 4.162 0 0 0 0-8.324zm0 6.824a2.662 2.662 0 1 1 0-5.324 2.662 2.662 0 0 1 0 5.324zm5.132-7.854a.996.996 0 1 0-.001-1.992.996.996 0 0 0 0 1.992z" />
            </svg>
            Instagram
          </a>

          <a
            href="https://www.tiktok.com/@maritabaldeon"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#00f2fe'; e.currentTarget.querySelector('svg').style.fill = '#00f2fe'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.querySelector('svg').style.fill = '#fff'; }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" style={{ transition: 'fill 0.3s ease' }}>
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
            TikTok
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuraResults;
