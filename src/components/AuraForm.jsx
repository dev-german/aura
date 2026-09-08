import { useState } from 'react';

const AuraForm = ({ onSubmit, title = 'Tu mapa de alma', submitLabel = 'Trazar mi mapa' }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  // Handle automatic formatting of dd/mm/yyyy
  const handleDateChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Auto-format logic
    if (val.length > 2 && val.length <= 4) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    } else if (val.length > 4) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4) + '/' + val.slice(4, 8);
    }

    setDate(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && date.length === 10) {
      onSubmit(name, date);
    }
  };

  const isFormValid = name.trim().length > 0 && date.length === 10;

  return (
    <div className="form-panel">
      <h2>{title}</h2>
      <p className="form-intro">Empieza con tu nombre y fecha de nacimiento.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="nameInput">Nombre completo</label>
          <input
            id="nameInput"
            className="form-input"
            type="text"
            placeholder="Ej. Juan Pérez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="dateInput">Fecha de nacimiento</label>
          <input
            id="dateInput"
            className="form-input"
            type="text"
            placeholder="DD/MM/YYYY"
            value={date}
            onChange={handleDateChange}
            inputMode="numeric"
            aria-describedby="date-hint"
            maxLength="10"
            required
            autoComplete="off"
          />
          <span id="date-hint" className="input-hint">Día, mes y año. Las barras se añaden automáticamente.</span>
        </div>

        <button 
          type="submit" 
          className="btn-primary"
          disabled={!isFormValid}
        >
          {submitLabel}
        </button>
      </form>
      <p className="form-note">Tus datos se usan solo en este navegador.</p>
    </div>
  );
};

export default AuraForm;
