import React from 'react';
import Main from './components/Main';

const App = () => {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '600px', margin: 'auto', height: '100vh' }}>
      <Main />
    </div>
  );
}

export default App;
