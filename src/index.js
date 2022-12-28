import {createRoot} from 'react-dom/client'
import React from 'react'
import App from './App'
import reportWebVitals from './reportWebVitals'
import "./global.css"
import AppLesson2 from './AppLesson2'
import AppEarth from './AppEarth'


const root=createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
    <AppEarth></AppEarth>
</React.StrictMode>,)


reportWebVitals();

