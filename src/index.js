import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
import './scss/layouts/dashboard/App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import vi from './translations/vi/common.json';
import en from './translations/en/common.json';
import Constants from './utils/Constants';
import Libs from './utils/Libs';

import CMSHttp from './utils/CMSHttp';
global.CMSHttp = CMSHttp;
let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
let employeeInfo = JSON.parse(Libs.base64Decrypt(info));
i18next.init({
  interpolation: { escapeValue: false },
  lng: Libs.isBlank(employeeInfo) ? 'en': employeeInfo.lang,
  resources: {
    vi: {
      common: vi
    },
    en: {
      common: en
    },
  },
});

export default i18next;

ReactDOM.render(
  // <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
