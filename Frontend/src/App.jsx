import './App.css';
import AddTask from './components/AddTask';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewTask from './components/ViewTask';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Define routes here */}
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/view-task" element={<ViewTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
