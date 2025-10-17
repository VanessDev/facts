import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import FactList from "./components/FactList.jsx";
import FactForm from "./components/FactForm.jsx";
import FactEdit from "./components/FactEdit.jsx";
import FactDetail from "./components/FactDetail.jsx";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<FactList />} />
          <Route path="/add" element={<FactForm />} />
          <Route path="/edit/:id" element={<FactEdit />} />
           <Route path="/fact/:id" element={<FactDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;