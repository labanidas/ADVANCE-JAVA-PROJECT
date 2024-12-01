// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* 404 page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

