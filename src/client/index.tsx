import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import App from './App';

const rootContainer: any = document.getElementById('root');
const root: any = createRoot(rootContainer);

root.render(<App />);