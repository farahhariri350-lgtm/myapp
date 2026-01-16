import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FormProvider } from './context/FormContext'; // استيراد البروفايدر المسؤول عن البيانات

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 
    <FormProvider> 
      <App />
    </FormProvider>
  </React.StrictMode>
);