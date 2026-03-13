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
          ¿Sientes que esta información resonó contigo? Prepárate, porque solo has visto la punta del iceberg (3 de tus 5 números clave).<br/><br/>
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
    </div>
  );
};

export default AuraResults;
