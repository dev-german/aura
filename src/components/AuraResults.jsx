import PersonalYearTimeline from './PersonalYearTimeline';
import { calculateAuraNumbers } from '../utils/numerology';

export default function AuraResults({ name, birthdate, onReset }) {
  const results = calculateAuraNumbers(name, birthdate);
  const readings = [
    { key: 'esencia', title: 'Esencia', subtitle: 'Lo que te mueve' },
    { key: 'karma', title: 'Karma', subtitle: 'Lo que vienes a aprender' },
    { key: 'talento', title: 'Talento', subtitle: 'Los dones que te acompañan' },
  ];

  return (
    <section className="results-view">
      <div className="results-heading">
        <div><p className="intro-context">Tu mapa de alma</p><h1 className="title">Una mirada a ti,<br />{name.trim().split(/\s+/)[0]}.</h1></div>
        <p className="subtitle">Tres números para explorar quién eres, qué aprendes y qué puedes compartir con el mundo.</p>
      </div>
      <div className="results-grid">
        {readings.map(({ key, title, subtitle }) => (
          <article className={`result-card result-${key}`} key={key}>
            <div className="result-top"><h2>{title}</h2><span className="result-number">{results[key].number}</span></div>
            <p className="result-subtitle">{subtitle}</p>
            <p className="result-desc">{results[key].description}</p>
          </article>
        ))}
      </div>
      <PersonalYearTimeline personalYears={results.personalYears} />
      <aside className="consultation">
        <div><h2>Hay más en tu mapa.</h2><p>Explora los cinco puntos de tu carta numerológica en una sesión personal. Un espacio para profundizar en tus preguntas y en tu camino.</p></div>
        <a href={`https://wa.me/51989360251?text=${encodeURIComponent(`Hola, acabo de ver mi Mapa del Alma (Esencia: ${results.esencia.number}) y quiero agendar mi Carta Numerológica Personal (Sesión 1:1).`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary">Consultar sesión por WhatsApp</a>
      </aside>
      <button className="btn-secondary" onClick={onReset}>Trazar otro mapa</button>
    </section>
  );
}
