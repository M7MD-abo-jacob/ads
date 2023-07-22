import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import App from './App';

// disable redux from devtools in production
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
);
