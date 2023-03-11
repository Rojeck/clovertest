import { Routes, Route } from "react-router-dom";
import './app.scss';

import Header from './components/header/Header';
import AboutPage from "./components/pages/aboutPage/aboutPage";
import HomePage from "./components/pages/homePage/homePage";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
