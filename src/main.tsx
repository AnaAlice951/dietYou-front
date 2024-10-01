import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Login from './screens/Login/index.tsx';
import Home from './screens/Home/index.tsx';
import Recipes from './screens/Recipes/index.tsx';
import SplashScreen from './screens/SplashScreen/index.tsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/receitas" element={<Recipes />} />
      </Routes>
    </Router>
  );
}
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
