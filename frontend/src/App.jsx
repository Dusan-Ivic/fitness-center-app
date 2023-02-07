import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container className="mt-3">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
