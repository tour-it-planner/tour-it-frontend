import './App.css';
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {

  return (

    <div className="App">
      <h1>Tour It</h1>
      <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      </Routes>
    </div>
  );
}

export default App
