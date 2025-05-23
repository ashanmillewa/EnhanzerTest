import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import EditBook from "./Pages/EditBook";
import AddBook from "./Pages/AddBook";

import About from './Pages/About';
import Contact from './Pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-book/:id" element={<EditBook />} />

            <Route path="/add-book" element={<AddBook />} />

            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
