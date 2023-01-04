import { Calculator } from './components/Calculator/Calculator';
import { MainPage } from './components/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='mwcoders-task' element={<MainPage />} />
        <Route path='mwcoders-task/calculator' element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
