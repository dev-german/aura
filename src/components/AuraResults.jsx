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
      <h2 className="title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Tu Aura, {name.split(' ')[0]}</h2>
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

      <button className="btn-secondary" onClick={onReset} style={{ marginTop: '2rem' }}>
        Consultar otro Aura
      </button>
    </div>
  );
};

export default AuraResults;
