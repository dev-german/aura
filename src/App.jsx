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
