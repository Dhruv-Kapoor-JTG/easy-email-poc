import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';
import 'swiper/swiper.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   // <React.StrictMode>
//     <App />
//   // </React.StrictMode>
// );
console.log(React.version)
ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App2/>}/>
      <Route path='/easy-email' element={<App/>}/>
    </Routes>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
