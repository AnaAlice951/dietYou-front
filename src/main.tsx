import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login/index.tsx';
import Home from './screens/Home/index.tsx';
import Recipes from './screens/Recipes/index.tsx';
import { createRoot } from 'react-dom/client';
import { Suspense, lazy } from 'react';
import SplashScreen from './screens/SplashScreen/index.tsx';

// const Recipes = lazy(() => import('./screens/Recipes'));


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/receitas" element={<Recipes />} />
        {/* <Route
          path="/receitas"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Recipes />
            </Suspense>
          }
        /> */}
      </Routes>
    </Router>
  );
}
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
