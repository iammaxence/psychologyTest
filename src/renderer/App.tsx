import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './feature/authentication/PrivateRoute';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
