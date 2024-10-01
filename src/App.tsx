import { Routes, Route } from 'react-router-dom';

import Head from './components/Head';
//
import Home from './client/home';
import About from './client/about';
// 
const App = () => {
  return (
  <div className="App">
    <Head />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </div>
  );
};

export default App;

