import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router } from"react-router-dom"
import {persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import '@icon/icofont/icofont.css'
import 'remixicon/fonts/remixicon.css'


ReactDOM.createRoot(document.getElementById('root')).render(
 <Router>
   <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <Provider store ={store}>
      <App />
    </Provider>
   
  </React.StrictMode>
 </Router>
)
