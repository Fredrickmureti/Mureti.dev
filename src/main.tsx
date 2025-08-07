
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx loaded');

const rootElement = document.getElementById("root");
if (rootElement) {
  console.log('Root element found, creating React root');
  const root = createRoot(rootElement);
  console.log('Rendering App component');
  root.render(<App />);
} else {
  console.error('Root element not found');
}
