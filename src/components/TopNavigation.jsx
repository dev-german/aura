import { useRef, useState } from 'react';

const sections = [
  { id: 'times', label: 'Numerología de tiempos', items: [
    { id: 'personal-year', label: 'Año personal' },
    { id: 'universal-month', label: 'Mes universal' },
  ] },
  { id: 'personal', label: 'Numerología personal', items: [
    { id: 'soul-map', label: 'Tu mapa de alma' },
  ] },
];

export default function TopNavigation({ view, onNavigate }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const activeSection = sections.find((section) => section.items.some((item) => item.id === view));

  const navigate = (id) => {
    onNavigate(id);
    setOpen(false);
    if (open) toggleRef.current?.focus();
  };

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }}>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <div className="nav-mobile-bar">
        <button className="nav-brand" type="button" onClick={() => navigate('soul-map')} aria-label="Marita Baldeon, inicio">
          <svg viewBox="0 0 36 36" width="36" height="36" fill="none" aria-hidden="true"><path d="M8 28V12a7 7 0 0 1 14 0v12a4 4 0 0 0 8 0V8M8 22h22" stroke="currentColor" strokeWidth="2" /><circle cx="8" cy="28" r="3" fill="currentColor" /></svg>
          <span>Marita<br />Baldeon</span>
        </button>
        <button ref={toggleRef} className="nav-toggle" type="button"
          aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </div>
      <nav id="primary-navigation" aria-label="Navegación principal" className={`top-navigation${open ? ' is-open' : ''}`}>
        <div className="nav-sections">
          {sections.map((section) => (
            <button key={section.id} type="button"
              className={`nav-section${activeSection.id === section.id ? ' is-active' : ''}`}
              aria-pressed={activeSection.id === section.id}
              onClick={() => onNavigate(section.items[0].id)}>
              {section.label}
            </button>
          ))}
        </div>
        <ul className="nav-options" aria-label={activeSection.label}>
          {activeSection.items.map((item) => (
            <li key={item.id}>
              <button type="button" className="nav-option" aria-current={view === item.id ? 'page' : undefined}
                onClick={() => navigate(item.id)}>{item.label}</button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
