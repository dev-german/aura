import { useEffect, useRef, useState } from 'react';
import { calculateUniversalMonth } from '../utils/universalMonth.js';

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const years = Array.from({ length: 201 }, (_, index) => 1900 + index);

export default function UniversalMonth() {
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [year, setYear] = useState(() => Math.min(2100, Math.max(1900, new Date().getFullYear())));
  const [result, setResult] = useState(null);
  const resultHeading = useRef(null);

  useEffect(() => {
    if (result) resultHeading.current?.focus();
  }, [result]);

  const explore = (event) => {
    event.preventDefault();
    setResult(calculateUniversalMonth(month, year));
  };

  return (
    <section className="universal-month">
      <div className="month-intro">
        <div className="view-heading">
          <p className="intro-context">Numerología de tiempos</p>
          <h1 className="title">Mes universal</h1>
          <p className="subtitle">Cada mes trae una energía colectiva diferente que puede influir en nuestros procesos, decisiones y aprendizajes.</p>
          <p className="month-explanation">Elige un mes y descubre su energía, acciones para acompañarla y una pregunta para reflexionar.</p>
        </div>
        <form className="form-panel" onSubmit={explore}>
          <h2>Explora un mes</h2>
          <p className="form-intro">Consulta el mes actual, vuelve al pasado o mira hacia lo que viene.</p>
          <div className="month-fields">
            <div className="form-group">
              <label className="form-label" htmlFor="universal-month">Mes</label>
              <select id="universal-month" className="form-input" value={month} onChange={(event) => setMonth(Number(event.target.value))}>
                {months.map((label, index) => <option key={label} value={index + 1}>{label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="universal-year">Año</label>
              <select id="universal-year" className="form-input" value={year} onChange={(event) => setYear(Number(event.target.value))}>
                {years.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary">Explorar mes universal</button>
        </form>
      </div>

      {result && (
        <article className="month-reading" aria-labelledby="month-result-title">
          <header className="month-result-heading">
            <div>
              <p className="intro-context">{months[result.month - 1]} de {result.year}</p>
              <h2 id="month-result-title" ref={resultHeading} tabIndex={-1}>Mes universal {result.number}</h2>
              <p className="month-theme">{result.reading.title}</p>
            </div>
            <span className="month-result-number" aria-hidden="true">{result.number}</span>
          </header>
          <p className="month-description">{result.reading.description}</p>
          <div className="month-guidance">
            <section className="month-actions">
              <h3>Acciones para este mes</h3>
              <ul>{result.reading.actions.map((action) => <li key={action}>{action}</li>)}</ul>
            </section>
            <aside className="month-reflection">
              <h3>Pregúntate</h3>
              <p>{result.reading.question}</p>
            </aside>
          </div>
          <details className="month-calculation">
            <summary>Cómo se calcula este mes</summary>
            <p>Reducimos los dígitos de {result.year} para obtener el año universal {result.universalYear}.
              {' '}Sumamos el número del mes: {result.universalYear} + {result.month} = {result.sum}.
              {result.sum !== result.number && ` Al reducir ${result.sum}, obtenemos ${result.number}.`}
              {' '}Conservamos el 11 como número maestro.</p>
          </details>
        </article>
      )}
    </section>
  );
}
