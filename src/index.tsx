import {createRoot} from "react-dom/client";
import App from "./App";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import 'reset-css';
import './index.css'

const root = document.getElementById('root')

if(!root) {
    throw new Error('No root element found!')
}

const container = createRoot(root)

container.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)

// const rootElm = document.getElementById('root')
// if (rootElm) {
//     const root = ReactDOM.createRoot(rootElm);
//     root.render(
//         <BrowserRouter>
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         </BrowserRouter>
//     );
// }