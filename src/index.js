import React from 'react';
import ReactDOM from 'react-dom'; // Change import statement
import App from './App';
import { store } from './features/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
