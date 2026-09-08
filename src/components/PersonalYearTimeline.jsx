export default function PersonalYearTimeline({ personalYears }) {
  const currentYear = new Date().getFullYear();
  const items = [
    { year: currentYear - 1, ...personalYears.past, label: 'El ciclo anterior' },
    { year: currentYear, ...personalYears.current, label: 'Tu momento actual', active: true },
    { year: currentYear + 1, ...personalYears.future, label: 'Lo que viene' },
  ];

  return (
    <section className="timeline-container" aria-label="Línea de tiempo del año personal">
      <div className="timeline-heading"><h2>El ritmo de tus años</h2><p>Cada ciclo tiene algo que enseñarte.</p></div>
      <ol className="custom-timeline">
        {items.map((item) => (
          <li key={item.year} className={`timeline-item${item.active ? ' active' : ''}`}>
            <div className="timeline-year"><span>{item.year}</span><span className="timeline-period">{item.label}</span></div>
            <div className="timeline-content">
              <span className="timeline-number" aria-hidden="true">{item.number}</span>
              <div><h3>Año personal {item.number}</h3><p>{item.concept}</p></div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
