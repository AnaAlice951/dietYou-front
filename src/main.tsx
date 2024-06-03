import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './screens/ForgotPassword/index.tsx';
import Login from './screens/Login/index.tsx';
import SignUp from './screens/SignUp/index.tsx';
import Home from './screens/Home/index.tsx';
import { createRoot } from 'react-dom/client';
import { Suspense, lazy } from 'react';

const Exercises = lazy(() => import('./screens/Exercises'));


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/treino"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Exercises />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
