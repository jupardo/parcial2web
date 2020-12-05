import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl';
import strings from './locale/strings';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


let userLanguage = navigator.language || navigator.userLanguage;
userLanguage = userLanguage.split('-')[0];
let messages = strings[userLanguage] ?? strings["en"];
ReactDOM.render(
  <React.StrictMode>
    <IntlProvider
     locale={userLanguage}
     defaultLocale="en"
     messages={messages}>
    <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();