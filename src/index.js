import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import './styles.css';

import { PruebaTecnica } from './PruebaTecnica';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <PruebaTecnica />
        </BrowserRouter>
    </React.StrictMode>
);