import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionnaireProvider } from './context/QuestionnaireContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <QuestionnaireProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuestionnaireProvider>
  </React.StrictMode>,
  document.getElementById('root')
);